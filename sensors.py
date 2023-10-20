import pyaudio
import numpy as np
import picamera
import time
import Adafruit_DHT
import firebase_admin
from firebase_admin import credentials, storage, firestore
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

#from google.cloud import firestore

# Constants
CHUNK = 1024 # size of audio chunks to process
FORMAT = pyaudio.paInt16 # format of audio data
CHANNELS = 1 # Mono
RATE = 44100 # sample rate (Hz)
THRESHOLD = 500 # placeholder value
PHOTO_INTERVAL = 15 # image interval in seconds
MAX_THRESHOLD_EXCEEDED_COUNT = 5
TIME_WINDOW = 10 # Time window in seconds
MAX_AUDIO_CAPTURE_INTERVAL = 0.25 # Max interval for audio capture in seconds (4 per second)
dht_sensor_pin = 17

BUCKET_NAME = 'iot-group13.appspot.com'


# init firebase with credentials
cred = credentials.Certificate("iot-group13-firebase-adminsdk-va43v-36b0e745db.json")
firebase_admin.initialize_app(cred)

# init firebase cloud storage
bucket = storage.bucket(app=firebase_admin.get_app(), name='iot-group13.appspot.com')

# init firestore
db = firestore.client()

# Uploads a photo to firebase cloud storage, gets its url, then uploads the url, timestamp and sensor readings to the Firestore database
def upload_photo_and_data(local_photo_path, temperature, humidity):
    
    # Destination path in firebase cloud storage
    destination_blob_name = f'{local_photo_path}'
    
    print("Uploading photo")

    # Upload photo to firebase cloud storage
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_photo_path)
    
    # get download url for uploaded photo
    photo_url = f'https://storage.googleapis.com/{BUCKET_NAME}/{destination_blob_name}'
    
    timestamp=datetime.now()
    timestampStr = timestamp.strftime("%Y-%m-%d_%H-%M-%S")

     # Define firestore data
    data = {
        'photo_url': photo_url,
        'timestamp': timestamp,
        'temperature': temperature,
        'humidity': humidity,
    }
    
    print("Uploading data")

    # get reference to firestore collection
    collection_ref = db.collection('sensor_data')
    
    # add the data to firestore as a new document
    # doc_ref = collection_ref.add(data)
    
    
    
    collection_ref.document(timestampStr).set(data)
    

# Function to capture a photo
def capture_photo(save_folder):
    with picamera.PiCamera() as camera:
        camera.resolution = (1920, 1080) # Set resolution as needed
        timestamp = time.strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"{save_folder}/photo_{timestamp}.jpg"
        camera.capture(filename)
        print(f"Captured photo: {filename}")
        
        # Return time of photo to reset thresholds
        
        return time.time(), filename
    
# Takes a reading from the DHT11 sensor and prints and returns it
def read_temperature_humidity():
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, dht_sensor_pin)
    if humidity is not None and temperature is not None:
        print(f"Temperature: {temperature:.2f} C, Humidity {humidity:.2f}%")
        return temperature, humidity

    else:
        print("Failed to retrieve temperature and humidity data")

# Main execution loop
def main():
    audio = pyaudio.PyAudio()
    stream = audio.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK
        )
    
    print("Listening...")
    photo_timer = time.time() + PHOTO_INTERVAL
    threshold_exceeded_count= 0
    start_time = time.time()
    last_audio_capture_time = 0
    
    try:
        while True:
            data = np.frombuffer(stream.read(CHUNK), dtype=np.int16)
            volume = np.abs(data).mean()

            if volume > THRESHOLD:
                current_time = time.time()
                
                # Ensure audio is captured at most 4 times per second (for now)
                if current_time - last_audio_capture_time >= MAX_AUDIO_CAPTURE_INTERVAL:
                    print(f"Audio volume: {volume:.2f}")
                    threshold_exceeded_count += 1
                    last_audio_capture_time = current_time
                    
                    
                    if threshold_exceeded_count >= MAX_THRESHOLD_EXCEEDED_COUNT:
                        print(f"Threshold exceeded {MAX_THRESHOLD_EXCEEDED_COUNT} times in {TIME_WINDOW} seconds. Capturing photo.")
                        start_time, filename = capture_photo("images")
                        temperature, humidity = read_temperature_humidity()
                        upload_photo_and_data(filename, temperature, humidity)
                        threshold_exceeded_count = 0    
                        
                    if current_time - start_time > TIME_WINDOW:
                        print("Threshold not met. Resetting count.")
                        threshold_exceeded_count= 0
                        start_time = current_time  
                             
            if time.time() >= photo_timer:
                print(f"Capturing photo every {PHOTO_INTERVAL} seconds.")
                start_time, filename = capture_photo("images")
                temperature, humidity = read_temperature_humidity()
                upload_photo_and_data(filename, temperature, humidity)
                photo_timer = time.time() + PHOTO_INTERVAL
                
                    
    except KeyboardInterrupt:
        print("Stopped.")
     
    finally:
        stream.stop_stream()
        stream.close()
        audio.terminate()
    
if __name__ == "__main__":
    main()

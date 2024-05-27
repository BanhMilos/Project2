from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import requests
from PIL import Image
import io 
import tensorflow as tf
import numpy as np

app = FastAPI()


model = tf.keras.models.load_model("trained_model.h5")

with open("labels.txt") as f:
    content = f.readlines()
labels = [label.strip() for label in content]

def model_prediction(image, model):
    image = image.resize((64, 64))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    predictions = model.predict(input_arr)
    return np.argmax(predictions)

@app.post("/predict/")
async def predict(image_file: UploadFile = File(...)):
    try:
        contents = await image_file.read()
        image = Image.open(io.BytesIO(contents))  
        result_index = model_prediction(image, model)
        return {"prediction": labels[result_index]}
    except Exception as e:
        print(e)  
        raise HTTPException(status_code=400, detail="Error processing image")

#To run API, paste this in terminal: uvicorn api:app --host 0.0.0.0 --port 8000
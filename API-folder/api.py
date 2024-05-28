from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from PIL import Image
from io import BytesIO
import tensorflow as tf
import numpy as np

app = FastAPI()

#load model
model = tf.keras.models.load_model("trained_model.h5")

#doc lable tu file txt
with open("labels.txt") as f:
    content = f.readlines()
labels = [label.strip() for label in content]

class ImageURL(BaseModel):
    image_url: str

def model_prediction(image, model):
    image = image.resize((64, 64))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to batch
    predictions = model.predict(input_arr)
    return np.argmax(predictions)  # Return index of max element

@app.post("/predict/")
async def predict(image_data: ImageURL):
    try:
        response = requests.get(image_data.image_url)
        image = Image.open(BytesIO(response.content))
        result_index = model_prediction(image, model)
        return {"prediction": labels[result_index]}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error processing image")

# uvicorn api:app --host 0.0.0.0 --port 8000

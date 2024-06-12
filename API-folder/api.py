from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import io
import os
import requests
import tempfile
import json

app = FastAPI()

ROBOFLOW_URL = "https://detect.roboflow.com/ingredients-detection-yolov8/2"
API_KEY = "lcEI0XunFHQi0GNp7Ccv"
CLASS_MAPPING_FILE = "./class_mapping.json"

def load_class_mapping(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        raise RuntimeError(f"Error loading class mapping: {str(e)}")

class_mapping = load_class_mapping(CLASS_MAPPING_FILE)

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            image.save(temp_file, format='JPEG')
            temp_file_name = temp_file.name
        
        # gửi ảnh
        with open(temp_file_name, 'rb') as img:
            response = requests.post(
                ROBOFLOW_URL,
                files={"file": img},
                params={"api_key": API_KEY}
            )
                
        os.remove(temp_file_name)

        # check response
        if response.status_code == 200:     
            result = response.json()
            
            # lọc class
            detections = result.get("predictions", [])
            class_names = []
            for detection in detections:
                class_id = int(detection.get("class", None))
                class_name = class_mapping.get(str(class_id))
                if class_name is not None:
                    class_names.append(class_name)
            
            return JSONResponse(content=class_names)
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

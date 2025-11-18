# main.py
from fastapi import FastAPI, File, UploadFile
import shutil
from model_utils import predict_tumor
import uvicorn
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="🧠 Brain Tumor Detection API", version="1.0")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "Welcome to Brain Tumor Detection API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Make prediction
    result = predict_tumor(file_path)

    # Clean up (optional)
    os.remove(file_path)

    return {"filename": file.filename, "result": result}



app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/ui")
def ui():
    return FileResponse("static/index.html")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

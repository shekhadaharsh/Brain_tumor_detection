# model_utils.py

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the trained model
MODEL_PATH = "brain_tumor_cnn.h5"
model = load_model(MODEL_PATH)
print("✅ Model loaded successfully!")

# Preprocess and predict function
def predict_tumor(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    pred = model.predict(img_array)[0][0]

    if pred >= 0.5:
        label = "Tumor"
    else:
        label = "No Tumor"

    return {"prediction": label, "confidence": float(pred)}

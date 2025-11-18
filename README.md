A Deep Learning–based Brain Tumor Detection system built using FastAPI.
The user uploads an MRI image through the API or UI, and a trained model (brain_tumor_cnn.h5) predicts whether a tumor is present.

🚀 Features
MRI image upload support
Deep Learning model for tumor classification
Real-time predictions using FastAPI
Clean UI built with HTML, CSS & JavaScript
Auto-cleanup of uploaded images
Easy to extend and deploy


brain-tumor-detection/
│
├── app/
│   ├── main.py              # FastAPI routes (predict + UI)
│   ├── model_utils.py       # Loads DL model + prediction logic
│   ├── static/              # Frontend UI
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── uploads/             # Temporary image files
│   └── model/
│       └── brain_tumor_cnn.h5
│
├── requirements.txt
└── README.md

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  const resultDiv = document.getElementById("result");

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Highlight box when file is dragged
  ["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add("dragover"));
  });

  // Remove highlight when leaving or dropping
  ["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove("dragover"));
  });

  // Handle file drop
  dropZone.addEventListener("drop", e => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFileSelect(files[0]);
    }
  });

  // Handle file selection (when clicked)
  fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  });

  function handleFileSelect(file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  // Upload to backend
  window.uploadImage = async function () {
    if (!fileInput.files.length) {
      alert("Please select or drop an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    resultDiv.innerHTML = "⏳ Predicting...";

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      resultDiv.innerHTML = `✅ Result: ${data.result.prediction}<br>🎯 Confidence: ${(data.result.confidence * 100).toFixed(2)}%`;
    } catch (err) {
      resultDiv.innerHTML = `❌ Error: ${err}`;
    }
  };
});

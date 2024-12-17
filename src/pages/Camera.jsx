import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // Function to compress and resize the image
  const compressImage = (base64Image, maxWidth = 300, maxHeight = 300, quality = 0.6) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Draw image on canvas with new dimensions
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas back to base64 with reduced quality
        const compressedImage = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedImage);
      };
    });
  };

  // Capture and compress the image
  const captureImage = async () => {
    const capturedImage = webcamRef.current.getScreenshot();

    if (capturedImage) {
      const compressedImage = await compressImage(capturedImage); // Compress the image
      setImage(compressedImage);
      onCapture(compressedImage); // Send compressed image to parent component
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-auto border-2 border-gray-300 rounded-lg shadow-md"
          />
          <button
            type="button"  // Add type="button" to prevent form submission
            onClick={captureImage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Capture Photo
          </button>
        </>
      ) : (
        <>
          <img
            src={image}
            alt="Captured"
            className="w-full h-auto border-2 border-gray-300 rounded-lg shadow-md"
          />
          <button
            type="button"  // Add type="button" to prevent form submission
            onClick={() => setImage(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Retake Photo
          </button>
        </>
      )}
    </div>
  );
};

export default CameraCapture;

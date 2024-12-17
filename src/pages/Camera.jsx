import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImage(capturedImage);
    onCapture(capturedImage); // Parent component ko image pass karein
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

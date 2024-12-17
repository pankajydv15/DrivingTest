import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useScores } from "../ScoresContext"; // Import the useScores hook
import CameraCapture from "./Camera"; // Import the CameraCapture component

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    dob: "",
    location: "",
    expiryDate: "",
    issuedDate: "",
    mobileNumber: "",
    ttNumber: "",
    photo: "", // User Photo
    dlFrontPhoto: "", // DL Front Photo
    dlBackPhoto: "", // DL Back Photo
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState(""); // To determine which camera is active
  const [errorMessage, setErrorMessage] = useState(""); // For validation errors
  const navigate = useNavigate();
  const { isSubmitted, addUser } = useScores();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dob = new Date(formData.dob);
    const issuedDate = new Date(formData.issuedDate);
    const ageAtIssue = (issuedDate - dob) / (1000 * 60 * 60 * 24 * 365.25);

    if (ageAtIssue < 18) {
      setErrorMessage(
        "You must be at least 18 years old when the DL was issued."
      );
      return;
    }

    try {
      const response = addUser(formData);
      response &&
        setTimeout(() => navigate("/test-selection"), 1000);
    } catch (error) {
      console.error("Error saving user details:", error);
      setErrorMessage("Failed to save user details. Please try again.");
    }
  };

  const handleCapture = (capturedImage) => {
    if (cameraMode === "photo") {
      setFormData((prev) => ({ ...prev, photo: capturedImage }));
    } else if (cameraMode === "dlFront") {
      setFormData((prev) => ({ ...prev, dlFrontPhoto: capturedImage }));
    } else if (cameraMode === "dlBack") {
      setFormData((prev) => ({ ...prev, dlBackPhoto: capturedImage }));
    }
    setIsCameraOpen(false); // Close the camera after capturing
    setCameraMode(""); // Reset the camera mode
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
        Welcome to Assessment Test
      </h1>
      <button
        onClick={handleRefresh}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        New Registration
      </button>

      {!isSubmitted ? (
        <form
          className="bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transform transition duration-500 ease-in-out hover:scale-105"
          onSubmit={handleSubmit}
        >
          {/* Existing Form Fields */}
          {/** Name */}
          <div>
            <label className="text-gray-800 font-semibold mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
               placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
              required
            />
          </div>

          {/** DOB */}
          <div>
            <label className="text-gray-800 font-semibold mb-2 block">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="licenseNumber"
            >
              Driving License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter your driving license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="expiryDate"
            >
              DL Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="issuedDate"
            >
              DL Issued Date
            </label>
            <input
              type="date"
              name="issuedDate"
              value={formData.issuedDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label
              className="text-gray-800 font-semibold mb-2 block"
              htmlFor="ttNumber"
            >
              Traffic Ticket Number
            </label>
            <input
              type="text"
              name="ttNumber"
              placeholder="Enter your traffic ticket number"
              value={formData.ttNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          {/* Three Camera Sections */}
          {/** User Photo */}
          <div className="col-span-2">
            <label className="text-gray-800 font-semibold mb-2 block">
              Capture Photo
            </label>
            {formData.photo ? (
              <img src={formData.photo} alt="User" className="w-32 h-32 mb-4" />
            ) : (
              <p className="text-gray-600 mb-4">No photo captured yet.</p>
            )}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setIsCameraOpen(true);
                setCameraMode("photo");
              }}
            >
              Open Camera
            </button>
          </div>

          {/** DL Front Photo */}
          <div className="col-span-2">
            <label className="text-gray-800 font-semibold mb-2 block">
              DL Front Photo
            </label>
            {formData.dlFrontPhoto ? (
              <img
                src={formData.dlFrontPhoto}
                alt="DL Front"
                className="w-32 h-32 mb-4"
              />
            ) : (
              <p className="text-gray-600 mb-4">No DL Front photo captured yet.</p>
            )}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setIsCameraOpen(true);
                setCameraMode("dlFront");
              }}
            >
              Open Camera
            </button>
          </div>

          {/** DL Back Photo */}
          <div className="col-span-2">
            <label className="text-gray-800 font-semibold mb-2 block">
              DL Back Photo
            </label>
            {formData.dlBackPhoto ? (
              <img
                src={formData.dlBackPhoto}
                alt="DL Back"
                className="w-32 h-32 mb-4"
              />
            ) : (
              <p className="text-gray-600 mb-4">No DL Back photo captured yet.</p>
            )}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setIsCameraOpen(true);
                setCameraMode("dlBack");
              }}
            >
              Open Camera
            </button>
          </div>

          {isCameraOpen && (
            <div className="col-span-2">
              <CameraCapture onCapture={handleCapture} />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded w-full hover:bg-indigo-700 col-span-2"
          >
            Submit
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 font-medium col-span-2">
              {errorMessage}
            </div>
          )}
        </form>
      ) : null}
    </div>
  );
};

export default Dashboard;

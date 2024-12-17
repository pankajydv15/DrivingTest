import { useScores } from "../ScoresContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const ProgressReport = () => {
  const navigate = useNavigate();
  const { scores, userDetails } = useScores(); // Get the scores and user details from the context

  const {
    preTestScore = 0,
    postTestScore = 0,
    colorBlindTestScore = 0,
    roadTestScore = 0,
  } = scores;
  const {
    name = "N/A",
    licenseNumber = "N/A",
    dob = "N/A",
    location = "N/A",
    expiryDate = "N/A",
    issuedDate = "N/A",
    mobileNumber = "N/A",
    ttNumber = "N/A",
    photo = "N/A,",
  } = userDetails;

  // Calculate total score
  const totalScore =
    preTestScore + postTestScore + colorBlindTestScore + roadTestScore;

  // Determine pass or fail based on total score
  const result = totalScore >= 55 ? "Pass" : "Fail";

  // Function to save the progress report to the backend
  const saveProgressReport = async () => {
    try {
      const reportData = {
        scores: {
          preTestScore,
          postTestScore,
          colorBlindTestScore,
          roadTestScore,
        },
        userDetails: {
          name,
          licenseNumber,
          dob,
          location,
          expiryDate,
          issuedDate,
          mobileNumber,
          ttNumber,
          photo,
        },
        totalScore,
        result,
      };

      const response = await axios.post("http://localhost:5000/api/progress-report", reportData);
      console.log("Progress report saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving progress report:", error);
    }
  };

  // Save the report when the component is loaded
  React.useEffect(() => {
    saveProgressReport();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Progress Report</h1>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-6">
        {/* User Details Section */}
        <div className="border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            User Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>License Number:</strong> {licenseNumber}
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>DL Issued Date:</strong> {issuedDate}
            </p>
            <p>
              <strong>DL Expiry Date:</strong> {expiryDate}
            </p>
            <p>
              <strong>Mobile Number:</strong> {mobileNumber}
            </p>
            <p>
              <strong>Traffic Ticket Number:</strong> {ttNumber}
            </p>
            <div>
              <strong>Image:</strong>
              {photo !== "N/A" ? (
                <img
                  src={photo}
                  alt="User"
                  className="w-32 h-32 object-cover border rounded-md shadow-md mt-2"
                />
              ) : (
                <p className="text-gray-500">No Image Provided</p>
              )}
            </div>
          </div>
        </div>

        {/* Scores Section */}
        <div className="border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Test Scores
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              Pre-Test Score: <strong>{preTestScore} / 20</strong>
            </p>
            <p className="text-lg text-gray-600">
              Post-Test Score: <strong>{postTestScore} / 20</strong>
            </p>
            <p className="text-lg text-gray-600">
              Color Blind Test Score:{" "}
              <strong>{colorBlindTestScore} / 20</strong>
            </p>
            <p className="text-lg text-gray-600">
              Road Test Score: <strong>{roadTestScore} / 20</strong>
            </p>
          </div>
        </div>

        {/* Total Score and Result Section */}
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">
            Total Score:{" "}
            <span className="text-blue-600">{totalScore} / 80</span>
          </p>
          <p
            className={`text-2xl font-bold mt-4 ${
              result === "Pass" ? "text-green-500" : "text-red-500"
            }`}
          >
            Result: {result}
          </p>
        </div>

        {/* Navigation Button */}
        <button
          onClick={() => navigate("/new-registration")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProgressReport;

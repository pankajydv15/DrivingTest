import { useScores } from "../ScoresContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const ProgressReport = () => {
  const navigate = useNavigate();
  const { scores, userDetails } = useScores();

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
    photo = "N/A", // User Photo
    dlFrontPhoto = "N/A", // Driver's License Front Photo
    dlBackPhoto = "N/A", // Driver's License Back Photo
  } = userDetails;

  const totalScore =
    preTestScore + postTestScore + colorBlindTestScore + roadTestScore;

  const result = totalScore >= 55 ? "Pass" : "Fail";

  // Save Progress Report
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
          dlFrontPhoto,
          dlBackPhoto,
        },
        totalScore,
        result,
      };

      await axios.post("http://localhost:5000/api/progress-report", reportData);
    } catch (error) {
      console.error("Error saving progress report:", error);
    }
  };

  React.useEffect(() => {
    saveProgressReport();
  }, []);

  // Generate PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Report Title
    doc.setFontSize(16);
    doc.text("Progress Report", 105, 15, null, null, "center");

    // User Details
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`License Number: ${licenseNumber}`, 10, 40);
    doc.text(`Date of Birth: ${dob}`, 10, 50);
    doc.text(`Location: ${location}`, 10, 60);
    doc.text(`DL Issued Date: ${issuedDate}`, 10, 70);
    doc.text(`DL Expiry Date: ${expiryDate}`, 10, 80);
    doc.text(`Mobile Number: ${mobileNumber}`, 10, 90);
    doc.text(`Traffic Ticket Number: ${ttNumber}`, 10, 100);

    // Test Scores
    doc.text(`Pre-Test Score: ${preTestScore} / 20`, 10, 120);
    doc.text(`Post-Test Score: ${postTestScore} / 20`, 10, 130);
    doc.text(`Color Blind Test Score: ${colorBlindTestScore} / 20`, 10, 140);
    doc.text(`Road Test Score: ${roadTestScore} / 20`, 10, 150);

    // Total Score and Result
    doc.setFontSize(14);
    doc.text(`Total Score: ${totalScore} / 80`, 10, 170);
    doc.text(`Result: ${result}`, 10, 180);

    // Add Photo (if available)
    if (photo && photo !== "N/A") {
      const imgWidth = 50;
      const imgHeight = 50;
      doc.addImage(photo, "JPEG", 150, 30, imgWidth, imgHeight); // Position photo at (150, 30)
    }

    // Add DL Front Photo (if available)
    if (dlFrontPhoto && dlFrontPhoto !== "N/A") {
      const imgWidth = 50;
      const imgHeight = 50;
      doc.addImage(dlFrontPhoto, "JPEG", 150, 90, imgWidth, imgHeight); // Position DL front photo
    }

    // Add DL Back Photo (if available)
    if (dlBackPhoto && dlBackPhoto !== "N/A") {
      const imgWidth = 50;
      const imgHeight = 50;
      doc.addImage(dlBackPhoto, "JPEG", 150, 150, imgWidth, imgHeight); // Position DL back photo
    }

    // Save the PDF
    doc.save("progress-report.pdf");
  };

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
            <p><strong>Name:</strong> {name}</p>
            <p><strong>License Number:</strong> {licenseNumber}</p>
            <p><strong>Date of Birth:</strong> {dob}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>DL Issued Date:</strong> {issuedDate}</p>
            <p><strong>DL Expiry Date:</strong> {expiryDate}</p>
            <p><strong>Mobile Number:</strong> {mobileNumber}</p>
            <p><strong>Traffic Ticket Number:</strong> {ttNumber}</p>
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
            {/* Display DL Front and Back Photos */}
            <div>
              <strong>Driver's License Front:</strong>
              {dlFrontPhoto !== "N/A" ? (
                <img
                  src={dlFrontPhoto}
                  alt="DL Front"
                  className="w-32 h-32 object-cover border rounded-md shadow-md mt-2"
                />
              ) : (
                <p className="text-gray-500">No DL Front Photo Provided</p>
              )}
            </div>
            <div>
              <strong>Driver's License Back:</strong>
              {dlBackPhoto !== "N/A" ? (
                <img
                  src={dlBackPhoto}
                  alt="DL Back"
                  className="w-32 h-32 object-cover border rounded-md shadow-md mt-2"
                />
              ) : (
                <p className="text-gray-500">No DL Back Photo Provided</p>
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

        {/* Total Score and Result */}
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">
            Total Score: <span className="text-blue-600">{totalScore} / 80</span>
          </p>
          <p
            className={`text-2xl font-bold mt-4 ${
              result === "Pass" ? "text-green-500" : "text-red-500"
            }`}
          >
            Result: {result}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/new-registration")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;

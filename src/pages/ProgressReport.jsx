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

    // User Details - 4 fields left, 4 fields right
    doc.setFontSize(12);
    const leftStartX = 10;
    const rightStartX = 105;
    let startY = 30;

    const leftFields = [
      `Name: ${name}`,
      `License Number: ${licenseNumber}`,
      `Date of Birth: ${dob}`,
      `Location: ${location}`,
    ];

    const rightFields = [
      `DL Issued Date: ${issuedDate}`,
      `DL Expiry Date: ${expiryDate}`,
      `Mobile Number: ${mobileNumber}`,
      `Traffic Ticket Number: ${ttNumber}`,
    ];

    // Draw Left Fields
    leftFields.forEach((field, index) => {
      doc.text(field, leftStartX, startY + index * 10);
    });

    // Draw Right Fields
    rightFields.forEach((field, index) => {
      doc.text(field, rightStartX, startY + index * 10);
    });

    // Test Scores
    startY += 50; // Move below user details
    doc.setFontSize(14);
    doc.text("Test Scores", leftStartX, startY);

    doc.setFontSize(12);
    const scores = [
      `Pre-Test Score: ${preTestScore} / 20`,
      `Post-Test Score: ${postTestScore} / 20`,
      `Color Blind Test Score: ${colorBlindTestScore} / 20`,
      `Road Test Score: ${roadTestScore} / 20`,
    ];

    scores.forEach((score, index) => {
      doc.text(score, leftStartX, startY + 10 + index * 10);
    });

    // Total Score and Result
    startY += 60;
    doc.setFontSize(14);
    doc.text(`Total Score: ${totalScore} / 80`, leftStartX, startY);
    doc.setFontSize(16);
    doc.setTextColor(result === "Pass" ? "green" : "red");
    doc.text(`Result: ${result}`, leftStartX, startY + 10);
    doc.setTextColor("black");

    // Add Photos Horizontally
    startY += 20; // Space before photos
    const imgWidth = 50;
    const imgHeight = 50;

    if (photo && photo !== "N/A") {
      doc.addImage(photo, "JPEG", leftStartX, startY, imgWidth, imgHeight);
      doc.text("User Photo", leftStartX + 12, startY + 55, null, null, "center");
    }

    if (dlFrontPhoto && dlFrontPhoto !== "N/A") {
      doc.addImage(dlFrontPhoto, "JPEG", leftStartX + 60, startY, imgWidth, imgHeight);
      doc.text("DL Front", leftStartX + 72, startY + 55, null, null, "center");
    }

    if (dlBackPhoto && dlBackPhoto !== "N/A") {
      doc.addImage(dlBackPhoto, "JPEG", leftStartX + 120, startY, imgWidth, imgHeight);
      doc.text("DL Back", leftStartX + 132, startY + 55, null, null, "center");
    }

    // Save the PDF
    doc.save("progress-report.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Progress Report</h1>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 space-y-6">
        {/* User Details Section */}
        <div className="border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            User Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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

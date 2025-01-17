import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ProgressReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://drivingtestbackend.onrender.com/api/progress-reports');
        setReports(response.data.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadReport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Progress Reports');

    const header = [
      'Name',
      'License Number',
      'Date of Birth',
      'Location',
      'Issued Date',
      'Expiry Date',
      'Mobile Number',
      'TT Number',
      'Pre-Test Score',
      'Post-Test Score',
      'Color Blind Test Score',
      'Road Test Score',
      'Total Score',
      'Result',
    ];
    worksheet.addRow(header);

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    reports.forEach((report) => {
      const row = worksheet.addRow([
        report.userDetails.name,
        report.userDetails.licenseNumber,
        report.userDetails.dob,
        report.userDetails.location,
        report.userDetails.issuedDate,
        report.userDetails.expiryDate,
        report.userDetails.mobileNumber,
        report.userDetails.ttNumber,
        report.scores.preTestScore,
        report.scores.postTestScore,
        report.scores.colorBlindTestScore,
        report.scores.roadTestScore,
        report.totalScore,
        report.result === 'Passed' ? 'Pass' : 'Fail',
      ]);

      row.getCell(1).font = { bold: true };
      const resultCell = row.getCell(14);
      resultCell.font = {
        color: { argb: report.result === 'Passed' ? 'FF008000' : 'FFFF0000' },
      };
      resultCell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Progress_Reports.xlsx');
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Progress Reports</h1>
          <button
            onClick={downloadReport}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Download Report
          </button>
        </div>
        {reports.length === 0 ? (
          <p className="text-center text-gray-500">No reports available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
                onClick={() => openModal(report)}
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{report.userDetails.name}</h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">License Number:</span> {report.userDetails.licenseNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Result:</span> {report.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedReport.userDetails.name}</h2>
            <p>
              <strong>License Number:</strong> {selectedReport.userDetails.licenseNumber}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedReport.userDetails.dob}
            </p>
            <p>
              <strong>Location:</strong> {selectedReport.userDetails.location}
            </p>
            <p>
              <strong>Result:</strong> {selectedReport.result}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReportList;

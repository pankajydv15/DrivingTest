import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

// const API_BASE_URL = "http://localhost:5000/api"; // Update this with your backend URL
const API_BASE_URL = "https://drivingtestbackend.onrender.com/api"; 

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      setSelectedUser(response.data.data);
      setIsModalOpen(true); // Open the modal when user is selected
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const downloadReport = () => {
    const data = users.map((user) => ({
      Name: user.name || "N/A",
      "License Number": user.licenseNumber || "N/A",
      "Date of Birth": user.dob || "N/A",
      Location: user.location || "N/A",
      "Expiry Date": user.expiryDate || "N/A",
      "Issued Date": user.issuedDate || "N/A",
      "Mobile Number": user.mobileNumber || "N/A",
      "TT Number": user.ttNumber || "N/A",
      "Pre-Test Score": user.scores?.preTestScore || "N/A",
      "Post-Test Score": user.scores?.postTestScore || "N/A",
      "Colorblind Test Score": user.scores?.colorBlindTestScore || "N/A",
      "Road Test Score": user.scores?.roadTestScore || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users Report");

    XLSX.writeFile(workbook, "Users_Report.xlsx");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Test Details</h2>

      {/* Download Report Button */}
      <div className="mb-4 text-center">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          onClick={downloadReport}
        >
          Download Report
        </button>
      </div>

      {/* User list display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleUserClick(user._id)}
          >
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-500 hover:text-blue-700">{user.name || "No Name"}</h3>
                <p className="text-gray-600 mt-2">{user.licenseNumber || "No License Number"}</p>
                <p className="text-gray-600 mt-1">{user.location || "No Location"}</p>
              </div>
              {/* User Photo on the right */}
              <div className="flex-shrink-0">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="User"
                    className="w-16 h-16 object-cover rounded-full border-2 border-blue-500"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    No Photo
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing user details */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl overflow-y-auto h-3/4 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">User Details</h3>
            {/* Table showing user details */}
            <table className="min-w-full border-collapse border border-gray-300">
              <tbody>
              <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Name:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.name || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">License Number:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.licenseNumber || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Date of Birth:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.dob || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Location:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.location || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Expiry Date:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.expiryDate || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Issued Date:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.issuedDate || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Mobile Number:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.mobileNumber || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">TT Number:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.ttNumber || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Photo:</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {selectedUser.photo ? (
                      <img src={selectedUser.photo} alt="User Photo" className="w-20 h-20 object-cover" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">DL Front Photo:</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {selectedUser.dlFrontPhoto ? (
                      <img src={selectedUser.dlFrontPhoto} alt="DL Front" className="w-20 h-20 object-cover" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">DL Back Photo:</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {selectedUser.dlBackPhoto ? (
                      <img src={selectedUser.dlBackPhoto} alt="DL Back" className="w-20 h-20 object-cover" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Pre-Test Score:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.scores?.preTestScore || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Post-Test Score:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.scores?.postTestScore || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Colorblind Test Score:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.scores?.colorBlindTestScore || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Road Test Score:</td>
                  <td className="border border-gray-300 px-4 py-2">{selectedUser.scores?.roadTestScore || "N/A"}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={closeModal} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

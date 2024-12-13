// src/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", formData);
    setIsSubmitted(true);
    setTimeout(() => navigate("/test-selection"), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Welcome to Your Dashboard</h1>

      {!isSubmitted ? (
        <form
          className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 transform transition duration-500 ease-in-out hover:scale-105"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="licenseNumber">
              Driving License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter your driving license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="expiryDate">
              License Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="issuedDate">
              DL Issued Date
            </label>
            <input
              type="date"
              name="issuedDate"
              value={formData.issuedDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-semibold mb-2 block" htmlFor="ttNumber">
              Traffic Ticket Number
            </label>
            <input
              type="text"
              name="ttNumber"
              placeholder="Enter your traffic ticket number"
              value={formData.ttNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 col-span-1 sm:col-span-2"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center text-white space-y-6">
          <h2 className="text-3xl font-semibold">Select Your Test</h2>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/pre-test")}
            >
              Pre Test
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg w-full hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/post-test")}
            >
              Post Test
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg w-full hover:bg-red-600 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/color-blind")}
            >
              Color Blind Test
            </button>
            <button
              className="bg-purple-500 text-white px-6 py-3 rounded-lg w-full hover:bg-purple-600 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/road-test")}
            >
              Road Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

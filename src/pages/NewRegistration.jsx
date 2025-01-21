import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewRegistration() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Welcome to Your Driving Journey 🚗
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          "Unlock new opportunities by stepping into a world of smart driving solutions!"
        </p>

        <div className="space-y-6">
          {/* Home Page Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Go to Home Page
          </button>

          {/* New User Link */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Register as a New User
          </button>

          {/* Progress Report Link */}
          {/* <button
            onClick={() => navigate('/user-Data')}
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
          >
          User Data
          </button> */}

          <button
            onClick={() => navigate('/data')}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
          Download Data
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            "Your journey begins with a single step. Let's make it extraordinary!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewRegistration;

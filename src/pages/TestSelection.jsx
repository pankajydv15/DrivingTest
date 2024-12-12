// src/pages/TestSelection.jsx
import { useNavigate } from "react-router-dom";

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Select Your Test</h1>

      <div className="flex flex-col items-center space-y-6">
        <button
          className="bg-green-500 text-white px-8 py-4 rounded-xl w-full max-w-md shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/pre-test")}
        >
          Pre Test
        </button>

        <button
          className="bg-yellow-500 text-white px-8 py-4 rounded-xl w-full max-w-md shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/post-test")}
        >
          Post Test
        </button>

        <button
          className="bg-red-500 text-white px-8 py-4 rounded-xl w-full max-w-md shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/color-blind")}
        >
          Color Blind Test
        </button>

        {/* Uncomment and update as needed */}
        {/* <button
          className="bg-purple-500 text-white px-8 py-4 rounded-xl w-full max-w-md shadow-lg hover:bg-purple-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/road-test")}
        >
          Road Test
        </button> */}
      </div>
    </div>
  );
};

export default TestSelection;

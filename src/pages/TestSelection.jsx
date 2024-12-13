// src/pages/TestSelection.jsx
import { useNavigate } from "react-router-dom";

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
        Select Your Test
      </h1>

      {/* Rules Section */}
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-3xl mb-8 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-indigo-500 pb-2">
          Rules and Instructions
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li>
            Total of <strong>20 questions</strong> in each test.
          </li>
          <li>All questions are <strong>mandatory</strong> to attempt.</li>
          <li>
            You must complete the tests in the following order:
            <ol className="list-decimal list-inside ml-6 mt-2">
              <li>Pre Test</li>
              <li>Post Test</li>
              <li>Color Blind Test</li>
            </ol>
          </li>
          <li>
            Each question carries <strong>1 mark</strong>.
          </li>
          <li>
            The total score for each test is <strong>20 marks</strong>.
          </li>
        </ul>
      </div>

      {/* Test Selection Buttons */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <button
          className="bg-green-500 text-white px-8 py-4 rounded-xl w-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/pre-test")}
        >
          Pre Test
        </button>

        <button
          className="bg-yellow-500 text-white px-8 py-4 rounded-xl w-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/post-test")}
        >
          Post Test
        </button>

        <button
          className="bg-red-500 text-white px-8 py-4 rounded-xl w-full shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/color-blind")}
        >
          Color Blind Test
        </button>

        {/* Uncomment and update as needed */}
        {/* <button
          className="bg-purple-500 text-white px-8 py-4 rounded-xl w-full shadow-lg hover:bg-purple-600 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/road-test")}
        >
          Road Test
        </button> */}
      </div>
    </div>
  );
};

export default TestSelection;

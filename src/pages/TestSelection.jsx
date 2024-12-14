// src/pages/TestSelection.jsx
import { useNavigate } from "react-router-dom";

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-800 p-6 sm:p-12">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg animate__animated animate__fadeIn">
        Ready to Challenge Yourself? 🚀
      </h1>

      <p className="text-lg sm:text-xl text-white text-center mb-10">
        Choose your test below and take the first step towards your progress.
      </p>

      {/* Test Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mb-12">
        <button
          className="bg-green-500 text-white px-10 py-5 rounded-xl shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/pre-test")}
        >
          Pre Test
        </button>

        <button
          className="bg-yellow-500 text-white px-10 py-5 rounded-xl shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/post-test")}
        >
          Post Test
        </button>

        <button
          className="bg-red-500 text-white px-10 py-5 rounded-xl shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/color-blind")}
        >
          Color Blind Test
        </button>

        <button
          className="bg-cyan-500 text-white px-10 py-5 rounded-xl shadow-lg hover:bg-cyan-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/road-test")}
        >
          Road Test
        </button>
      </div>

      {/* Progress Report Button */}
      <button
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 hover:shadow-xl mb-6"
        onClick={() => navigate("/progress-report")}
      >
        View Progress Report 📊
      </button>

      {/* New Registration Button */}
      <button
        className="bg-indigo-400 text-white px-10 py-5 rounded-xl shadow-lg hover:bg-indigo-800 transition duration-300 transform hover:scale-105 hover:shadow-xl"
        onClick={() => navigate("/new-registration")}
      >
        Home Page 📝
      </button>

      {/* Rules Section */}
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 w-full max-w-4xl mt-12 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-4 border-indigo-500 pb-3">
          Test Rules & Guidelines
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4 text-lg">
          <li>
            <strong>20 questions</strong> in each test—give it your best shot!
          </li>
          <li>All questions are <strong>mandatory</strong>.</li>
          <li>
            Complete the tests in the following order:
            <ol className="list-decimal list-inside ml-6 mt-2">
              <li>Pre Test</li>
              <li>Post Test</li>
              <li>Color Blind Test</li>
            </ol>
          </li>
          <li>
            Each question carries <strong>1 mark</strong>—so aim high!
          </li>
          <li>
            The total score for each test is <strong>20 marks</strong>.
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="text-center text-white mt-10">
        <p className="text-sm">
          Your success is just a test away! Take your time, and ace them all. 💪
        </p>
      </div>
    </div>
  );
};

export default TestSelection;

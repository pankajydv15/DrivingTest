import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProgressReport = () => {
  const navigate = useNavigate();

  // Example state or props for individual test scores (replace with actual data)
  const [preTestScore, setPreTestScore] = useState(10);  // Example PreTest score (out of 20)
  const [postTestScore, setPostTestScore] = useState(15); // Example PostTest score (out of 20)
  const [colorBlindTestScore, setColorBlindTestScore] = useState(12); // Example ColorBlind Test score (out of 20)

  // Calculate total score
  const totalScore = preTestScore + postTestScore + colorBlindTestScore;
  
  // Determine pass or fail
  const result = totalScore >= 30 ? "Pass" : "Fail";

  useEffect(() => {
    // Here you can replace the state with actual data coming from a backend or props
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6">Progress Report</h1>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          <p className="font-semibold text-lg">PreTest Score: {preTestScore} / 20</p>
          <p className="font-semibold text-lg">PostTest Score: {postTestScore} / 20</p>
          <p className="font-semibold text-lg">ColorBlind Test Score: {colorBlindTestScore} / 20</p>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-2xl">Total Score: {totalScore} / 60</p>
          <p className="font-semibold text-2xl">Result: <span className={result === "Pass" ? "text-green-500" : "text-red-500"}>{result}</span></p>
        </div>

        <button
          onClick={() => navigate("/test-selection")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
        >
          Back to Test Selection
        </button>
      </div>
    </div>
  );
};

export default ProgressReport;

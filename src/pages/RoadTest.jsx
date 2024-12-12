import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import your road sign images
import sign1 from "../assets/quest10.tif"; // Road Sign 1
// import sign2 from "../assets/sign2.jpg"; // Road Sign 2
// import sign3 from "../assets/sign3.jpg"; // Road Sign 3
// Add more images up to 20 as needed

// Define the road signs with correct answers and options
const roadSigns = [
  { id: 1, src: sign1, correctAnswer: "Stop Sign", options: ["Stop Sign", "Yield Sign", "Speed Limit", "Pedestrian Crossing"] },
//   { id: 2, src: sign2, correctAnswer: "Yield Sign", options: ["Stop Sign", "Yield Sign", "Speed Limit", "Pedestrian Crossing"] },
//   { id: 3, src: sign3, correctAnswer: "Speed Limit", options: ["Speed Limit", "Stop Sign", "Yield Sign", "Pedestrian Crossing"] },
  // Add remaining signs here up to 20
];

const RoadTest = () => {
  const navigate = useNavigate();

  // States to track progress and answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(roadSigns.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Function to handle answer selection
  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < roadSigns.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle form submission and calculate the score
  const handleSubmit = () => {
    const totalScore = answers.reduce((score, answer, index) => {
      if (answer === roadSigns[index].correctAnswer) return score + 1;
      return score;
    }, 0);
    setScore(totalScore);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6">Road Sign Identification Test</h1>

      {!isSubmitted ? (
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <img
              src={roadSigns[currentQuestionIndex].src}
              alt={`Road Sign ${currentQuestionIndex + 1}`}
              className="w-full h-72 object-contain"
            />
            <p className="font-semibold text-lg mt-4">
              What road sign do you see in the image?
            </p>

            <div className="space-y-2">
              {roadSigns[currentQuestionIndex].options.map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {currentQuestionIndex < roadSigns.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              disabled={answers[currentQuestionIndex] === null}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestionIndex] === null}
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition disabled:bg-gray-400"
            >
              Submit Test
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Total Score:</h2>
          <p className="text-4xl font-bold">{score} / {roadSigns.length}</p>
          <button
            onClick={() => navigate("/test-selection")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition"
          >
            Back to Test Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadTest;

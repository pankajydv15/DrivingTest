import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../ScoresContext";
import pic1 from "../assets/12_1.jpg"; // Sample image 1
import pic2 from "../assets/15.jpg"; // Sample image 2
import pic3 from "../assets/16.jpg"; // Sample image 3
import pic4 from "../assets/3_1.jpg"; // Sample image 3
import pic5 from "../assets/5.jpeg"; // Sample image 3
import pic6 from "../assets/57.jpeg"; // Sample image 3
import pic7 from "../assets/57_1.jpg"; // Sample image 3
import pic8 from "../assets/5_1.jpg"; // Sample image 3
import pic9 from "../assets/5_2.jpg"; // Sample image 3
import pic10 from "../assets/6.jpeg"; // Sample image 3
import pic11 from "../assets/6_1.jpg"; // Sample image 3
import pic12 from "../assets/6_2.jpg"; // Sample image 3
import pic13 from "../assets/7.jpeg"; // Sample image 3
import pic14 from "../assets/7_1.jpg"; // Sample image 3
import pic15 from "../assets/7_2.jpeg"; // Sample image 3
import pic16 from "../assets/8.jpg"; // Sample image 3
import pic17 from "../assets/8_1.jpg"; // Sample image 3
import pic18 from "../assets/8_2.jpeg"; // Sample image 3
import pic19 from "../assets/two.jpeg"; // Sample image 3
import pic20 from "../assets/15.jpg"; // Sample image 3

// Define the 3 color-blind test images and their corresponding correct answers along with options
const images = [
  { id: 1, src: pic1, correctAnswer: "12", options: ["11", "12", "13", "14"] },
  { id: 2, src: pic2, correctAnswer: "15", options: ["15", "3", "12", "4"] },
  { id: 3, src: pic3, correctAnswer: "16", options: ["18", "7", "16", "9"] },
  { id: 4, src: pic4, correctAnswer: "3", options: ["8", "3", "6", "9"] },
  { id: 5, src: pic5, correctAnswer: "5", options: ["8", "7", "5", "9"] },
  { id: 6, src: pic6, correctAnswer: "57", options: ["8", "57", "62", "19"] },
  { id: 7, src: pic7, correctAnswer: "57", options: ["87", "57", "56", "79"] },
  { id: 8, src: pic8, correctAnswer: "5", options: ["8", "5", "6", "9"] },
  { id: 9, src: pic9, correctAnswer: "5", options: ["8", "7", "6", "5"] },
  { id: 10, src: pic10, correctAnswer: "6", options: ["8", "7", "6", "9"] },
  { id: 11, src: pic11, correctAnswer: "6", options: ["8", "7", "6", "9"] },
  { id: 12, src: pic12, correctAnswer: "6", options: ["8", "7", "6", "9"] },
  { id: 13, src: pic13, correctAnswer: "7", options: ["8", "7", "6", "9"] },
  { id: 14, src: pic14, correctAnswer: "7", options: ["8", "7", "6", "9"] },
  { id: 15, src: pic15, correctAnswer: "7", options: ["8", "7", "6", "9"] },
  { id: 16, src: pic16, correctAnswer: "8", options: ["8", "7", "6", "9"] },
  { id: 17, src: pic17, correctAnswer: "8", options: ["8", "7", "6", "9"] },
  { id: 18, src: pic18, correctAnswer: "8", options: ["8", "7", "6", "9"] },
  { id: 19, src: pic19, correctAnswer: "2", options: ["8", "7", "2", "9"] },
  { id: 20, src: pic20, correctAnswer: "15", options: ["8", "17", "61", "15"] },
];

const ColorBlindTest = () => {
  const navigate = useNavigate();
  const { scores, updateScores, userId, setScores } = useScores(); // Access the scores and updateScores function

  // States to track progress and answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(images.length).fill(null));
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
    if (currentQuestionIndex < images.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle form submission and calculate the score
  const handleSubmit = () => {
    const totalScore = answers.reduce((score, answer, index) => {
      if (answer === images[index].correctAnswer) return score + 1;
      return score;
    }, 0);
    setScore(totalScore);
    setIsSubmitted(true);

     // Update scores immutably
    setScores((prevScores) => ({
      ...prevScores,
      colorBlindTestScore: totalScore, // Update only the color-blind test score
    }));
  
    
    updateScores(scores.preTestScore, scores.postTestScore, totalScore, scores.roadTestScore, userId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6">Color Blind Test</h1>

      {!isSubmitted ? (
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <img
              src={images[currentQuestionIndex].src}
              alt={`Question ${currentQuestionIndex + 1}`}
              className="w-full h-72 object-contain"
            />
            <p className="font-semibold text-lg mt-4">
              What number do you see in the image?
            </p>

            <div className="space-y-2">
              {images[currentQuestionIndex].options.map((option, i) => (
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

          {currentQuestionIndex < images.length - 1 ? (
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
          <p className="text-4xl font-bold">{score} / {images.length}</p>
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

export default ColorBlindTest;

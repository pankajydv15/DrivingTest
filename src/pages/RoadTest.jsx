import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../ScoresContext";
import pic1 from "../assets/stop.png"; // Sample image 1
import pic2 from "../assets/pic2.png"; // Sample image 2
import pic3 from "../assets/pic3.png"; // Sample image 3
// import pic4 from "../assets/pic4.png"; // Sample image 3
import pic5 from "../assets/pic5.png"; // Sample image 3
import pic6 from "../assets/pic 6.png"; // Sample image 3
import pic7 from "../assets/pic7.jpg"; // Sample image 3
import pic8 from "../assets/pic8.png"; // Sample image 3
import pic9 from "../assets/pic9.png"; // Sample image 3
import pic10 from "../assets/pic10.png"; // Sample image 3
import pic11 from "../assets/pic11.jpg"; // Sample image 3
import pic12 from "../assets/pic12.png"; // Sample image 3
import pic13 from "../assets/pic13.jpg"; // Sample image 3
import pic14 from "../assets/pic14.png"; // Sample image 3
import pic15 from "../assets/pic141.png"; // Sample image 3
import pic16 from "../assets/pic21.png"; // Sample image 3
import pic17 from "../assets/pic17.jpg"; // Sample image 3
import pic18 from "../assets/pic18.jpg"; // Sample image 3
import pic19 from "../assets/pic19.png"; // Sample image 3
import pic20 from "../assets/pic20.png"; // Sample image 3
import pic21 from "../assets/pic16.webp"; // Sample image 3

// Define the 3 color-blind test images and their corresponding correct answers along with options
const images = [
  {
    id: 1,
    src: pic1,
    options: [
      "मार्ग बंद है।",
      "रेल-फाटक।",
      "प्रवेश निषेध है।",
      "वाहन रोकना या खड़ा करना निषेध है।",
    ],
    correctAnswer: "प्रवेश निषेध है।",
  },
  {
    id: 2,
    src: pic2,
    options: [
      "सड़क पर मलबा है।",
      "श्रमिक काम पर हैं।",
      "सड़क पर गड्ढे हैं।",
    ],
    correctAnswer: "श्रमिक काम पर हैं।",
  },
  {
    id: 3,
    src: pic3,
    options: [
      "आगे बाएं मुड़ना मना है।",
      "यहाँ बाएं मुड़ना मना है।",
      "यहाँ बाएं मुड़ें।",
    ],
    correctAnswer: "यहाँ बाएं मुड़ना मना है।",
  },
  {
    id: 4,
    src: pic5,
    question: "उपरोक्त सड़क चिन्ह का क्या तात्पर्य है?",
    options: ["आगे बड़ी सड़क है।", "टी चौराहा।", "बंद गली।"],
    correctAnswer: "बंद गली।",
  },
  {
    id: 5,
    src: pic6,
    question: "उपरोक्त सड़क चिन्ह क्या दर्शाता है?",
    options: [
      "३ सड़कें मिल रही हैं।",
      "पार्किंग क्षेत्र।",
      "रास्ता दें।",
      "आगे खतरा है।",
    ],
    correctAnswer: "रास्ता दें।",
  },
  {
    id: 6,
    src: pic7,
    question: "उपरोक्त सड़क चिन्ह का क्या तात्पर्य है?",
    options: [
      "मोटर वाहन का प्रवेश निषेध है।",
      "अपना वाहन यहाँ खड़ा करें।",
      "यहां वाहन खड़ा करनेकी अनुमति नहीं है।",
    ],
    correctAnswer: "मोटर वाहन का प्रवेश निषेध है।",
  },
  {
    id: 7,
    src: pic8,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "पार्क या खेलकूद का मैदान।",
      "पार्किंग क्षेत्र।",
      "पार्किंग मना है।",
    ],
    correctAnswer: "पार्किंग क्षेत्र।",
  },
  {
    id: 8,
    src: pic9,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: ["ठहरिए / स्टॉप।", "वाहन खड़ा करना मना है।", "प्रवेश निषेध।"],
    correctAnswer: "ठहरिए / स्टॉप।",
  },
  {
    id: 9,
    src: pic10,
    question: "उपरोक्त सड़क चिन्ह वाहन चालकों को क्या बताता है?",
    options: [
      "खड़ी चढ़ाई।",
      "आगे खड़ी चट्टान है।",
      "नीचे गिरने का खतरा।",
    ],
    correctAnswer: "आगे खड़ी चट्टान है।",
  },
  {
    id: 10,
    src: pic11,
    question: "उपरोक्त सड़क चिन्ह का क्या तात्पर्य है?",
    options: [
      "एकतरफा सड़क।",
      "अन्य वाहनों से आगे निकलें (ओवरटेक करें)।",
      "आगे निकलना (ओवरटेकिंग) निषेध है।",
    ],
    correctAnswer: "आगे निकलना (ओवरटेकिंग) निषेध है।",
  },
  {
    id: 11,
    src: pic12,
    question: "उपरोक्त सड़क चिन्ह वाहन चालकों को क्या बताता है?",
    options: [
      "आगे बाएं मुड़ें।",
      "बाएं मुड़े।",
      "बायां मोड़ या घुमाव।",
    ],
    correctAnswer: "बायां मोड़ या घुमाव।",
  },
  {
    id: 12,
    src: pic13,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "हॉर्न बजाना आवश्यक है।",
      "आवश्यक्ता होने पर हॉर्न बजा सकते हैं।",
      "हॉर्न बजाना मना है।",
    ],
    correctAnswer: "हॉर्न बजाना मना है।",
  },
  {
    id: 13,
    src: pic14,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "पैदल पार पथ।",
      "पदयात्री निषिद्ध।",
      "पैदल यात्रियों का ध्यान रखें।",
    ],
    correctAnswer: "पदयात्री निषिद्ध।",
  },
  {
    id: 14,
    src: pic15,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "उल्टा मोड़ (यू-टर्न) लेकर वाहन खड़ा (पार्क) करें।",
      "दो-तरफा यातायात।",
      "उल्टा मोड़ (यू-टर्न) लेना निषिद्ध है।",
      "उल्टा मोड़ (यू-टर्न) लें।",
    ],
    correctAnswer: "उल्टा मोड़ (यू-टर्न) लेना निषिद्ध है।",
  },
  {
    id: 15,
    src: pic16,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "पैदल पार पथ।",
      "पदयात्री निषिद्ध।",
      " आगे सीधा जाना मना है।",
    ],
    correctAnswer: " आगे सीधा जाना मना है।",
  },
  {
    id: 16,
    src: pic21,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "वाहन की अधिकतम ऊँचाई 3.8 मीटर होनी चाहिए।",
      "वाहन की अधिकतम ऊँचाई 3.8 मीटर से अधिक नहीं होनी चाहिए।",
      " वाहन की न्यूनतम ऊँचाई 3.8 मीटर होनी चाहिए।",
    ],
    correctAnswer: " वाहन की अधिकतम ऊँचाई 3.8 मीटर से अधिक नहीं होनी चाहिए।",
  },
  {
    id: 17,
    src: pic17,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
     " वाहन की अधिकतम चौड़ाई।",
     " वाहन की अधिकतम ऊँचाई।",
      "वाहन की अधिकतम लंबाई।",
     " वाहन की अधिकतम गति।,"
    ],
    correctAnswer: "वाहन की अधिकतम ऊँचाई।",
  },
  {
    id: 18,
    src: pic18,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "50 की सीमा।",
      "50 पदयात्री निषिद्ध।",
      "खड़ी चढ़ाई।",
    ],
    correctAnswer: "50 की सीमा।",
  },
  {
    id: 19,
    src: pic19,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "5 टन से अधिक वजन का वाहन प्रवेश वर्जित।",
      "5 मीटर से अधिक ऊंचा वाहन प्रवेश वर्जित।",
      "5 किलोमीटर प्रति घंटे की गति से चलें।",
      "5 मीटर चौड़ा वाहन ही प्रवेश कर सकता है।",
    ],
    correctAnswer: "5 टन से अधिक वजन का वाहन प्रवेश वर्जित।",
  },
  {
    id: 20,
    src: pic20,
    question: "उपरोक्त सड़क चिन्ह का क्या अर्थ है?",
    options: [
      "आगे क्रॉसिंग है।",
      " आगे खतरनाक मोड़ है।",
      "आगे पुल है।",
      "आगे अवरोध है।",
    ],
    correctAnswer: "आगे अवरोध है।",
  },


  
];

const RoadTest = () => {
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
      roadTestScore: totalScore, // Update only the road test score
    }));

    updateScores(scores.preTestScore, scores.postTestScore, scores.colorBlindTestScore, totalScore, userId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6">Road Test</h1>

      {!isSubmitted ? (
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <img
              src={images[currentQuestionIndex].src}
              alt={`Question ${currentQuestionIndex + 1}`}
              className="w-full h-72 object-contain"
            />
            <p className="font-semibold text-lg mt-4">
            उपरोक्त सड़क चिन्ह क्या दर्शाता है?
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
          <p className="text-4xl font-bold">
            {score} / {images.length}
          </p>
          <button
            onClick={() => navigate("/progress-report")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition"
          >
            Result
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadTest;

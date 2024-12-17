// src/pages/PreTest.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../ScoresContext";

const PreTest = () => {
  const navigate = useNavigate();
  const { scores, updateScores, userId, setScores } = useScores();


  useEffect(()=>{
    console.log("userId", userId)
  },[])
  const questions = [
    {
      id: 1,
      question: "सड़क पर गाड़ी चलाते समय सीट बेल्ट पहनना है:",
      options: ["वैकल्पिक", "जरूरी", "केवल लंबी यात्रा के लिए", "केवल ड्राइवर के लिए"],
      answer: "जरूरी",
    },
    {
      id: 2,
      question: "सड़क पर ज़ेब्रा क्रॉसिंग का उपयोग किसके लिए होता है?",
      options: ["पैदल यात्रियों के लिए", "साइकिल चालकों के लिए", "गाड़ियों के पार्किंग के लिए", "बस स्टॉप के लिए"],
      answer: "पैदल यात्रियों के लिए",
    },
    {
      id: 3,
      question: "लाल ट्रैफिक लाइट का क्या अर्थ है?",
      options: ["गाड़ी धीमी करें", "गाड़ी रोकें", "गाड़ी चलाते रहें", "मोड़ लें"],
      answer: "गाड़ी रोकें",
    },
    {
      id: 4,
      question: "गाड़ी चलाते समय मोबाइल फोन का उपयोग करना:",
      options: ["अनुमति है", "मना है", "केवल जरुरी कॉल के लिए", "स्पीकर मोड पर अनुमति है"],
      answer: "मना है",
    },
    {
      id: 5,
      question: "क्या करना चाहिए अगर आप ओवरटेक करना चाहते हैं?",
      options: ["हॉर्न बजाकर संकेत दें", "हेडलाइट ब्लिंक करें", "दोनों विकल्पों का उपयोग करें", "सीधे पास करें"],
      answer: "दोनों विकल्पों का उपयोग करें",
    },
    {
      id: 6,
      question: "पीली ट्रैफिक लाइट का अर्थ है:",
      options: ["गाड़ी रोकें", "गाड़ी धीमी करें और तैयार रहें", "गाड़ी तेज चलाएं", "हॉर्न बजाएं"],
      answer: "गाड़ी धीमी करें और तैयार रहें",
    },
    {
      id: 7,
      question: "सड़क पर 'U' टर्न लेने से पहले क्या करना चाहिए?",
      options: ["स्पीड बढ़ाएं", "रियर व्यू मिरर चेक करें और इंडिकेटर दें", "बिना देखे मोड़ लें", "कोई ध्यान न दें"],
      answer: "रियर व्यू मिरर चेक करें और इंडिकेटर दें",
    },
    {
      id: 8,
      question: "हॉर्न का उपयोग कब करना चाहिए?",
      options: ["गुस्से में", "भीड़ वाले स्थानों पर", "केवल जरूरी स्थिति में", "हर समय"],
      answer: "केवल जरूरी स्थिति में",
    },
    {
      id: 9,
      question: "रात में गाड़ी चलाते समय आप हेडलाइट्स को किस मोड पर रखें?",
      options: ["हाई बीम", "लो बीम", "पार्किंग लाइट", "हेडलाइट बंद"],
      answer: "लो बीम",
    },
    {
      id: 10,
      question: "अगर सड़क पर गाड़ी स्लिप हो रही हो तो क्या करें?",
      options: ["ब्रेक जोर से लगाएं", "स्टीयरिंग घुमाएं", "ब्रेक धीरे लगाएं और नियंत्रण बनाए रखें", "एक्सीलेटर दबाएं"],
      answer: "ब्रेक धीरे लगाएं और नियंत्रण बनाए रखें",
    },
    {
      id: 11,
      question: "ओवरस्पीडिंग का क्या मतलब है?",
      options: ["धीरे चलना", "निर्धारित गति सीमा से तेज चलना", "ट्रैफिक सिग्नल पर रुकना", "वाहन पार्क करना"],
      answer: "निर्धारित गति सीमा से तेज चलना",
    },
    {
      id: 12,
      question: "'STOP' साइन बोर्ड का क्या मतलब है?",
      options: ["गाड़ी धीमी करें", "गाड़ी रोकें", "तेज गति से चलें", "केवल बाइक के लिए"],
      answer: "गाड़ी रोकें",
    },
    {
      id: 13,
      question: "सड़क पर स्पीड ब्रेकर का उद्देश्य क्या है?",
      options: ["गाड़ी रोकने के लिए", "गाड़ी की गति कम करने के लिए", "गाड़ी तेज चलाने के लिए", "पार्किंग के लिए"],
      answer: "गाड़ी की गति कम करने के लिए",
    },
    {
      id: 14,
      question: "दाएं मोड़ पर गाड़ी मुड़ने से पहले क्या करना चाहिए?",
      options: ["इंडिकेटर दें और धीरे गति बढ़ाएं", "बिना देखे मोड़ लें", "हॉर्न बजाएं", "सड़क खाली हो तब मुड़ें"],
      answer: "इंडिकेटर दें और धीरे गति बढ़ाएं",
    },
    {
      id: 15,
      question: "सड़क पर डबल पीली लाइन का क्या अर्थ है?",
      options: ["पार्किंग की अनुमति है", "ओवरटेकिंग मना है", "ट्रैफिक धीमा है", "गाड़ी घुमाने की अनुमति है"],
      answer: "ओवरटेकिंग मना है",
    },
    {
      id: 16,
      question: "किस स्थिति में हेडलाइट का उपयोग जरूरी है?",
      options: ["धुंध और रात में", "दिन के समय", "गाड़ी खड़ी करते समय", "कभी भी"],
      answer: "धुंध और रात में",
    },
    {
      id: 17,
      question: "सड़क पर 'NO PARKING' साइन का मतलब है?",
      options: ["गाड़ी पार्क कर सकते हैं", "गाड़ी पार्क नहीं कर सकते", "केवल बाइक पार्क कर सकते हैं", "गाड़ी धीमी चलाएं"],
      answer: "गाड़ी पार्क नहीं कर सकते",
    },
    {
      id: 18,
      question: "तीव्र मोड़ (Sharp Turn) के समय क्या करना चाहिए?",
      options: ["स्पीड बढ़ाएं", "स्पीड धीमी करें", "ब्रेक न लगाएं", "हॉर्न न बजाएं"],
      answer: "स्पीड धीमी करें",
    },
    {
      id: 19,
      question: "सड़क पर 'HORN PROHIBITED' का क्या मतलब है?",
      options: ["हॉर्न बजाना मना है", "केवल जरूरी स्थिति में हॉर्न बजाएं", "हॉर्न लगातार बजाएं", "धीमी गति से चलें"],
      answer: "हॉर्न बजाना मना है",
    },
    {
      id: 20,
      question: "सड़क पर चलने वाले बच्चों के पास से गाड़ी चलाते समय क्या करें?",
      options: ["गाड़ी तेज चलाएं", "स्पीड धीमी करें और सतर्क रहें", "हॉर्न बजाएं", "गाड़ी रोक दें"],
      answer: "स्पीड धीमी करें और सतर्क रहें",
    },
  
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((score, answer, index) => {
      if (answer === questions[index].answer) return score + 1;
      return score;
    }, 0);
    setScore(totalScore);
    setIsSubmitted(true);

    // Update scores immutably
    setScores((prevScores) => ({
      ...prevScores,
      preTestScore: totalScore, // Update only the pre-test score
    }));
    updateScores(totalScore, scores.postTestScore, scores.colorBlindTestScore, scores.roadTestScore, userId );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Pre Test</h1>

      {!isSubmitted ? (
        <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl space-y-6">
          <div className="space-y-4">
            <p className="text-xl font-semibold">
              <span className="font-bold text-indigo-500">Q{currentQuestionIndex + 1}. </span>
              {questions[currentQuestionIndex].question}
            </p>
            <div className="space-y-2">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <label key={i} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerChange(option)}
                    className="mr-2 accent-indigo-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              disabled={answers[currentQuestionIndex] === null}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg w-full hover:bg-indigo-600 transition disabled:bg-gray-400"
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
        <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-semibold">Your Total Score:</h2>
          <p className="text-4xl font-bold">{score} / {questions.length}</p>
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

export default PreTest;

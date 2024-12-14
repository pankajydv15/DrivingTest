import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../ScoresContext";

const questions = [
    {
        id: 1,
        question: "जब आप ट्रक चला रहे हों तो रियर व्यू मिरर का क्या महत्व है?",
        options: ["गाड़ी के पीछे को देखने के लिए", "गाड़ी को पार्क करने के लिए", "सिर्फ गाड़ी के साइड चेक करने के लिए", "सिर्फ गाड़ी की गति बढ़ाने के लिए"],
        answer: "गाड़ी के पीछे को देखने के लिए",
      },
      {
        id: 2,
        question: "ट्रक ड्राइव करते समय सही ब्रेकिंग तकनीक क्या है?",
        options: ["स्ट्रोक ब्रेक का उपयोग करना", "ब्रेक को अचानक दबाना", "धीरे-धीरे ब्रेक लगाना", "हॉर्न दबाकर ब्रेक लगाना"],
        answer: "धीरे-धीरे ब्रेक लगाना",
      },
      {
        id: 3,
        question: "ट्रक को ओवरलोड करना क्यों खतरनाक है?",
        options: ["इंजन की शक्ति कम हो जाती है", "गाड़ी का संतुलन बिगड़ जाता है", "ट्रक की स्पीड बढ़ती है", "गाड़ी की बैटरी जल्दी खत्म होती है"],
        answer: "गाड़ी का संतुलन बिगड़ जाता है",
      },
      {
        id: 4,
        question: "ट्रक ड्राइव करते समय स्टॉप साइन पर क्या करना चाहिए?",
        options: ["गाड़ी रोकें और चारों ओर देखें", "गाड़ी धीमी करें और आगे बढ़ें", "गाड़ी की गति बढ़ाएं", "हॉर्न बजाएं"],
        answer: "गाड़ी रोकें और चारों ओर देखें",
      },
      {
        id: 5,
        question: "ट्रक के लिए सही गति सीमा क्या होती है?",
        options: ["सड़क के सिग्नल के अनुसार", "60 किमी/घंटा", "80 किमी/घंटा", "90 किमी/घंटा"],
        answer: "सड़क के सिग्नल के अनुसार",
      },
      {
        id: 6,
        question: "ट्रक चलाते समय जोन चेंज करते समय क्या करना चाहिए?",
        options: ["इंडिकेटर का उपयोग करें और मिरर चेक करें", "हॉर्न बजाएं", "गाड़ी की गति बढ़ाएं", "सिर्फ सीधे चलें"],
        answer: "इंडिकेटर का उपयोग करें और मिरर चेक करें",
      },
      {
        id: 7,
        question: "जब आप ट्रक से अचानक रुकते हैं तो क्या होता है?",
        options: ["गाड़ी का संतुलन बिगड़ता है", "ट्रक को नुकसान पहुंचता है", "हॉर्न बजता है", "स्टीयरिंग कंट्रोल से बाहर हो जाता है"],
        answer: "गाड़ी का संतुलन बिगड़ता है",
      },
      {
        id: 8,
        question: "आप ट्रक में क्या रखें जिससे ट्रक की सुरक्षा बढ़े?",
        options: ["सुरक्षा उपकरण", "ज्यादा सामान", "अनावश्यक चीजें", "किसी भी वस्तु का बिना चेक किए"],
        answer: "सुरक्षा उपकरण",
      },
      {
        id: 9,
        question: "ट्रक की बैक लाइट का क्या उपयोग होता है?",
        options: ["ट्रक के पीछे के हिस्से को रोशन करने के लिए", "सड़क पर दिखने के लिए", "वाहन के अंदर रोशनी करने के लिए", "किसी वस्तु को देख सकने के लिए"],
        answer: "ट्रक के पीछे के हिस्से को रोशन करने के लिए",
      },
      {
        id: 10,
        question: "ट्रक चलाते समय भारी मौसम में क्या करना चाहिए?",
        options: ["गाड़ी की गति धीमी करें और सतर्क रहें", "गाड़ी तेज चलाएं", "गाड़ी की गति बनाए रखें", "गाड़ी पार्क करें"],
        answer: "गाड़ी की गति धीमी करें और सतर्क रहें",
      },
      {
        id: 11,
        question: "ट्रक चलाते समय अगर स्टीयरिंग में समस्या हो तो क्या करें?",
        options: ["स्टीयरिंग का बल बढ़ाएं", "स्टीयरिंग को इधर-उधर घुमाएं", "गाड़ी को रोककर स्टीयरिंग चेक करें", "स्टीयरिंग को घुमा कर गाड़ी को सीधे रखें"],
        answer: "गाड़ी को रोककर स्टीयरिंग चेक करें",
      },
      {
        id: 12,
        question: "ट्रक के डीजल टैंक को सही समय पर भरने के फायदे क्या हैं?",
        options: ["गाड़ी की गति बढ़ती है", "ट्रक के इंजन को नुकसान नहीं होता", "साधारण रखरखाव", "ट्रक की बैटरी लंबी चलती है"],
        answer: "ट्रक के इंजन को नुकसान नहीं होता",
      },
      {
        id: 13,
        question: "ट्रक चलाते समय क्या नहीं करना चाहिए?",
        options: ["फोन पर बात करना", "गति सीमा का पालन करना", "ट्रक के टायर चेक करना", "स्मोकिंग करना"],
        answer: "फोन पर बात करना",
      },
      {
        id: 14,
        question: "क्या करना चाहिए जब ट्रक में ब्रेक काम नहीं कर रहे हों?",
        options: ["ब्रेक की शक्ति बढ़ाएं", "इंजन ब्रेक का उपयोग करें", "स्टीयरिंग से कंट्रोल लें", "ट्रक को रिवर्स मोड में डालें"],
        answer: "इंजन ब्रेक का उपयोग करें",
      },
      {
        id: 15,
        question: "गति सीमा के बारे में क्या महत्वपूर्ण है?",
        options: ["सड़क पर दिखाए गए सिग्नल का पालन करें", "ट्रक की स्पीड बढ़ाएं", "गति सीमा को नजरअंदाज करें", "रात को गति बढ़ाएं"],
        answer: "सड़क पर दिखाए गए सिग्नल का पालन करें",
      },
      {
        id: 16,
        question: "रात के समय ट्रक चलाते समय क्या ध्यान रखना चाहिए?",
        options: ["हेडलाइट्स को ठीक से सेट करें", "सड़क के किनारे गाड़ी चलाएं", "गति बढ़ाएं", "हॉर्न बजाएं"],
        answer: "हेडलाइट्स को ठीक से सेट करें",
      },
      {
        id: 17,
        question: "यदि ट्रक का टायर फट जाए तो क्या करना चाहिए?",
        options: ["गाड़ी रोककर टायर बदलें", "गाड़ी को धीमा कर लें", "टायर का प्रेशर चेक करें", "टायर को खुद ही रिपेयर करें"],
        answer: "गाड़ी रोककर टायर बदलें",
      },
      {
        id: 18,
        question: "गाड़ी पार्क करते समय ट्रक के इंजन को किस स्थिति में रखना चाहिए?",
        options: ["ऑफ", "ऑन", "इंजन चेक करें", "इंजन चलाते रहें"],
        answer: "ऑफ",
      },
      {
        id: 19,
        question: "ट्रक के टायरों में कम वायु दबाव क्या करता है?",
        options: ["ट्रक को धीमा करता है", "गाड़ी का नियंत्रण बिगाड़ता है", "ब्रेकिंग क्षमता को बढ़ाता है", "स्पीड बढ़ाता है"],
        answer: "गाड़ी का नियंत्रण बिगाड़ता है",
      },
      {
        id: 20,
        question: "ट्रक के इंजन में हीट बढ़ने से क्या होता है?",
        options: ["इंजन बंद हो सकता है", "गाड़ी की स्पीड बढ़ जाती है", "ट्रक का संतुलन बिगड़ता है", "इंजन सही रहता है"],
        answer: "इंजन बंद हो सकता है",
      }
];

const PostTest = () => {
  const { scores, updateScores } = useScores(); // Use the context hook
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [localScore, setLocalScore] = useState(0); // Local score for this test
  const [testFinished, setTestFinished] = useState(false);
  const navigate = useNavigate();

  // Reset postTestScore when the component is mounted
  useEffect(() => {
    setLocalScore(0); // Reset local score
  }, []);

  const handleOptionChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setLocalScore(localScore + 1); // Update local score
    }

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer("");
    } else {
      // Test finished, update global score
      updateScores(scores.preTestScore, localScore, scores.colorBlindTestScore); // Use local score
      setTestFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen p-6">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
        Post Test
      </h1>
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl space-y-6">
        {!testFinished ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {questions[currentQuestionIndex].id}.{" "}
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
                >
                  <input
                    type="radio"
                    name={`question-${questions[currentQuestionIndex].id}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleOptionChange(option)}
                    className="form-radio text-blue-500 focus:ring focus:ring-blue-300"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition ${
                  selectedAnswer
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {currentQuestionIndex + 1 === questions.length
                  ? "Finish Test"
                  : "Next Question"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              आपका स्कोर: {localScore} / {questions.length}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              आपने परीक्षण सफलतापूर्वक पूरा कर लिया है।
            </p>
            <button
              onClick={() => navigate("/test-selection")}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Back to Test Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default PostTest;

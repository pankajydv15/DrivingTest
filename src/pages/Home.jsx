// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center animate__animated animate__fadeInUp animate__delay-1s">
        Welcome to the <span className="text-yellow-300">Driver Assessment Test</span>
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8 text-center max-w-2xl animate__animated animate__fadeInUp animate__delay-2s">
        Test your driving skills and get ready for the road ahead with our interactive assessment tool.
      </p>
      <button
        onClick={handleStartTest}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 text-lg md:text-xl rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInUp animate__delay-3s"
      >
        Start Test
      </button>
      <div className="absolute bottom-6 text-sm text-gray-200 text-center">
        <p>© 2024 Driver Assessment Test. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Home;

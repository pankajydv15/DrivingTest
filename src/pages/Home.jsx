// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center shadow-lg animate__animated animate__fadeInUp animate__delay-1s">
        Welcome to the Driver Assessment Test
      </h1>
      <p className="text-xl mb-6 text-center animate__animated animate__fadeInUp animate__delay-2s">
        Test your skills and prepare for the road ahead.
      </p>
      <button
        onClick={handleStartTest}
        className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        Start Test
      </button>
    </div>
  );
};

export default Home;

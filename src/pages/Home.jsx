// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import labsim from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 text-white">
      {/* Header Section */}
      <header className="w-full py-6 px-8 bg-black/30 backdrop-blur-md flex items-center justify-between">
        {/* Labsim Logo (Top Left Corner) */}
        <div className="flex items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
            <img
              src={labsim}
              alt="Labsim Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center w-full">
          Driver Assessment Test
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center px-4 py-8 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
          Welcome to the Road Ahead!
        </h2>

        {/* Framed Logo */}
        <div className="relative mb-6 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-xl p-1">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <img
              src={logo}
              alt="Driver Assessment Logo"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-contain"
            />
          </div>
        </div>

        <h2 className="text-4xl md:text-4xl font-extrabold mb-8">
          Powered By <span className="text-yellow-400">Labsim</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
          Test your driving skills with our interactive tool. Sharpen your
          knowledge and prepare for a confident journey on the road!
        </p>
        <button
          onClick={handleStartTest}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Start Your Test
        </button>
      </main>

      {/* Decorative Elements */}
      <div className="absolute top-16 right-10 w-48 h-48 bg-purple-300 opacity-30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 opacity-20 rounded-full blur-2xl"></div>

      {/* Footer */}
      <footer className="w-full py-4 bg-black/40 backdrop-blur-md text-center text-sm text-gray-300">
        <p>© 2024 Driver Assessment Test. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

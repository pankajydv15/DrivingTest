// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "labsim" && password === "12345") {
      navigate("/new-registration");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Framed Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-xl">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-28 h-28 rounded-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Login Title */}
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Welcome 
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please log in to access your account.
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 opacity-30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-400 opacity-30 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Login;

import { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls

// Create the context
const ScoresContext = createContext();

// Base URL for the backend API
const API_BASE_URL = "http://localhost:5000/api"; // Update this to your backend URL

// Create the provider component
export const ScoresProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For validation errors


  const [scores, setScores] = useState({
    preTestScore: 0,
    postTestScore: 0,
    colorBlindTestScore: 0,
    roadTestScore: 0,
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    licenseNumber: "",
    dob: "",
    location: "",
    expiryDate: "",
    issuedDate: "",
    mobileNumber: "",
    ttNumber: "",
    photo: "",
     _id: "", 
  });

  

  const addUser = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      console.log("Backend Response:", response.data);
  
      const id = response.data.user._id;
      setUserId(id);
      setUserDetails({ ...formData, _id: id });
      setIsSubmitted(true);
  
      // Wait for state updates to complete, then call updateScores
      await new Promise((resolve) => setTimeout(resolve, 0));
      await updateScores(0, 0, 0, 0, id);
      return response;
    } catch (error) {
      console.error("Error saving user details:", error);
      setErrorMessage("Failed to save user details. Please try again.");
    }
  };
  
  
  // Function to fetch user details from backend
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      setUserDetails(response.data); // Update the context state with fetched data
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to update user details in backend and context
  const updateUserDetails = async (details) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, details);
      setUserDetails(response.data); // Update the context state with saved data
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Function to fetch scores from backend
  const fetchScores = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scores/${userId}`);
      setScores(response.data); // Update the context state with fetched data
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  // Function to update scores in backend and context
  const updateScores = async (preTest, postTest, colorBlind, roadTest, user_id) => {

    if (!user_id) {
      console.error("User ID is missing or userDetails is undefined");
      // setError("User ID is missing. Please try again.");
      return; // Don't proceed with the API call if userDetails._id is missing
    }
    
    try {
      console.log("API Base URL:", `${API_BASE_URL}/users/scores/save`);
      console.log("Request Payload:", {
        userId: user_id,
        preTestScore: preTest,
        postTestScore: postTest,
        colorBlindTestScore: colorBlind,
        roadTestScore: roadTest,
});
      const response = await axios.post(`${API_BASE_URL}/users/scores/save`, {
        userId: user_id,
        preTestScore: preTest,
        postTestScore: postTest,
        colorBlindTestScore: colorBlind,
        roadTestScore: roadTest,
      });
      console.log("Response from API:", response.data);
      if (response.data) {
        setScores((prevScores) => ({
          ...prevScores,
          ...response.data,
        }));
      } else {
        console.error("API response is empty or invalid");
      }
    } catch (error) {
      console.error("Error in Axios request/error updating scores:", error.response ? error.response.data : error.message);
    }
  };

  
  return (
    <ScoresContext.Provider
      value={{
        scores,
        setScores,
        updateScores,
        fetchScores, // Added fetchScores function
        userDetails,
        addUser,
        userId,
        errorMessage,
        isSubmitted,
        // updateUserId, // Provide updateUserId function
        updateUserDetails,
        fetchUserDetails, // Added fetchUserDetails function
      }}
    >
      {children}
    </ScoresContext.Provider>
  );
};

// Custom hook to use the context
export const useScores = () => useContext(ScoresContext);

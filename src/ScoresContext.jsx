import { createContext, useState, useContext } from "react";

// Create the context
const ScoresContext = createContext();

// Create the provider component
export const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState({
    preTestScore: 0,
    postTestScore: 0,
    colorBlindTestScore: 0,
    roadTestScore:0,
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
  });

  // Function to update scores
  const updateScores = (preTest, postTest, colorBlind) => {
    setScores({
      preTestScore: preTest,
      postTestScore: postTest,
      colorBlindTestScore: colorBlind,
    });
  };

  // Function to update user details
  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  return (
    <ScoresContext.Provider value={{ scores, updateScores, userDetails, updateUserDetails }}>
      {children}
    </ScoresContext.Provider>
  );
};

export const useScores = () => useContext(ScoresContext);

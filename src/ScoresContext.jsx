import { createContext, useState, useContext } from "react";

// Create the context
const ScoresContext = createContext();

// Create the provider component
export const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState({
    preTestScore: 0,
    postTestScore: 0,
    colorBlindTestScore: 0,
  });

  // Function to update scores
  const updateScores = (preTest, postTest, colorBlind) => {
    setScores({
      preTestScore: preTest,
      postTestScore: postTest,
      colorBlindTestScore: colorBlind,
    });
  };

  return (
    <ScoresContext.Provider value={{ scores, updateScores }}>
      {children}
    </ScoresContext.Provider>
  );
};

export const useScores = () => useContext(ScoresContext);

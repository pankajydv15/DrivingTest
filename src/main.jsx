import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ScoresProvider } from './ScoresContext';  // Import ScoresProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScoresProvider>  {/* Wrap App with ScoresProvider */}
      <App />
    </ScoresProvider>
  </StrictMode>
);

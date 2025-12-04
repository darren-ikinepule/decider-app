import React, { useState } from 'react';

// Define the complete list of food and restaurant options
const FOOD_OPTIONS = [
  'Pizza (Any)', 'Burger King', 'McDonald\'s', 'KFC', 'Starbucks',
  'Dunkin\' Donuts', 'Taco Bell', 'Subway', 'Chipotle', 'In-N-Out Burger',
  'Chinese Takeout', 'Vietnamese Pho', 'Italian Pasta', 'Thai Curry',
  'Japanese Sushi', 'Indian Cuisine', 'Mexican Tacos', 'Greek Gyros',
  'Korean BBQ', 'Mediterranean Food', 'Fried Chicken', 'Steakhouse',
  'Seafood Grill', 'BBQ Ribs', 'Sandwiches/Deli', 'Soup & Salad',
  'Breakfast for Dinner', 'Home Cooking - Comfort', 'Waffles/Pancakes',
  'Local Diner', 'Something Healthy', 'Something Spicy', 'A New Place'
];

// The main application component
const Decider = () => {
  // State to hold the chosen decision
  const [decision, setDecision] = useState(null);
  // State to manage the loading/deciding animation
  const [isDeciding, setIsDeciding] = useState(false);
  
  // State now initializes with an EMPTY array. Users must explicitly select options.
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to toggle the selection state of a food item
  const toggleSelection = (option) => {
    if (isDeciding) return;
    
    setDecision(null); // Clear previous decision

    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(option)) {
        // If already selected, remove it (effectively excluding it again)
        return prevSelected.filter(item => item !== option);
      } else {
        // If not selected, ADD it (explicitly including it)
        return [...prevSelected, option];
      }
    });
  };

  // Function to make the random decision from the selected list
  const makeDecision = () => {
    if (isDeciding || selectedOptions.length === 0) return; // Prevent clicks if no options or already deciding

    setDecision(null);
    setIsDeciding(true);

    // Simulate a deciding process with a short delay (e.g., 2 seconds)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * selectedOptions.length);
      const chosenOption = selectedOptions[randomIndex];

      setDecision(chosenOption);
      setIsDeciding(false);
    }, 2000);
  };

  // Helper function to render content in the result box
  const renderResultContent = () => {
    if (isDeciding) {
      return (
        <>
          {/* Using a simple spin icon for the deciding state */}
          <div className="spinner">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          </div>
          <p className="result-placeholder" style={{ marginTop: '10px' }}>Analyzing your culinary mood...</p>
        </>
      );
    }

    if (selectedOptions.length === 0) {
        return <p className="result-placeholder error-text">Please select at least one option before deciding.</p>;
    }

    if (decision) {
      return <p className="result-text">{decision}</p>;
    }

    // Updated placeholder text to reflect the new selection process
    return <p className="result-placeholder">Select the options you are open to, then click 'Decide for Me!'</p>;
  };

  const isButtonDisabled = isDeciding || selectedOptions.length === 0;

  return (
    <div className="decider-container">
      <header className="header">
        <h1 className="header-title">We need fuel! What's the mission menu?</h1>
        {/* Updated instruction text */}
        <p>Click on the options below to include them in the pool of possibilities.</p>
      </header>

      {/* Grid of Food Options */}
      <div className="options-grid">
        {FOOD_OPTIONS.map((option, index) => (
          <div 
            key={index} 
            // The class names still work to show the state (selected/deselected)
            className={`option-card ${selectedOptions.includes(option) ? 'selected' : 'deselected'}`}
            onClick={() => toggleSelection(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* Decision Button */}
      <button 
        className="main-button" 
        onClick={makeDecision}
        disabled={isButtonDisabled}
      >
        {isDeciding 
          ? 'Deciding...' 
          : selectedOptions.length === 0 
            ? 'Select Options First'
            : `Decide from ${selectedOptions.length} Option${selectedOptions.length !== 1 ? 's' : ''}`
        }
      </button>

      {/* Result Display Box */}
      <div className="result-box">
        {renderResultContent()}
      </div>
    </div>
  );
};

export default Decider;


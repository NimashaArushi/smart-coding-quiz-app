import { useState } from 'react';

const quizeQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a primitive data type in java",
    options: ["int", "double", "boolean", "String"],
    correctAnswer: "String"
  },
  {
    id: 2,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<css>", "<style>", "<link>"],
    correctAnswer: "<style>"
  },
  {
    id: 3,
    question: "In React, which hook is used to manage local state in a component?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: "useState"
  },
  {
    id: 5,
    question: "Which CSS property is used to change the background color?",
    options: ["color", "background-color", "bg-color", "bgcolor"],
    correctAnswer: "background-color"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [skippedQuestions, setSkippedQuestions] = useState([]); // Variable name එක නිවැරදි කළා
  const [isReviewingSkips, setIsReviewingSkips] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === null) {
      if (!skippedQuestions.includes(currentQuestion)) {
        setSkippedQuestions([...skippedQuestions, currentQuestion]);
      }
    }

    if (!isReviewingSkips) {
      if (currentQuestion < quizeQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const finalSkips = selectedOption === null && !skippedQuestions.includes(currentQuestion)
          ? [...skippedQuestions, currentQuestion]
          : skippedQuestions;

        if (finalSkips.length > 0) {
          alert("Quiz is over! Now let's see what you skipped.");
          setIsReviewingSkips(true);
          setCurrentQuestion(finalSkips[0]);
          setSelectedOption(null);
        } else {
          alert("Quiz successfully finished! 🎉");
        }
      }
    } else {
      const currentSkipIndex = skippedQuestions.indexOf(currentQuestion);
      
      if (currentSkipIndex < skippedQuestions.length - 1) {
        setCurrentQuestion(skippedQuestions[currentSkipIndex + 1]);
        setSelectedOption(null);
      } else {
        alert("All skipped questions done! 🎉");
      }
    }
  };

  const handlebackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div style={{
        padding: '20px',
        fontFamily: 'Arial',
        textAlign: 'center',
    }}>
      <h1>Smart Coding Quiz App 🧠</h1>
      
      {/* Quiz Card */}
      <div style={{ 
            margin: '20px auto', 
            padding: '20px', 
            maxWidth: '500px',
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>

        <h3>
          {isReviewingSkips 
            ? `Reviewing Skipped Question (ID: ${quizeQuestions[currentQuestion].id})` 
            : `Question ${currentQuestion + 1} of ${quizeQuestions.length}`}
        </h3>

        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}>
          {quizeQuestions[currentQuestion].question}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {quizeQuestions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedOption === option;

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)} 
                style={{ 
                  padding: '12px', 
                  fontSize: '16px',
                  cursor: 'pointer', 
                  borderRadius: '5px', 
                  border: '1px solid #23a6d5', 
                  background: isSelected ? '#018b2f' : '#fff', 
                  color: isSelected ? '#fff' : '#000',
                  transition: '0.2s' 
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* 🎛️ බටන් දෙක තැඹිලි පාට වෙලාවේ මිරිකෙන්නේ නැති වෙන්න Flex Row එකක් හැදුවා */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '20px' }}>
          
          <button
            onClick={handlebackClick}
            disabled={currentQuestion === 0 || isReviewingSkips} // Skip Review එකේදී Back යන්න ඕන නැති නිසා disable කළා
            style={{
              flex: 1,
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: (currentQuestion === 0 || isReviewingSkips) ? '#e0e0e0' : '#cccccc',
              color: (currentQuestion === 0 || isReviewingSkips) ? '#a0a0a0' : '#202020',
              border: 'none',
              borderRadius: '5px',
              cursor: (currentQuestion === 0 || isReviewingSkips) ? 'not-allowed' : 'pointer'
            }}
          >
            ⬅️ Back Question
          </button>

          <button
            onClick={handleNextClick}
            style={{
              flex: 1,
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: selectedOption === null ? '#f39c12' : '#23a6d5', 
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {selectedOption === null ? 'Skip ➡️' : 'Next Question ➡️'}
          </button>

        </div>

      </div>
    </div>
  ); 
}

export default App;
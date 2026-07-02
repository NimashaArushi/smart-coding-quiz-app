import { useState ,useEffect} from 'react';

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
  const [skippedQuestions, setSkippedQuestions] = useState([]); 
  const [isReviewingSkips, setIsReviewingSkips] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false); 

  const [timeLeft, setTimeLeft] = useState(15);
  const [userAnswers, setUserAnswers] = useState({});

  
  useEffect(() => { 
    if (isQuizFinished) return; 

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextClick();
          return 15;
        }
        return prevTime - 1;
      }); 
    }, 1000);

    return () => clearInterval(timer); 
  }, [currentQuestion, selectedOption, isReviewingSkips, isQuizFinished]);


  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });
    if (option === quizeQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setTimeLeft(15);
    if (selectedOption === null) {
      if (!skippedQuestions.includes(currentQuestion)) {
        setSkippedQuestions([...skippedQuestions, currentQuestion]);
      }
      setUserAnswers((prev) => ({ ...prev, [currentQuestion]: "skipped/Timeout" }));
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
          setIsQuizFinished(true);
        }
      }
    } else {
      const currentSkipIndex = skippedQuestions.indexOf(currentQuestion);
      
      if (currentSkipIndex < skippedQuestions.length - 1) {
        setCurrentQuestion(skippedQuestions[currentSkipIndex + 1]);
        setSelectedOption(null);
      } else {
        setIsQuizFinished(true);
      }
    }
  };

  const handlebackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1] || null);
      setTimeLeft(15);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSkippedQuestions([]);
    setIsReviewingSkips(false);
    setScore(0);
    setIsQuizFinished(false);
    setTimeLeft(15);
    setUserAnswers({});
  };

  return (
    <div style={{
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #012b27 0%, #9b14df 100%)', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        textAlign: 'center',
        boxSizing: 'border-box'
    }}>
      <h1>Smart Coding Quiz App 🧠</h1>
      
      {isQuizFinished ? (
        
       
        <div style={{ margin: '20px auto', maxWidth: '600px' }}>
          <div style={{ 
              padding: '30px', 
              border: '2px solid #018b2f', 
              borderRadius: '10px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              backgroundColor: '#014706',
              marginBottom: '20px'
          }}>
            <h2>Quiz Completed! 🎉</h2>
            <p style={{ fontSize: '20px', margin: '20px 0' }}>
              Your Score: <strong>{score}</strong> / {quizeQuestions.length}
            </p>
            
            <button onClick={handleRestartQuiz} style={{
                padding: '12px 25px', fontSize: '16px', fontWeight: 'bold',
                backgroundColor: '#23a6d5', color: 'white', border: 'none',
                borderRadius: '5px', cursor: 'pointer'
            }}>
              Restart Quiz 🔄
            </button>
          </div>

          <div style={{ 
              padding: '20px', backgroundColor: '#fff', color: '#333', 
              borderRadius: '10px', textAlign: 'left', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' 
          }}>
            <h3 style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Review Your Mistakes ❌</h3>
            
            {quizeQuestions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correctAnswer;
              
              
              if (isCorrect) return null; 

              return (
                <div key={q.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <p style={{ fontWeight: 'bold', margin: '5px 0' }}>{idx + 1}. {q.question}</p>
                  <p style={{ margin: '3px 0', color: '#d9534f' }}>
                    <strong>Your Answer:</strong> {uAns || "No Answer (Timeout/Skipped)"} ❌
                  </p>
                  <p style={{ margin: '3px 0', color: '#018b2f' }}>
                    <strong>Correct Answer:</strong> {q.correctAnswer}
                  </p>
                </div>
              );
            })}

         
            {Object.keys(userAnswers).length > 0 && 
             quizeQuestions.every((q, idx) => userAnswers[idx] === q.correctAnswer) && (
              <p style={{ textAlign: 'center', color: '#018b2f', fontWeight: 'bold', margin: '15px 0' }}>
                Wow! No mistakes. You got everything right! 🎯🔥
              </p>
            )}
          </div>
        </div>

      ) : (

        /*  QUIZ CARD */
        <div style={{ 
              margin: '20px auto', padding: '20px', maxWidth: '500px',
              border: '1px solid #ccc', borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff', color: '#333'
          }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>
              {isReviewingSkips ? `Reviewing Skips 🔄` : `Question ${currentQuestion + 1} of ${quizeQuestions.length}`}
            </h3>
            <span style={{ 
                padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold',
                backgroundColor: timeLeft <= 5 ? '#ff4d4d' : '#f39c12', color: 'white' 
            }}>
              ⏱️ {timeLeft}s
            </span>
          </div>

          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}>
            {quizeQuestions[currentQuestion].question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quizeQuestions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOption === option;
              return (
                <button key={index} onClick={() => handleAnswerClick(option)} style={{ 
                    padding: '12px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', 
                    border: '1px solid #23a6d5', background: isSelected ? '#018b2f' : '#fff', 
                    color: isSelected ? '#fff' : '#000', transition: '0.2s' 
                  }}>
                  {option}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '20px' }}>
            <button onClick={handlebackClick} disabled={currentQuestion === 0 || isReviewingSkips} style={{
                flex: 1, padding: '10px 20px', fontSize: '16px',
                backgroundColor: (currentQuestion === 0 || isReviewingSkips) ? '#e0e0e0' : '#cccccc',
                color: (currentQuestion === 0 || isReviewingSkips) ? '#a0a0a0' : '#202020',
                border: 'none', borderRadius: '5px', cursor: (currentQuestion === 0 || isReviewingSkips) ? 'not-allowed' : 'pointer'
              }}>
              ⬅️ Back
            </button>

            <button onClick={handleNextClick} style={{
                flex: 1, padding: '10px 20px', fontSize: '16px',
                backgroundColor: selectedOption === null ? '#f39c12' : '#23a6d5', 
                color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}>
              {selectedOption === null ? 'Skip ➡️' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
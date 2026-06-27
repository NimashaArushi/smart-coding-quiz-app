import{useState}from 'react';


const quizeQuestions=[{
    id:1,
    question:"Which of the following is NOT a primitive data type in java",
    options:[
        "int", "double", "boolean", "String"],
        correctAnser:"String"
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

function App(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const[selectedOption,setSelectedOption]=useState(null);

    const handleAnswerClick=(option)=>{
      setSelectedOption(option);
    }

const handleNextClick=()=>{
  setCurrentQuestion(currentQuestion+1);
  setSelectedOption(null);
}

const handlebackClick=()=>{
  setCurrentQuestion(currentQuestion-1);
  setSelectedOption(null);
}


    
    return (
        //heading
        <div style={{
            padding:'20px',
            fontFamily:'Arial',
            textAlign:'center',
        }}>
      <h1>Smart Coding Quiz App 🧠</h1>     {/*heading*/ }
      {/* Quiz Card */}
      <div style={{                         
                margin:'20px auto',
                 margin: '20px auto', padding: '20px', 
                 maxWidth: '500px',
                border: '1px solid #ccc', 
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
    
    <h3>Question {currentQuestion + 1} of {quizeQuestions.length}</h3>
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
                                   transition: '0.2s' 
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
<button
onClick={handleNextClick}
style={{
  marginTop:'20px',
  padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#23a6d5',
   color: 'white',
    border: 'none',
    borderRadius: '5px',
   cursor: 'pointer' 
}}>
  Next Question ➡️
</button>


<button
onClick={handlebackClick}
style={{
  marginTop:'20px',
  padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#c51205',
   color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginLeft:'10px',
   cursor: 'pointer' 
}}>
  Back Question ⬅️
</button>

      </div>
    </div>
  ); 
}
export default App;
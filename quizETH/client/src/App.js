import React, { useState, useEffect } from "react";
import QuizCertificate from "./contracts/QuizCertificate.json";
import getWeb3 from "./getWeb3";
// import BlockchainContext from './BlockchainContext.js';
import {questions} from "./quizQuestions";
import {etherImage} from "./Globals";

import "./App.css";
// import ChildComponent from "./ChildComponent";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  
  const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
  };
  
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [ropsten, setRopsten] = useState(false)
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        if (networkId === 3) {
          setRopsten(true)
        }

        const contract = new web3.eth.Contract(
          QuizCertificate.abi,
          3 && "0x37e5087F52A1a09F445B4B9965F1454EcE7C3E6e",
        );
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, [ropsten]);

  const getGradient = async () => {

    // const getGradient2 = await contract.methods.getGradient({_gradientId: 0}).call();
    // const getGradient2 = await contract.methods.owner().call();

    if (typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof contract !== 'undefined') {
      // getGradeintContractCall();
      // const getGradient2 = await contract.methods.owner().call();
      const test = await contract.methods.mintCertificate("555", "666").send({from: accounts[0]});
      // const getGradient2 = await contract.methods.getGradient(2).call();
      // const mintCertificate = await contract.methods.getGradient(2).call();
      console.log(test);

    }
    
  }

  useEffect(() => {
    const load = async () => {
    }
    if(typeof web3 !== 'undefined' 
       && typeof accounts !== 'undefined'
       && typeof contract !== 'undefined') {
      load();
    }
  }, [web3, accounts, contract, showScore]);

  // if(typeof web3 === 'undefined') {
  //   return <div>Loading Web3, accounts, and contract...</div>;
  // }

  const tryAgainButton = (
     <div style={{marginTop: 16}}>
      <button id="button" onClick={() => {
        setCurrentQuestion(0)
        setShowScore(false)
      }}>Try again</button>
      </div>
  )

  const mintButton = (
    <div style={{ marginTop: 16 }}>
      <p>You can now mint a QUIZ NFT certificate to show you are awesome</p>
      <p>*** Ropsten Network ***</p>
      <button id="button" onClick={() => getGradient()}>Mint</button>
      </div>
  )

  return (
    <div className="App">
      {showScore ? (
        <div className="question-section">
            <img src={etherImage} className="etherImg"/>
            You scored {score} out of {questions.length}
            { score / questions.length === 1 ? mintButton : tryAgainButton }
          </div>
        ) : (
          <div className="quiz-container">
            <div className="question-section">
              <img src={etherImage} className="etherImg"/>
              <div className="quiz-heading">
                History of ETH 💎 <br/>
              </div>
              <div className='quiz-text'>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className='quiz-text'>{questions[currentQuestion].questionText}</div>
              <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button id="button" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
              ))}
            </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
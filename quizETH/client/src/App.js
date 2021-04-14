import React, { useState, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
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
  

  const [storageValue, setStorageValue] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);


  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        // const web3 = await getWeb3();

        // // Use web3 to get the user's accounts.
        // const accounts = await web3.eth.getAccounts();

        // // Get the contract instance.
        // const networkId = await web3.eth.net.getId();
        // const deployedNetwork = SimpleStorageContract.networks[networkId];
        // const contract = new web3.eth.Contract(
        //   SimpleStorageContract.abi,
        //   deployedNetwork && deployedNetwork.address,
        // );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // setWeb3(web3);
        // setAccounts(accounts);
        // setContract(contract);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  // useEffect(() => {
  //   const load = async () => {
  //     // Stores a given value, 5 by default.
  //     await contract.methods.set(5).send({ from: accounts[0] });

  //     // Get the value from the contract to prove it worked.
  //     const response = await contract.methods.get().call();

  //     // Update state with the result.
  //     setStorageValue(response);
  //   }
  //   if(typeof web3 !== 'undefined' 
  //      && typeof accounts !== 'undefined'
  //      && typeof contract !== 'undefined') {
  //     load();
  //   }
  // }, [web3, accounts, contract]);

  // if(typeof web3 === 'undefined') {
  //   return <div>Loading Web3, accounts, and contract...</div>;
  // }

  const tryAgainButton = (
     <div style={{marginTop: 16}}>
        <button id="button">Try again</button>
      </div>
  )

  const mintButton = (
    <div style={{marginTop: 16}}>
        <button id="button">Mint</button>
      </div>
  )

  return (
    <div className="App">
      {showScore ? (
          <div className="question-section">
            You scored {score} out of {questions.length}
            { score / questions.length === 1 ? mintButton : tryAgainButton }
          </div>
        ) : (
          <div className="quiz-container">
            <div className="question-section">
              <img src={etherImage} className="etherImg"/>
              <div className="quiz-heading">
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
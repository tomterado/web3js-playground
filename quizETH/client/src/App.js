import React, { useState, useEffect } from "react";
import QuizCertificate from "./contracts/QuizCertificate.json";
import getWeb3 from "./getWeb3";
import {questions} from "./quizQuestions";
import {etherImage, tryAgainButton} from "./Globals";

import "./App.css";

function App() {
  // Quiz States
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loadingTx, setLoadingTx] = useState(false);
  const [successTx, setSuccessTx] = useState("");

  // Web3 States
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [ropsten, setRopsten] = useState(false)
  const [contract, setContract] = useState([]);

  // Init Web3
  useEffect(() => {
    //Init Web3 Instances
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
        // console.error(error);
      }
    }
    init();
  }, [ropsten]);

  useEffect(() => {
  }, [web3, accounts, contract, showScore, loadingTx, successTx]);

  const mintCertificate = async () => {
    const txUrl = successTx ? "https://ropsten.etherscan.io/tx/" + successTx : null;

    if (successTx) {
      window.open(txUrl, "_blank");
      return;
    }
    
    setLoadingTx(true)

    if (typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof contract !== 'undefined') {
      await contract.methods.mintCertificate("555", "666").send({ from: accounts[0] }).then((res) => {
        if (res) {
          setLoadingTx(false)
          setSuccessTx(res.transactionHash)
        }
      }).catch(() => {
        setLoadingTx(false)
        alert("Sorry something went wrong");
      })
    }
  }

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
      
  const mintButton = () => {
    return (
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <p>You can now mint a QUIZ NFT certificate to show you are awesome</p>
          <p>*** Tx may take 10-15sec <br/> Why not stretch? It's been a long day 🧘‍♂️ ***</p>
          <button id="button" onClick={() => mintCertificate()}>
            {score / questions.length === 1 & loadingTx && !successTx ? <div className="loadingspinner"></div> : <span>{successTx ? "View NFT" : "Mint"}</span>}
          </button>
        </div>
    )
  }

  const completedQuiz = (
    <div className="question-section">
      <img src={etherImage} className="etherImg"/>
        You scored {score} out of {questions.length}
      <div>
        { score / questions.length === 1  ? mintButton() : tryAgainButton(setCurrentQuestion, setShowScore) }
      </div>
    </div>
  )

  return (
    <div className="App">
      {showScore ? completedQuiz : (
          <div className="quiz-container">
            <div className="question-section">
              <img src={etherImage} className="etherImg"/>
              <div className="quiz-heading">
                History of ETH 💎 <br/>
              </div>
              <div className='quiz-text'>
                <span>**Ropsten Network**<br/></span>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className='quiz-text'>{questions[currentQuestion].questionText}</div>
              <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button id="button" onClick={() =>handleAnswerOptionClick(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
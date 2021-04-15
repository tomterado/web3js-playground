import React from "react";
// export const etherImage = "https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/31987/eth-diamond-rainbow.png"
export const etherImage = "https://ethereum.org/static/4d030a46f561e5c754cabfc1a97528ff/8f8aa/impact_transparent.png"

export const tryAgainButton = (setCurrentQuestion, setShowScore ) => {
    return (
    <div style={{marginTop: 16}}>
        <button id="button" onClick={() => {
                setCurrentQuestion(0);
                setShowScore(false);
            }}> Try again
        </button>
    </div>
  ) 
}
  


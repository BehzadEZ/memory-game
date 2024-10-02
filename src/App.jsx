import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import YouWinPage from "./components/YouWinPage";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [bestTurns, setBestTurns] = useState(0);

  const allMatched = cards.every((card) => card.matched);

  useEffect(() => {
    // بارگذاری رکوردهای قبلی از Local Storage
    const storedBestTime = localStorage.getItem("bestTime");
    const storedBestTurns = localStorage.getItem("bestTurns");

    if (storedBestTime) {
      setBestTime(parseInt(storedBestTime));
    }
    if (storedBestTurns) {
      setBestTurns(parseInt(storedBestTurns));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isGameActive && !allMatched) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isGameActive, allMatched]);

  useEffect(() => {
    if (allMatched) {
      setIsGameActive(false);
      // به‌روزرسانی رکوردها
      if (seconds < bestTime || bestTime === 0) {
        setBestTime(seconds);
        localStorage.setItem("bestTime", seconds);
      }
      if (turn < bestTurns || bestTurns === 0) {
        setBestTurns(turn);
        localStorage.setItem("bestTurns", turn);
      }
    }
  }, [allMatched]);

  const shuflleCard = () => {
    const shufllecard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCard(shufllecard);
    setTurn(0);
    setSeconds(0);
    setIsGameActive(true);
  };

  const handleChoise = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCard((prevcard) => {
          return prevcard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetValue();
      } else {
        setTimeout(() => resetValue(), 600);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetValue = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisable(false);
  };

  useEffect(() => {
    shuflleCard();
  }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuflleCard}>New Game</button>
      {allMatched ? (
        <YouWinPage turn={turn} seconds={seconds} bestTime={bestTime} bestTurns={bestTurns}/>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoise={handleChoise}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))}
        </div>
      )}
      <p className="timer">Time: {seconds} seconds</p>
      <p className="turns">Turns: {turn}</p>
      <p className="best-time">Best Time: {bestTime} seconds</p>
      <p className="best-turns">Best Turns: {bestTurns}</p>
      <div className="copyright">
        <a href="https://github.com/BehzadEZ"> Copyright By BehzadEZ &copy; &#10084; </a>
      </div>
    </div>

    
  );
}

export default App;

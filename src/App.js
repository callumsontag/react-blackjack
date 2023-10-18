import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const BlackjackHeader = () => (
  <header className="Blackjack-header">
    <h1>Blackjack</h1>
    <h2>Welcome to the game of Blackjack! Gimme all your money.</h2>
  </header>
);

const shuffleCards = async () => {
  const response = await axios.get(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const deckId = response.data.deck_id;
  return { shuffled: true, remaining: 52, deckId: deckId };
};

const drawOneCard = (deckId) => {
  const p = axios(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  ).then((response) => response.data.cards[0]);
  return p;
};

function App() {
  const [deckId, setDeckId] = useState();
  const [playerFirstCard, setPlayerFirstCard] = useState();

  const handleStart = async () => {
    const response = await shuffleCards();
    setDeckId(response.deckId);
  };

  const handleDrawCard = async () => {
    const card = await drawOneCard(deckId);
    setPlayerFirstCard(card);
  };

  return (
    <div className="Blackjack-app">
      <BlackjackHeader />
      <main>
        {!deckId && <button onClick={handleStart}>Start Game</button>}
        <div>DeckId: {deckId}</div>
        {deckId && <button onClick={handleDrawCard}>Draw one card</button>}
        <h2>Dealer's Cards</h2>
        <div>DEALERS CARDS GO HERE</div>
        <p>Dealer's Current Score: 0</p>
        <h2>Player's Cards</h2>
        {playerFirstCard && (
          <img src={playerFirstCard.image} alt={playerFirstCard.value}></img>
        )}
        {playerFirstCard && (
          <p>Player's Current Score: {Number(playerFirstCard.value)}</p>
        )}
      </main>
    </div>
  );
}

export default App;

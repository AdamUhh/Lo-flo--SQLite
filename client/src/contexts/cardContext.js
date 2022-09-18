import React, { useState, useContext, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { getCards } from "../services/cards";
const Context = React.createContext();

export function useCardsContext() {
  return useContext(Context);
}

export function CardProvider({ children }) {
  const [cardData, setCardData] = useState();
  const { loading, error, value: cards } = useAsync(getCards);
  useEffect(() => {
    if (cards == null) return;
    setCardData(cards);
  }, [cards]);

  function createLocalCard(card) {
    setCardData((prevCards) => [...prevCards, card]);
  }

  function updateLocalCard(id, result) {
    setCardData((prevCards) =>
      prevCards.map((crd) => {
        if (crd.id === id) return result;
        else return crd;
      })
    );
  }

  function deleteLocalCard(id) {
    setCardData((prevCards) => prevCards.filter((card) => card.id !== id));
  }

  return (
    <Context.Provider
      value={{
        loading,
        error,
        cardData,
        createLocalCard,
        updateLocalCard,
        deleteLocalCard,
      }}
    >
      {children}
    </Context.Provider>
  );
}

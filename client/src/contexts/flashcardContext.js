import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { getFlashCards } from "../services/flashCards";
import { usePanel } from "./panelContext";
import { useUrl } from "./urlContext";
const Context = React.createContext();

export function useFlashCardsContext() {
  return useContext(Context);
}

export function FlashCardProvider({ children }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const [flashCardData, setFlashCardData] = useState([]);
  const { goToIndex, searchQueryId, setSearchQueryId } = usePanel();
  const {
    loading,
    error,
    value: flashCards,
  } = useAsync(
    () => getFlashCards({ cardId: cardIdParam, subjectId: subjectIdParam }),
    [cardIdParam, subjectIdParam]
  );

  useEffect(() => {
    if (flashCards == null) return;

    // ? if user switches subjects and the subject has atleast one flashcard
    // ? set index to 0
    if (flashCards?.flashCards.length - 1 > -1) {
      goToIndex(0, flashCards?.flashCards[0].id);
    }

    setFlashCardData(flashCards);
  }, [flashCards]);

  useEffect(() => {
    if (flashCards == null) return;

    // ? edge case used only when user is searching for a specific flashcard
    // ? currentIndex becomes an array
    if (searchQueryId.length > 0) {
      const newIndex = flashCards?.flashCards?.findIndex((fc) => fc.id === searchQueryId);
      goToIndex(newIndex, searchQueryId);
      setSearchQueryId("");
    }
  }, [flashCards, searchQueryId]);

  function createLocalFlashCard(result) {
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: [...prevFlashCards.flashCards, result],
    }));

    const maxLength = flashCardData?.flashCards.length - 1;

    if (maxLength === -1) goToIndex(0, result.id);
    else goToIndex(maxLength + 1, result.id);
  }

  function updateLocalFlashCard(id, result) {
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: prevFlashCards.flashCards.map((fc) => {
        if (fc.id === id) return result;
        else return fc;
      }),
    }));
  }

  function deleteLocalFlashCard(id, deletedIndex) {
    setFlashCardData((prevFlashCards) => ({
      ...prevFlashCards,
      flashCards: prevFlashCards.flashCards.filter((fc) => fc.id !== id),
    }));

    // ? note: flashCardData is still using old array data, not the deleted one
    // ? if user deleted the last item in old array
    if (flashCardData.flashCards.length - 1 === 0) goToIndex(-1, "");
    else {
      // ? if user deleted first element in old array
      if (deletedIndex === 0) {
        goToIndex(0, flashCardData.flashCards[1].id);
      } else {
        // ? if user deleted either last item or item inbetween first and last in old array
        goToIndex(deletedIndex - 1, flashCardData.flashCards[deletedIndex - 1].id);
      }
    }
  }

  return (
    <Context.Provider
      value={{
        loading,
        error,
        flashCardData,
        createLocalFlashCard,
        updateLocalFlashCard,
        deleteLocalFlashCard,
      }}
    >
      {children}
    </Context.Provider>
  );
}

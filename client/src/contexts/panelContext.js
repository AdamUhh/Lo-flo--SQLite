import React, { useContext, useState } from "react";
import { useUrl } from "./urlContext";
const Context = React.createContext();

export function usePanel() {
  return useContext(Context);
}

export function PanelProvider({ children }) {
  const { handleFlashCardIdParam } = useUrl();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQueryId, setSearchQueryId] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const handleShowSolution = (bool) => {
    if (bool !== undefined) setShowSolution(false);
    else setShowSolution((prev) => !prev);
  };

  const goToNext = (data) => {
    const isLastSlide = currentIndex === data?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    goToIndex(newIndex, data[newIndex].id);
  };
  const goToPrevious = (data) => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data?.length - 1 : currentIndex - 1;
    goToIndex(newIndex, data[newIndex].id);
  };

  const goToIndex = (indx = 0, flashCardId = "") => {
    handleFlashCardIdParam(flashCardId);
    setCurrentIndex(indx);
  };

  const goToSearchIndex = (flashCardId) => {
    setSearchQueryId(flashCardId);
  };

  const maxLength = (data) => {
    return data?.length || 0;
  };

  return (
    <Context.Provider
      value={{
        searchQueryId,
        setSearchQueryId,
        currentIndex,
        goToNext,
        goToPrevious,
        goToIndex,
        goToSearchIndex,
        maxLength,
        showSolution,
        handleShowSolution,
      }}
    >
      {children}
    </Context.Provider>
  );
}

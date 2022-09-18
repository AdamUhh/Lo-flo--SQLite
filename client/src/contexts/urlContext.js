import React, { useState, useContext, useEffect } from "react";
const Context = React.createContext();

export function useUrl() {
  return useContext(Context);
}

export const UrlProvider = ({ children }) => {
  const [cardIdParam, setCardIdParam] = useState("");
  const [subjectIdParam, setSubjectIdParam] = useState("");
  const [flashCardIdParam, setFlashCardIdParam] = useState("");

  const handleCardIdParam = (id = "") => {
    setCardIdParam(id);
  };
  const handleSubjectIdParam = (id = "") => {
    setSubjectIdParam(id);
  };
  const handleFlashCardIdParam = (id = "") => {
    setFlashCardIdParam(id);
  };

  const handleDeleteCardIdParam = () => {
    setCardIdParam("");
    setSubjectIdParam("");
    setFlashCardIdParam("");
  };

  const handleDeleteSubjectIdParam = () => {
    setSubjectIdParam("");
    setFlashCardIdParam("");
  };

  return (
    <Context.Provider
      value={{
        cardIdParam,
        handleCardIdParam,
        subjectIdParam,
        handleSubjectIdParam,
        flashCardIdParam,
        handleFlashCardIdParam,
        handleDeleteCardIdParam,
        handleDeleteSubjectIdParam,
      }}
    >
      {children}
    </Context.Provider>
  );
};

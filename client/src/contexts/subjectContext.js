import React, { useContext, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { getSubjects } from "../services/subjects";
import { useUrl } from "./urlContext";
const Context = React.createContext();

export function useSubjectsContext() {
  return useContext(Context);
}

export function SubjectProvider({ children }) {
  const { cardIdParam } = useUrl();
  const [subjectData, setSubjectData] = useState();
  const {
    loading,
    error,
    value: subjects,
  } = useAsync(() => getSubjects({ cardId: cardIdParam }), [cardIdParam]);

  useEffect(() => {
    if (subjects == null) return;
    setSubjectData(subjects);
  }, [subjects]);

  function createLocalSubject(subject) {
    setSubjectData((prevSubjects) => ({
      ...prevSubjects,
      subjects: [...prevSubjects.subjects, subject],
    }));
  }

  function updateLocalSubject(id, result) {
    setSubjectData((prevSubjects) => ({
      ...prevSubjects,
      subjects: prevSubjects.subjects.map((subj) => {
        if (subj.id === id) return result;
        else return subj;
      }),
    }));
  }

  function deleteLocalSubject(id) {
    setSubjectData((prevSubjects) => ({
      ...prevSubjects,
      subjects: prevSubjects.subjects.filter((subject) => subject.id !== id),
    }));
  }

  return (
    <Context.Provider
      value={{
        loading,
        error,
        subjectData,
        createLocalSubject,
        deleteLocalSubject,
        updateLocalSubject,
      }}
    >
      {children}
    </Context.Provider>
  );
}

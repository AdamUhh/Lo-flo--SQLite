import { useState } from "react";
import { usePanel } from "../../../contexts/panelContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { searchCards } from "../../../services/cards";
import LoadingIcon from "../../svg/LoadingIcon";
import Flashcards from "./Flashcards";
import styles from "../../../styles/Search.module.scss";

const CheckBox = ({ label, value, onChange, disable }) => {
  return (
    <label className={disable ? styles.crossout : ""}>
      <input className={styles.checkbox} type="checkbox" checked={value} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
};

export default function SearchModal({ handleModalOpen }) {
  const [searchInput, setSearchInput] = useState("");

  const { handleCardIdParam, handleSubjectIdParam, handleFlashCardIdParam, handleDeleteSubjectIdParam } =
    useUrl();
  const { goToIndex, goToSearchIndex, handleShowSolution } = usePanel();
  const { loading, error, execute: searchCardsFn } = useAsyncFn(searchCards);
  const [filters, setFilters] = useState({
    Card: true,
    Subject: true,
    FlashCard: true,
    Solution: false,
  });
  const [result, setResult] = useState();

  function handleSearch(e) {
    e.preventDefault();
    searchCardsFn({ searchInput, ...filters }).then(setResult);

    setSearchInput("");
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  const handleChange = (e) => {
    const handle = e.target.labels[0].childNodes[1].innerText;
    switch (handle) {
      case "Subject":
        setFilters((prevState) => ({ ...prevState, Subject: !prevState.Subject, FlashCard: false }));
        break;
      case "FlashCard":
        if (!filters.Subject)
          setFilters((prevState) => ({ ...prevState, Subject: true, FlashCard: !prevState.FlashCard }));
        else setFilters((prevState) => ({ ...prevState, FlashCard: !prevState.FlashCard }));
        break;
      case "Solution":
        if (filters.FlashCard) setFilters((prevState) => ({ ...prevState, Solution: !prevState.Solution }));
        break;
      default:
        break;
    }
  };
  function handleCard(cardId) {
    handleCardIdParam(cardId);
    handleDeleteSubjectIdParam();
    handleShowSolution(false);
    goToIndex();
    handleModalOpen();
  }
  function handleSubject(e, cardId, subjectId) {
    e.stopPropagation();

    handleCardIdParam(cardId);
    handleSubjectIdParam(subjectId);
    handleFlashCardIdParam();
    handleShowSolution(false);
    goToIndex();
    handleModalOpen();
  }
  function handleFlashCard(e, cardId, subjectId, flashCardId) {
    e.stopPropagation();

    handleCardIdParam(cardId);
    handleSubjectIdParam(subjectId);
    handleShowSolution(false);
    goToSearchIndex(flashCardId);
    handleModalOpen();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <div className={styles.wrapper_flex}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            autoFocus
            placeholder="🔎 Search"
          />
          <button className="btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className={styles.checkbox_container}>
        {Object.keys(filters).map((cb) => (
          <CheckBox
            key={cb}
            label={cb}
            value={filters[cb]}
            onChange={handleChange}
            disable={(filters.FlashCard !== true && cb === "Solution") || cb === "Card"}
          />
        ))}
      </div>

      {error && <div className={styles.errormsg}>{error}</div>}
      {!error && result && result?.length < 1 && (
        <div className={styles.errormsg}>Search returned nothing!</div>
      )}
      <div className={styles.result_container}>
        {loading ? (
          <LoadingIcon />
        ) : (
          result?.map((r) => (
            <div key={r.id} className={styles.result_wrapper} onClick={() => handleCard(r.id)}>
              <div
                className={`${styles.result_title} ${
                  filters.Subject && r?.subjects?.length > 0 ? styles.underline : ""
                }`}
              >
                {r.title}
              </div>
              {filters.Subject && (
                <div
                  className={`${styles.result_subject_container} ${filters.FlashCard ? "" : styles.subjOnly}`}
                >
                  {r?.subjects?.map((rs) => (
                    <div key={rs.id} className={styles.result_subject_wrapper}>
                      <span
                        className={`${styles.result_subject_title} btn`}
                        onClick={(e) => handleSubject(e, r.id, rs.id)}
                      >
                        {rs.title}
                      </span>
                      {filters.FlashCard && (
                        <div className={styles.result_flashcard_wrapper}>
                          {rs?.flashCards?.map((rsf) => (
                            <Flashcards
                              key={rsf.id}
                              rsf={rsf}
                              handleFlashCard={(e) => handleFlashCard(e, r.id, rs.id, rsf.id)}
                              searchSolution={filters.Solution}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

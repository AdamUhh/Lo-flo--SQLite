import { useState } from "react";
import { useFlashCardsContext } from "../../../contexts/flashcardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createFlashCard } from "../../../services/flashCards";
import ModalTitlebar from "../ModalTitlebar";
import styles from "../../../styles/Modal.module.scss";
export default function AddFlashCardModal({ handleModalOpen, initialValue = "" }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const [question, setQuestion] = useState(initialValue);
  const [solution, setSolution] = useState(initialValue);

  const { loading, error, execute: createFlashCardFn } = useAsyncFn(createFlashCard);
  const { createLocalFlashCard } = useFlashCardsContext();

  function onFlashCardCreate(e) {
    e.preventDefault();

    return createFlashCardFn({
      cardId: cardIdParam,
      subjectId: subjectIdParam,
      question,
      solution,
    }).then((result) => {
      createLocalFlashCard(result);
      handleModalOpen();
    });
  }

  return (
    <div className={`${styles.wrapper} ${styles.large}`}>
      <ModalTitlebar
        title={"FlashCard"}
        actionTitle={"Create"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onFlashCardCreate}
      />

      <div className={styles.content_container}>
        <div className={styles.textarea_container}>
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            className={styles.textarea}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Your Question"
            autoFocus
          />
          <label htmlFor="solution">Solution</label>
          <textarea
            id="solution"
            className={styles.textarea}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Your Solution"
            type="text"
          />
          {error && error}
        </div>
      </div>
    </div>
  );
}

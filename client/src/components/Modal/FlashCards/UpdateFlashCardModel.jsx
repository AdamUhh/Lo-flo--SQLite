import { useState } from "react";
import { useFlashCardsContext } from "../../../contexts/flashcardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { updateFlashCard } from "../../../services/flashCards";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'
export default function UpdateFlashCardModel({
  handleModalOpen,
  initialQuestion = "",
  initialSolution = "",
}) {
  const { cardIdParam, subjectIdParam, flashCardIdParam } = useUrl();
  const [question, setQuestion] = useState(initialQuestion);
  const [solution, setSolution] = useState(initialSolution);

  const { loading, error, execute: updateFlashCardFn } = useAsyncFn(updateFlashCard);
  const { updateLocalFlashCard } = useFlashCardsContext();

  function onFlashCardUpdate(e) {
    e.preventDefault();
    return updateFlashCardFn({
      cardId: cardIdParam,
      subjectId: subjectIdParam,
      flashCardId: flashCardIdParam,
      question,
      solution,
    }).then((result) => {
      updateLocalFlashCard(flashCardIdParam, result);
      handleModalOpen();
    });
  }

  return (
    <div className={`${styles.wrapper} ${styles.large}`}>
      <ModalTitlebar
        title={"FlashCard"}
        actionTitle={"Update"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onFlashCardUpdate}
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

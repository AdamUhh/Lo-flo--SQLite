import { usePanel } from "../../../contexts/panelContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsync } from "../../../hooks/useAsync";
import { getFlashCards } from "../../../services/flashCards";
import styles from "../../../styles/Modal.module.scss";
import { ellipsis } from "../../../util";
import LoadingIcon from "../../svg/LoadingIcon";

export default function ShowAllFlashCardModal({ handleModalOpen }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const { goToIndex, handleShowSolution } = usePanel();

  const { loading, error, value } = useAsync(() =>
    getFlashCards({ cardId: cardIdParam, subjectId: subjectIdParam }, [cardIdParam, subjectIdParam])
  );

  function handleSelectedFlashCard(indx, flashCardId) {
    goToIndex(indx, flashCardId);
    handleShowSolution(false);
    handleModalOpen();
  }

  return (
    <div className={`${styles.wrapper} ${styles.large}`}>
      {loading && <LoadingIcon />}
      <div className={styles.titlebar_wrapper}>
        <button className={`${styles.btn} btn`} onClick={handleModalOpen}>
          Close
        </button>
        <div>All FlashCards</div>
      </div>
      <div className={styles.content_container}>
        <div className={styles.content_overflow_container}>
          {value?.flashCards?.map((fc, indx) => (
            <button
              className={`${styles.queue_item} btn`}
              key={fc.id}
              onClick={() => handleSelectedFlashCard(indx, fc.id)}
            >
              <div className={styles.queue_indx}>{indx + 1}</div>
              <div className={styles.queue_question}>{ellipsis(fc.question, 100)}</div>
            </button>
          ))}
        </div>
        {error && error}
      </div>
    </div>
  );
}

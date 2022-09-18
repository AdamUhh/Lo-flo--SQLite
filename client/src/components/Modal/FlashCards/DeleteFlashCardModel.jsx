import { useFlashCardsContext } from "../../../contexts/flashcardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteFlashCard } from "../../../services/flashCards";
import ModalTitlebar from "../ModalTitlebar";
import styles from "../../../styles/Modal.module.scss";

export default function DeleteFlashCardModal({
  handleModalOpen,
  title = "N/A",
  currentIndex,
}) {
  const { loading, error, execute: deleteFlashCardFn } = useAsyncFn(deleteFlashCard);
  const { deleteLocalFlashCard } = useFlashCardsContext();
  const { cardIdParam: cardId, subjectIdParam: subjectId, flashCardIdParam: flashCardId } = useUrl();

  function onFlashCardDelete(e) {
    e.preventDefault();
    return deleteFlashCardFn({ cardId, subjectId, flashCardId }).then((flashCard) => {
      deleteLocalFlashCard(flashCard.id, currentIndex);
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"FlashCard"}
        actionTitle={"Delete"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onFlashCardDelete}
      />

      <div className={styles.content_container}>
        <div className={styles.delete_title}>
          <div>Are you sure you wish to delete</div>
          <div className={styles.overflow_container}>{title}</div>
        </div>
        {error && error}
      </div>
    </div>
  );
}

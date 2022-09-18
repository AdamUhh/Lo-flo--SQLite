import { useCardsContext } from "../../../contexts/cardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteCard } from "../../../services/cards";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'

export default function DeleteCardModal({ handleModalOpen, title = "N/A" }) {
  const { loading, error, execute: deleteCardFn } = useAsyncFn(deleteCard);
  const { deleteLocalCard } = useCardsContext();
  const { cardIdParam: cardId, handleDeleteCardIdParam } = useUrl();

  function onCardDelete(e) {
    e.preventDefault();

    return deleteCardFn({ cardId }).then((card) => {
      deleteLocalCard(card.id);
      handleDeleteCardIdParam();
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Card"}
        actionTitle={"Delete"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onCardDelete}
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

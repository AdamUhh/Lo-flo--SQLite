import { useState } from "react";
import { useCardsContext } from "../../../contexts/cardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { updateCard } from "../../../services/cards";
import ContentInput from "../ContentInput";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'


export default function UpdateCardModal({ handleModalOpen, initialValue = "", reAssignTitle }) {
  const { cardIdParam } = useUrl();
  const [title, setTitle] = useState(initialValue);

  const { loading, error, execute: updateCardFn } = useAsyncFn(updateCard);
  const { updateLocalCard } = useCardsContext();

  function onCardUpdate(e) {
    e.preventDefault();

    return updateCardFn({
      cardId: cardIdParam,
      title,
    }).then((result) => {
      updateLocalCard(cardIdParam, result);
      reAssignTitle(result.title);
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Card"}
        actionTitle={"Update"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onCardUpdate}
      />
      <div className={styles.content_container}>
        Card name
        <ContentInput error={error} onSubmit={onCardUpdate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}

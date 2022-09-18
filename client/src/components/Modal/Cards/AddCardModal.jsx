import { useState } from "react";
import { useCardsContext } from "../../../contexts/cardContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createCard } from "../../../services/cards";
import ContentInput from "../ContentInput";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'

export default function AddCardModal({ handleModalOpen, initialValue = "" }) {
  const [title, setTitle] = useState(initialValue);

  const { loading, error, execute: createCardFn } = useAsyncFn(createCard);
  const { createLocalCard } = useCardsContext();
  const { handleCardIdParam } = useUrl();
  function onCardCreate(e) {
    e.preventDefault();

    if (loading) return;

    return createCardFn({ title }).then((result) => {
      createLocalCard(result);
      handleCardIdParam(result.id);
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Card"}
        actionTitle={"Create"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onCardCreate}
      />

      <div className={styles.content_container}>
        Card name
        <ContentInput error={error} onSubmit={onCardCreate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}

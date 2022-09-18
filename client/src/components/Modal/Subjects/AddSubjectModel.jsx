import { useState } from "react";
import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createSubject } from "../../../services/subjects";
import ContentInput from "../ContentInput";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'
export default function AddSubjectModal({ handleModalOpen }) {
  const { cardIdParam, handleSubjectIdParam } = useUrl();
  const [title, setTitle] = useState("");

  const { loading, error, execute: createSubjectFn } = useAsyncFn(createSubject);
  const { createLocalSubject } = useSubjectsContext();

  function onSubjectCreate(e) {
    e.preventDefault();

    if (loading) return;

    return createSubjectFn({ cardId: cardIdParam, title }).then((result) => {
      createLocalSubject(result);
      handleSubjectIdParam(result.id);
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Subject"}
        actionTitle={"Create"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onSubjectCreate}
      />

      <div className={styles.content_container}>
        Subject name
        <ContentInput error={error} onSubmit={onSubjectCreate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}

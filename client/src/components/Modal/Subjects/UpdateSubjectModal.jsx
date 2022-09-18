import { useState } from "react";
import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { updateSubject } from "../../../services/subjects";
import styles from "../../../styles/Modal.module.scss";
import ContentInput from "../ContentInput";
import ModalTitlebar from "../ModalTitlebar";
export default function UpdateSubjectModal({ handleModalOpen, initialValue = "", reAssignTitle }) {
  const { cardIdParam, subjectIdParam } = useUrl();
  const [title, setTitle] = useState(initialValue);

  const { loading, error, execute: updateSubjectFn } = useAsyncFn(updateSubject);
  const { updateLocalSubject } = useSubjectsContext();

  function onSubjectUpdate(e) {
    e.preventDefault();

    return updateSubjectFn({
      cardId: cardIdParam,
      subjectId: subjectIdParam,
      title,
    }).then((result) => {
      updateLocalSubject(subjectIdParam, result);
      reAssignTitle(result.title);
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Subject"}
        actionTitle={"Update"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onSubjectUpdate}
      />
      <div className={styles.content_container}>
        Subject name
        <ContentInput error={error} onSubmit={onSubjectUpdate} title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}

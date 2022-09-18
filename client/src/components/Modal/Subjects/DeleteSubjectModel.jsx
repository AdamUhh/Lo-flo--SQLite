import { useSubjectsContext } from "../../../contexts/subjectContext";
import { useUrl } from "../../../contexts/urlContext";
import { useAsyncFn } from "../../../hooks/useAsync";
import { deleteSubject } from "../../../services/subjects";
import ModalTitlebar from "../ModalTitlebar";
import styles from '../../../styles/Modal.module.scss'
export default function DeleteSubjectModal({ handleModalOpen, title = "N/A" }) {
  const { loading, error, execute: deleteSubjectFn } = useAsyncFn(deleteSubject);
  const { deleteLocalSubject } = useSubjectsContext();
  const { cardIdParam: cardId, subjectIdParam: subjectId, handleDeleteSubjectIdParam } = useUrl();

  function onSubjectDelete(e) {
    e.preventDefault();

    return deleteSubjectFn({ cardId, subjectId }).then((subject) => {
      deleteLocalSubject(subject.id);
      handleDeleteSubjectIdParam();
      handleModalOpen();
    });
  }

  return (
    <div className={styles.wrapper}>
      <ModalTitlebar
        title={"Subject"}
        actionTitle={"Delete"}
        loading={loading}
        handleModal={handleModalOpen}
        handleAction={onSubjectDelete}
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

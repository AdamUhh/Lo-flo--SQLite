import { useEffect, useState } from "react";
import { usePanel } from "../contexts/panelContext";
import { useSubjectsContext } from "../contexts/subjectContext";
import { useUrl } from "../contexts/urlContext";
import { useModal } from "../hooks/useModal";
import styles from "../styles/Subjectbar.module.scss";
import Modal from "./Modal";
import DeleteCardModal from "./Modal/Cards/DeleteCardModal";
import UpdateCardModal from "./Modal/Cards/UpdateCardModal";
import AddSubjectModal from "./Modal/Subjects/AddSubjectModel";
import DeleteSubjectModal from "./Modal/Subjects/DeleteSubjectModel";
import UpdateSubjectModal from "./Modal/Subjects/UpdateSubjectModal";
import LoadingIcon from "./svg/LoadingIcon";
import TrashIcon from "./svg/TrashIcon";

export default function SubjectBar() {
  const { cardIdParam, subjectIdParam, handleSubjectIdParam } = useUrl();
  const { loading, error, subjectData: value } = useSubjectsContext();
  const { handleShowSolution } = usePanel();
  const [modalOpen, handleModalOpen] = useModal();
  const [deleteCardModalOpen, handleDeleteCardModalOpen] = useModal();
  const [deleteSubjectModalOpen, handleDeleteSubjectModalOpen] = useModal();
  const [updateSubjectModalOpen, handleUpdateSubjectModalOpen] = useModal();
  const [updateCardModalOpen, handleUpdateCardModalOpen] = useModal();

  const [subjectTitle, setSubjectTitle] = useState("");
  const [cardTitle, setCardTitle] = useState("");

  // ? required, incase user updates card title
  // ? because without this, navbar card title will changes,
  // ? but subjectbar card title will not
  useEffect(() => {
    setCardTitle(value?.title);
  }, [value?.title]);

  const handleSelectedSubj = (id, title) => {
    handleShowSolution(false);
    handleSubjectIdParam(id);
    setSubjectTitle(title);
  };

  if (cardIdParam.length < 1)
    return (
      <div className={styles.container}>
        <div className={`${styles.ends} ${styles.top}`}>Select a card</div>
      </div>
    );
  return (
    <div className={styles.container}>
      {loading && <LoadingIcon />}
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddSubjectModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={deleteSubjectModalOpen} handleModalOpen={handleDeleteSubjectModalOpen}>
        <DeleteSubjectModal handleModalOpen={handleDeleteSubjectModalOpen} title={subjectTitle} />
      </Modal>
      <Modal modalOpen={updateSubjectModalOpen} handleModalOpen={handleUpdateSubjectModalOpen}>
        <UpdateSubjectModal
          handleModalOpen={handleUpdateSubjectModalOpen}
          initialValue={subjectTitle}
          reAssignTitle={setSubjectTitle}
        />
      </Modal>
      <Modal modalOpen={updateCardModalOpen} handleModalOpen={handleUpdateCardModalOpen}>
        <UpdateCardModal
          handleModalOpen={handleUpdateCardModalOpen}
          initialValue={cardTitle}
          reAssignTitle={setCardTitle}
        />
      </Modal>
      <Modal modalOpen={deleteCardModalOpen} handleModalOpen={handleDeleteCardModalOpen}>
        <DeleteCardModal handleModalOpen={handleDeleteCardModalOpen} title={cardTitle} />
      </Modal>
      {error ? (
        <h5>{error}</h5>
      ) : (
        <>
          <div className={`${styles.ends} ${styles.top}`}>
            <button
              className={` ${styles.tinybtn} tinybtn red`}
              onClick={() => handleDeleteCardModalOpen()}
            />
            <button
              className={` ${styles.tinybtn} tinybtn yellow`}
              onClick={() => handleUpdateCardModalOpen()}
            />
            {cardTitle}
          </div>
          <div className={`${styles.wrapper} ${subjectIdParam.length < 1 ? styles.offset : ""}`}>
            {value != null &&
              value.subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`${styles.title} ${subject.id === subjectIdParam && styles.selected} btn`}
                  onClick={() => handleSelectedSubj(subject.id, subject.title)}
                >
                  {subject.title}
                </button>
              ))}
          </div>
          {value != null && subjectIdParam.length > 0 && (
            <div className={styles.ends_options}>
              <button
                className={`${styles.ends} ${styles.bottom} ${styles.delete} btn red`}
                onClick={handleDeleteSubjectModalOpen}
              >
                <TrashIcon />
              </button>
              <button
                className={`${styles.ends} ${styles.bottom} ${styles.edit} btn yellow`}
                onClick={handleUpdateSubjectModalOpen}
              >
                Edit
              </button>
            </div>
          )}
          <button className={`${styles.ends} ${styles.bottom} btn`} onClick={handleModalOpen}>
            + Add Subject
          </button>
        </>
      )}
    </div>
  );
}

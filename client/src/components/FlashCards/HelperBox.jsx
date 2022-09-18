import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/Flashcards.module.scss";
import Modal from "../Modal";
import AddCardModal from "../Modal/Cards/AddCardModal";
import AddSubjectModal from "../Modal/Subjects/AddSubjectModel";

export default function HelperBox() {
  const { cardIdParam, subjectIdParam } = useUrl();

  const [modalOpen, handleModalOpen] = useModal();
  const [subjectModalOpen, handleSubjectModalOpen] = useModal();

  return (
    <div className={styles.helper_container}>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={subjectModalOpen} handleModalOpen={handleSubjectModalOpen}>
        <AddSubjectModal handleModalOpen={handleSubjectModalOpen} />
      </Modal>

      {cardIdParam === "" ? (
        <div className={styles.wrapper}>
          <h2>Hi! 👋🏻 </h2>
          <h4>
            Get started by
            <br />
            <button className="btn" onClick={handleModalOpen}>
              Creating
            </button>
            or <span>selecting</span> a <p>Card!</p>
          </h4>
        </div>
      ) : (
        subjectIdParam === "" && (
          <div className={styles.wrapper}>
            <h3>
              <span>Nothing to see here...</span> yet!
            </h3>
            <h4>
              Get started by
              <br />
              <button className="btn" onClick={handleSubjectModalOpen}>
                Creating
              </button>{" "}
              or <span>selecting</span> a <p>Subject!</p>
            </h4>
          </div>
        )
      )}
    </div>
  );
}

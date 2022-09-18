import { usePanel } from "../../contexts/panelContext";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/Flashcards.module.scss";
import Modal from "../Modal";
import AddFlashCardModal from "../Modal/FlashCards/AddFlashCardModel";
import ShowAllFlashCardModal from "../Modal/FlashCards/ShowAllFlashCard";
import ListIcon from "../svg/ListIcon";

export default function DataPanel({ isData, maxLength }) {
  const { currentIndex } = usePanel();
  const [modalOpen, handleModalOpen] = useModal();
  const [AllFlashCardModalOpen, handleAllFlashCardModalOpen] = useModal();
  return (
    <div className={styles.datapanel_container}>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddFlashCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={AllFlashCardModalOpen} handleModalOpen={handleAllFlashCardModalOpen}>
        <ShowAllFlashCardModal handleModalOpen={handleAllFlashCardModalOpen} />
      </Modal>
      <div className={styles.datapanel_topbar}>
        {isData && (
          <button className={`${styles.datapanel_listview} btn`} onClick={handleAllFlashCardModalOpen}>
            <ListIcon />
          </button>
        )}
        <button className={`${styles.datapanel_addFlashCard} btn`} onClick={handleModalOpen}>
          + Add Flashcard
        </button>
      </div>
      <div className={styles.datapanel_box}>
        <div className={styles.datapanel_title}>Card</div>
        <div className={styles.datapanel_desc}>
          {maxLength === 0 ? (
            <span>N/A</span>
          ) : (
            <>
              <span>{currentIndex + 1}</span>
              <span>|</span>
              <span>{maxLength}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

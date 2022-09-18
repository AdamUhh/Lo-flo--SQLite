import { usePanel } from "../../contexts/panelContext";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/Flashcards.module.scss";
import Modal from "../Modal";
import AddFlashCardModal from "../Modal/FlashCards/AddFlashCardModel";
import DeleteFlashCardModal from "../Modal/FlashCards/DeleteFlashCardModel";
import UpdateFlashCardModal from "../Modal/FlashCards/UpdateFlashCardModel";
import TrashIcon from "../svg/TrashIcon";

export default function Banner({ data = [], isData }) {
  const { currentIndex, goToNext, goToPrevious, showSolution, handleShowSolution } = usePanel();

  const handleGoToPrevious = () => {
    handleShowSolution(false);
    goToPrevious(data);
  };
  const handleGoToNext = () => {
    handleShowSolution(false);
    goToNext(data);
  };

  const handleShowSolutionFn = () => {
    handleShowSolution();
  };

  const [modalOpen, handleModalOpen] = useModal();
  const [updateModalOpen, handleUpdateModalOpen] = useModal();
  const [deleteModalOpen, handleDeleteModalOpen] = useModal();

  return (
    <>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddFlashCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={updateModalOpen} handleModalOpen={handleUpdateModalOpen}>
        <UpdateFlashCardModal
          handleModalOpen={handleUpdateModalOpen}
          initialQuestion={isData && data[currentIndex]?.question}
          initialSolution={isData && data[currentIndex]?.solution}
        />
      </Modal>
      <Modal modalOpen={deleteModalOpen} handleModalOpen={handleDeleteModalOpen}>
        <DeleteFlashCardModal
          handleModalOpen={handleDeleteModalOpen}
          title={data[currentIndex]?.question}
          currentIndex={currentIndex}
        />
      </Modal>
      <div className={styles.banner}>
        {isData ? (
          <>
            {data?.length > 1 && (
              <>
                <button className={`${styles.Arrow} ${styles.left} btn`} onClick={handleGoToPrevious}>
                  ❮
                </button>
                <button className={`${styles.Arrow} ${styles.right} btn`} onClick={handleGoToNext}>
                  ❯
                </button>
              </>
            )}
            <div className={styles.bannerWrapper}>
              <span className={styles.centerText}>
                {showSolution ? data[currentIndex]?.solution : data[currentIndex]?.question}
              </span>
            </div>
          </>
        ) : (
          <div className={styles.bannerWrapper}>
            <div className={styles.banner_notfound}>
              No Flashcards Found! Create them now!
              <button className={`${styles.addFlashCard} btn`} onClick={handleModalOpen}>
                + Add Flashcard
              </button>
            </div>
          </div>
        )}
      </div>
      {isData && (
        <div className={styles.banner_options}>
          <button className={`${styles.btn} btn red`} onClick={handleDeleteModalOpen}>
            <TrashIcon />
          </button>
          <button className={`${styles.btn} ${styles.edit} btn yellow`} onClick={handleUpdateModalOpen}>
            Edit
          </button>
          <button
            className={`${styles.btn} ${styles.answer} btn green ${showSolution ? "selected" : ""}`}
            onClick={handleShowSolutionFn}
          >
            View Answer
          </button>
        </div>
      )}
    </>
  );
}

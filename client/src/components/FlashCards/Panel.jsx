import { useEffect } from "react";
import { useUrl } from "../../contexts/urlContext";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/Flashcards.module.scss";
import Modal from "../Modal";
import ThemeModal from "../Modal/ThemeModal";
import Palette from "../svg/Palette";
import Banner from "./Banner";
import DataPanel from "./DataPanel";
import HelperBox from "./HelperBox";
import Queue from "./Queue";

export default function Panel({ data }) {
  const { subjectIdParam, handleFlashCardIdParam } = useUrl();
  const [modalOpen, handleModalOpen] = useModal();

  useEffect(() => {
    // ? if user changes subject and it does not have any flashcards in it yet
    // ? set flashCardId to ""
    if (data?.length < 1) {
      handleFlashCardIdParam();
    }
  }, [data?.length < 1]);

  return (
    <>
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <ThemeModal handleModalOpen={handleModalOpen} />
      </Modal>
      <div className={styles.panel}>
        <div className={styles.panel_main}>
          {subjectIdParam?.length > 0 ? <Banner data={data} isData={data?.length > 0} /> : <HelperBox />}
          {data?.length > 1 && subjectIdParam?.length > 0 && <Queue data={data} />}
        </div>
        <div className={styles.side_container}>
          {subjectIdParam?.length > 0 ? (
            <DataPanel isData={data?.length > 0} maxLength={data?.length} />
          ) : (
            // ? hotfix of empty div in order for themePalette icon to work with grid layout
            // ? (as in let it stay bottom right)
            <div></div>
          )}
          <button className={`${styles.themebtn} btn`} onClick={handleModalOpen}>
            <Palette />
          </button>
        </div>
      </div>
    </>
  );
}

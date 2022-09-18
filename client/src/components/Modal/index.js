import styles from "../../styles/Modal.module.scss";

export default function Modal({ children, modalOpen, handleModalOpen }) {
  if (!modalOpen) return <div className="hidden" />;

  return (
    <div className={styles.main_container}>
      <div className={styles.blurBG} onClick={handleModalOpen} />
      {children}
    </div>
  );
}

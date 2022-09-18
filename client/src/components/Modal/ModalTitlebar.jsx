import ButtonLoadingIcon from "../svg/ButtonLoadingIcon";
import styles from "../../styles/Modal.module.scss";

export default function ModalTitlebar({
  title = "Card",
  cancelTitle = "Cancel",
  actionTitle = "Create",
  loading = false,
  handleModal,
  handleAction,
}) {
  return (
    <div className={styles.titlebar_wrapper}>
      <button className={`${styles.btn} btn`} onClick={handleModal}>
        {cancelTitle}
      </button>
      <div>
        {actionTitle} {title}
      </div>
      <button
        className={`${styles.btn} btn ${
          actionTitle === "Delete" ? "red" : actionTitle === "Update" && "green"
        }`}
        disabled={loading}
        onClick={handleAction}
      >
        {loading ? <ButtonLoadingIcon /> : actionTitle}
      </button>
    </div>
  );
}

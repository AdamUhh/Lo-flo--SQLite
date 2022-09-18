import styles from "../../styles/Modal.module.scss";

export default function ContentInput({ error, onSubmit, title, setTitle }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        className={styles.content_input}
        type="text"
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && error}
    </form>
  );
}

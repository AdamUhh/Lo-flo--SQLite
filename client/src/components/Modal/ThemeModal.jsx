import { useTheme } from "next-themes";
import "../../index.css";
import styles from "../../styles/Theme.module.scss";
import modalStyles from "../../styles/Modal.module.scss";

export default function ThemeModal({ handleModalOpen }) {
  const { theme, setTheme } = useTheme();

  const themes = ["light", "darkpurl", "bubble", "pink"];

  return (
    <div className={`${modalStyles.wrapper} ${modalStyles.large}`}>
      <div className={modalStyles.titlebar_wrapper}>
        <button className={`${modalStyles.btn} btn`} onClick={handleModalOpen}>
          Close
        </button>
        <div>Select a theme</div>
      </div>
      <div className={modalStyles.content_container}>
        <div className={modalStyles.content_overflow_container}>
          {themes.map((t) => (
            <div
              key={t}
              className={`${styles.container} ${styles[t]} ${theme === t ? styles.selected : ""} btn`}
              onClick={() => setTheme(t)}
            >
              <div className={`${styles.titlebar} ${modalStyles.titlebar_wrapper}`}>
                <button className={`${styles.btn} ${modalStyles.btn} btn`}>Close</button>
                <div>Select Your Theme</div>
                <button className={`${styles.btn} ${modalStyles.btn} btn`}>Create</button>
                <button className={`${styles.btn} ${modalStyles.btn} btn green`}>Update</button>
                <button className={`${styles.btn} ${modalStyles.btn} btn red`}>Delete</button>
              </div>
              <div className={`${styles.content} ${modalStyles.content_container}`}>
                <div>
                  <div className={modalStyles.delete_title}>
                    <div>Click me to select the theme</div>
                    <div>{t.toUpperCase()}</div>
                  </div>
                  <div>
                    Card Name
                    <input
                      className={modalStyles.content_input}
                      type="text"
                      autoFocus
                      disabled={true}
                      value={"Placeholder Text"}
                    />
                  </div>
                </div>
                <div>
                  <button className={`${styles.btn} btn`}>+ Btn Color 1</button>
                  <button className={`${styles.btn} btn`}>+ Btn Color 2</button>
                </div>
                <div className={styles.relative}>
                  <button className={`${styles.tinybtn} ${styles.red} tinybtn red`}></button>
                  <button className={`${styles.tinybtn} tinybtn yellow`}></button>
                  <button className={`${styles.Arrow} ${styles.left} btn`}>❮</button>
                  <button className={`${styles.Arrow} ${styles.right} btn`}>❯</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

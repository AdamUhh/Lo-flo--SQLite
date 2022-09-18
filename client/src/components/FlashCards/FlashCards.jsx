import { useFlashCardsContext } from "../../contexts/flashcardContext";
import styles from "../../styles/Flashcards.module.scss";
import LoadingIcon from "../svg/LoadingIcon";
import Panel from "./Panel";

export default function FlashCards() {
  const { loading, error, flashCardData: value } = useFlashCardsContext();

  return (
    <div className={styles.container}>
      {loading && <LoadingIcon />}
      <Panel data={value?.flashCards} />
      {error && error}
    </div>
  );
}

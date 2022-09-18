import { useCardsContext } from "../contexts/cardContext";
import { useUrl } from "../contexts/urlContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import AddCardModal from "./Modal/Cards/AddCardModal";
import SearchModal from "./Modal/Search/SearchModal";
import LoadingIcon from "./svg/LoadingIcon";
import SearchIcon from "./svg/SearchIcon";
import styles from "../styles/Navbar.module.scss";

export default function NavBar() {
  const { cardIdParam, handleCardIdParam, handleDeleteSubjectIdParam } = useUrl();

  const { loading, error, cardData: cards } = useCardsContext();

  const [modalOpen, handleModalOpen] = useModal();
  const [searchModalOpen, handleSearchModalOpen] = useModal();

  return (
    <div className={styles.container}>
      {loading && <LoadingIcon />}
      <Modal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
        <AddCardModal handleModalOpen={handleModalOpen} />
      </Modal>
      <Modal modalOpen={searchModalOpen} handleModalOpen={handleSearchModalOpen}>
        <SearchModal handleModalOpen={handleSearchModalOpen} />
      </Modal>
      <div className={styles.wrapper}>
        <div className={styles.cards}>
          {error ? (
            <h4>{error}</h4>
          ) : (
            cards?.map((card) => (
              <div
                key={card.id}
                className={`${styles.card} ${card.id === cardIdParam ? styles.selected : ""}`}
                onClick={() => {
                  handleCardIdParam(card.id);
                  handleDeleteSubjectIdParam();
                }}
              >
                {card.title}
              </div>
            ))
          )}
        </div>
        <button className={`${styles.btn} btn`} onClick={handleModalOpen}>
          + Add Card
        </button>
      </div>
      <button className={`${styles.btn} ${styles.search} btn`} onClick={handleSearchModalOpen}>
        <SearchIcon />
      </button>
    </div>
  );
}

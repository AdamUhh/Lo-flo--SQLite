import { useState } from "react";

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);

  const handleModalOpen = () => setModalOpen((prev) => !prev);

  return [modalOpen, handleModalOpen];
  // return { modalOpen, setModalOpen, handleModalOpen };
};

import { makeRequest } from "./makeRequest";

export function getFlashCards({ cardId, subjectId }) {
  return makeRequest(`cards/${cardId}/subjects/${subjectId}/flashcards`);
}

export function createFlashCard({
  cardId,
  subjectId,
  question,
  solution,
  isCodeQuestion,
}) {
  return makeRequest(`/cards/${cardId}/subjects/${subjectId}/flashcards`, {
    method: "POST",
    data: { question, solution, isCodeQuestion },
  });
}

export function updateFlashCard({
  cardId,
  subjectId,
  flashCardId,
  question,
  solution,
}) {
  return makeRequest(
    `cards/${cardId}/subjects/${subjectId}/flashcards/${flashCardId}`,
    {
      method: "PUT",
      data: { question, solution },
    }
  );
}

export function deleteFlashCard({ cardId, subjectId, flashCardId }) {
  return makeRequest(
    `cards/${cardId}/subjects/${subjectId}/flashcards/${flashCardId}`,
    {
      method: "DELETE",
    }
  );
}

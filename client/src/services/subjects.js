import { makeRequest } from "./makeRequest";

export function getSubjects({ cardId }) {
  return makeRequest(`cards/${cardId}/subjects`);
}

export function createSubject({ cardId, title }) {
  return makeRequest(`/cards/${cardId}/subjects`, {
    method: "POST",
    data: { title },
    cardId,
  });
}

export function updateSubject({ cardId, subjectId, title }) {
  return makeRequest(`cards/${cardId}/subjects/${subjectId}`, {
    method: "PUT",
    data: { title },
  });
}

export function deleteSubject({ cardId, subjectId }) {
  return makeRequest(`cards/${cardId}/subjects/${subjectId}`, {
    method: "DELETE",
  });
}

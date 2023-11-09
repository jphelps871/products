export function getComments(feedbackId) {
  return fetch(`http://localhost:3000/api/comment?feedbackId=${feedbackId}`, {
    method: "GET",
  }).then((response) => response.json());
}

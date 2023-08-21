export async function getComments(feedbackId) {
    return fetch(`/api/comment?feedbackId=${feedbackId}`, {
        method: 'GET',
    }).then(response => response.json());
}
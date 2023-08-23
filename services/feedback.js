export function getFeedback(feedbackId) {
    return fetch(`/api/feedback?feedbackId=${feedbackId}`, {
        method: 'GET',
    }).then(response => response.json());
}

export function postFeedback() {
    return fetch('/api/feedback', {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: JSON.stringify(feedback)
    }).then(response => response.json())
}
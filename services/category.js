export function getCategory() {
    return fetch('/api/category', {
        method: 'GET',
    }).then(response => response.json())
}
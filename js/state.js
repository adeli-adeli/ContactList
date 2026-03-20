
export const store = {
    state: JSON.parse(localStorage.getItem('contacts') || '[]'),
    currentEditId: null
}
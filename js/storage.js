import { renderList } from "./render.js"
import { store } from "./state.js"

export function clearLocalStorage() {
    localStorage.removeItem('contacts')

    store.state = []
    renderList(store.state)
}

export function saveContacts(state) {
    localStorage.setItem('contacts', JSON.stringify(state))
}
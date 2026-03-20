import {store} from "./state.js";
import {element} from "../index.js";


export function openEditModal(contact) {
    store.currentEditId = contact.id
    element.nameInputRename.value = contact.name
    element.vacancyInputRename.value = contact.vacancy
    element.telephoneInputRename.value = contact.phone
    element.createModal.showModal()
}
import {element} from "../index.js";
import {createContactItem} from "./contacts.js";

export function renderList(contacts) {
    element.contactList.innerHTML = "";

    contacts.forEach((contact) => {
        const item = createContactItem(contact);
        element.contactList.append(item);
    });
}


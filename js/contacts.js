import {renderList} from "./render.js";
import {element} from "../index.js";
import {saveContacts} from "./storage.js";
import {store} from "./state.js";
import {openEditModal} from "./modal.js";

export function addContacts(contacts) {
    store.state.push(contacts);

    saveContacts(store.state);
    renderList(store.state);
    element.contactForm.reset();
    element.nameInput.focus();
}

export function deleteContacts(id) {
    store.state = store.state.filter((item) => item.id !== id);

    saveContacts(store.state);
    //обновляем UI
    renderList(store.state);
}

export function createContactItem(contact) {
    const li = document.createElement("li");
    const article = document.createElement("article");
    const name = document.createElement("h3");
    const vacancy = document.createElement("p");
    const phone = document.createElement("p");

    const deleteBtn = document.createElement("button");
    const createBtn = document.createElement("button");

    li.classList.add("contact-item");
    article.classList.add("contact-card");
    deleteBtn.classList.add("delete-button");
    createBtn.classList.add("create-button");

    name.textContent = contact.name;
    vacancy.textContent = contact.vacancy;
    phone.textContent = contact.phone;
    deleteBtn.textContent = "Удалить";
    createBtn.textContent = "Изменить";

    deleteBtn.addEventListener("click", () => {
        deleteContacts(contact.id);
    });

    createBtn.addEventListener("click", () => {
        openEditModal(contact);
    });

    article.append(name, vacancy, phone, deleteBtn, createBtn);
    li.append(article);

    return li;
}

//проверяем валидность формы и блокируем кнопку отправки
export function checkValidation(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();

    formNode.querySelector("button").disabled = !isValid;
}

export function displayResults(contact) {
    element.searchList.innerHTML = ''

    contact.forEach((item) => {
        const li = document.createElement("li");
        const article = document.createElement("article");

        const nameEl = document.createElement("span");
        const vacansyEl = document.createElement("span");
        const phoneEl = document.createElement("span");

        article.classList.add('search-card')
        nameEl.classList.add("search-text");
        vacansyEl.classList.add("search-text");
        phoneEl.classList.add("search-text");

        const {name, vacancy, phone} = item



        nameEl.textContent = name
        vacansyEl.textContent = vacancy
        phoneEl.textContent = phone

        article.append(nameEl, vacansyEl, phoneEl);
        li.append(article);
        element.searchList.append(li)
    })


}

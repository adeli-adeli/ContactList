import {renderList} from "./render.js";

import {addContacts, checkValidation, displayResults} from "./contacts.js";
import {element} from "../index.js";
import {clearLocalStorage, saveContacts} from "./storage.js";
import {store} from "./state.js";

//закрыть модальное окно по кнопке/иконке
element.closeCrossBtn.addEventListener("click", () => {
    element.createModal.close();
});

element.closeBtn.addEventListener("click", () => {
    element.createModal.close();
});

element.closeCrossSearchBtn.addEventListener("click", () => {
    element.searchModal.close();
});

//открыть модальное окно по кнопке
element.searchBtn.addEventListener("click", () => {
    element.searchModal.showModal();
});

element.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = element.nameInput.value.trim();
    const formattedName = name ? name[0].toUpperCase() + name.slice(1) : "";

    const contact = {
        id: Date.now(),
        name: formattedName,
        vacancy: element.vacancyInput.value.trim(),
        phone: element.telephoneInput.value.trim(),
    };

    addContacts(contact);
});

element.contactFormRename.addEventListener("submit", (event) => {
    event.preventDefault();

    store.state = store.state.map((item) => {
        if (item.id === store.currentEditId) {
            item.name = element.nameInputRename.value;
            item.vacancy = element.vacancyInputRename.value;
            item.phone = element.telephoneInputRename.value;
        }

        return item;
    });

    renderList(store.state);
    saveContacts(store.state);
    element.contactFormRename.reset();
});


element.searchInput.addEventListener('input', () => {
    const query = element.searchInput.value.toLowerCase()

    const filterResult = store.state.filter((item) => {
        const res = `${item.name} ${item.vacancy} ${item.phone}`.toLowerCase()
        return res.includes(query);
    })


    displayResults(filterResult)
})


element.contactForm.addEventListener("input", checkValidation);

//добавляем обработчик клика на кнопку для очистки localStorage
element.clearBtn.addEventListener("click", clearLocalStorage);

renderList(store.state);

displayResults(store.state)


const contactForm = document.getElementById('contact-form')
const contactFormRename = document.getElementById('contact-form_rename')
const contactList = document.getElementById('contact-list')

const nameInput = document.getElementById('name')
const vacancyInput = document.getElementById('vacancy')
const telephoneInput = document.getElementById('telephone')

const nameInputRename = document.getElementById('renameName')
const vacancyInputRename = document.getElementById('renameVacancy')
const telephoneInputRename = document.getElementById('renameTelephone')

const clearBtn = document.getElementById('clearBtn')

let modal = document.getElementById('modal')
const closeCrossBtn = document.getElementById('closeModalCross')
const closeBtn = document.getElementById('closeModal')

let state = JSON.parse(localStorage.getItem('contacts') || '[]')


closeCrossBtn.addEventListener('click', () => {
    modal.close()
})

closeBtn.addEventListener('click', () => {

    modal.close()
})

let currentEditId = null

function renderList() {
    contactList.innerHTML = ""


    state.forEach((contact) => {

        const li = document.createElement('li')
        const article = document.createElement('article')
        const name = document.createElement('h3')
        const vacancy = document.createElement('p')
        const phone = document.createElement('p')

        const deleteBtn = document.createElement('button')
        const createBtn = document.createElement('button')

        li.classList.add('contact-item')
        article.classList.add('contact-card')
        deleteBtn.classList.add('delete-button')
        createBtn.classList.add('create-button')
        createBtn.setAttribute('id', 'openModal')


        name.textContent = contact.name
        vacancy.textContent = contact.vacancy
        phone.textContent = contact.phone
        deleteBtn.textContent = 'Удалить'
        createBtn.textContent = 'Изменить'


        deleteBtn.addEventListener('click', () => {
            state = state.filter(item => item.id !== contact.id)

            //обновляем хранилище
            localStorage.setItem('contacts', JSON.stringify(state))

            //обновляем UI
            renderList()
        })


        createBtn.addEventListener('click', () => {
            currentEditId = contact.id
            modal.showModal()
        })

        article.append(name, vacancy, phone, deleteBtn, createBtn)
        li.appendChild(article)
        contactList.appendChild(li)
    })

}


function addContacts(contacts) {
    state.push(contacts)
    localStorage.setItem('contacts', JSON.stringify(state))

    renderList()
    contactForm.reset()
    nameInput.focus()
}


contactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const id = Date.now()
    const name = nameInput.value.trim()
    const formattedName = name ? name[0].toUpperCase() + name.slice(1) : ''
    const vacancy = vacancyInput.value.trim()
    const phone = telephoneInput.value.trim()

    addContacts({
        id, name: formattedName, vacancy, phone,
    })

})


contactFormRename.addEventListener('submit', (event) => {
    event.preventDefault()

    const createState = state.map((item) => {
        if (item.id === currentEditId) {
            item.name = nameInputRename.value
            item.vacancy = vacancyInputRename.value
            item.phone = telephoneInputRename.value
        } else {
            console.log('lox')
        }

        return item

    })



    localStorage.setItem('contacts', JSON.stringify(createState))

    renderList()
    contactFormRename.reset()

    console.log('кнопка изменить')

})

//проверяем валидность формы и блокируем кнопку отправки
function checkValidation(event) {
    const formNode = event.target.form
    const isValid = formNode.checkValidity()

    formNode.querySelector('button').disabled = !isValid
}

contactForm.addEventListener('input', checkValidation)

//очищаем список всех контактов в localStorage
function clearLocalStorage() {
    localStorage.clear()
    renderList()
    console.log("хранилище очищено")
}

//добавляем обработчик клика на кнопку для очистки localStorage
clearBtn.addEventListener('click', clearLocalStorage)


renderList()
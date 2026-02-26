const contactForm = document.getElementById('contact-form')
const contactList = document.getElementById('contact-list')

const nameInput = document.getElementById('name')
const vacancyInput = document.getElementById('vacancy')
const telephoneInput = document.getElementById('telephone')

const clearBtn = document.getElementById('clearBtn')

let state = JSON.parse(localStorage.getItem('contacts') || '[]')

function renderList() {
    contactList.innerHTML = ""


    state.forEach((contact) => {

        const li = document.createElement('li')
        const article = document.createElement('article')
        const name = document.createElement('h3')
        const vacancy = document.createElement('p')
        const phone = document.createElement('p')

        const deleteBtn = document.createElement('button')

        li.classList.add('contact-item')
        article.classList.add('contact-card')
        deleteBtn.classList.add('delete-button')


        name.textContent = contact.name
        vacancy.textContent = contact.vacancy
        phone.textContent = contact.phone
        deleteBtn.textContent = 'Удалить'


        deleteBtn.addEventListener('click', () => {
            state = state.filter(item => item.id !== contact.id)

            //обновляем хранилище
            localStorage.setItem('contacts', JSON.stringify(state))

            //обновляем UI
            renderList()
        })

        article.append( name, vacancy, phone, deleteBtn)
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
const form = document.querySelector('.form')
const container = document.querySelector('.container')
const btn = document.querySelector('.start-btn')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const bio = document.querySelector('#bio')


const showForm = () => {
    container.classList.add('show')
    btn.classList.add('disable')
}


btn.addEventListener('click', showForm)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkValidForm(e)
})


const checkValidForm = (e) => {
    if (!checkRequired([firstName, lastName, email, password, bio])) {
        checkLength(firstName, 3, 16)
        checkLength(lastName, 3, 16)
        checkLength(password, 3, 16)
        checkValidPassword(password)
        checkLength(bio, 8, 50)
        checkAlphabetical(firstName)
        checkAlphabetical(lastName)
        checkBio(bio)
        checkEmail(email)  
    }    
}

const checkValidPassword = (element) => {
    let pattern = /^[a-z\d\?\#\@\!\%\&\*\^]+$/i
    let checkPass = pattern.test(element.value)
    if (checkPass) {
        success(element)
    } else {
        let name = getNameInput(element)
        errorMsg(element, `${name} must contain only letters, numbers and symbols - ?#@!%&*^`)
    }
}


const checkEmail = (element) => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const check = pattern.test(element.value)
    if (check) {
        success(element)
    } else {
        errorMsg(element, 'Email is not valid')
    }
}


const checkRequired = (arr) => {
    let required = false
    arr.forEach(element => {
        if(element.value.trim() === '') {
            let name = getNameInput(element)
            errorMsg(element, `${name} is required`)
            required = true
        } else {
            success(element)
        }
    });
    return required
}


const getNameInput = (element) => {
    let formDiv = element.parentNode
    let label = formDiv.querySelector('.label')
    let name = label.textContent
    return name
}


const success = (element) => {
    const formDiv = element.parentNode
    formDiv.className = 'form-div success'
}


const errorMsg = (element, msg) => {
    const formDiv = element.parentNode
    formDiv.className = 'form-div error'
    const small = formDiv.querySelector('.small')
    small.textContent = msg
}

const checkLength = (element, min, max) => {
    let length = element.value.length
    if (length < min || length > max) {
        const name = getNameInput(element)
        errorMsg(element, `${name} must contain ${min}-${max} characters`)
    } else {
        success(element)
    }
}

const checkAlphabetical = (element) => {
    let pattern = /^[a-z]+$/i
    const check = pattern.test(element.value)
    if (check) {
        success(element)
    } else {
        const name = getNameInput(element)
        errorMsg(element, `${name} must contain only letters`)
    }
}


const checkBio = (element) => {
    let pattern = /^[a-z\s\.\,\_\-\!\?\d\%]+$/i
    const check = pattern.test(element.value)
}







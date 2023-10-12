let form = document.getElementById("registrationForm");
let inputNameElement = document.getElementById("name");
let inputTelephoneNumberElement = document.getElementById("telephoneNumber");
let inputPasswordElement = document.getElementById("pass");
let repeatPasswordInputElement = document.getElementById("repeatPassword");
let useConditionsCheckbox = document.getElementById("useConditions");
let submitButton = document.getElementById("submitButton");

/* Establecemos las expresiones regulares en las que basaremos las validaciones */
let nameRegex = /^[a-zA-Z\s]{1,20}$/;
let telephoneNumberRegex = /^[679][0-9]{8}$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

let nameValid = false;
let telephoneNumberValid = false;
let passwordValid = false;
let repeatPasswordValid = false;

/* Cada evento será un cambio de foco, salvo el check box que será un cambio en la casilla */
inputNameElement.addEventListener("blur", validateName);
inputTelephoneNumberElement.addEventListener("blur", validateTelephone);
inputPasswordElement.addEventListener("blur", validatePassword);
repeatPasswordInputElement.addEventListener("blur", validateRepeatPassword);
useConditionsCheckbox.addEventListener("change", checkFullForm); 

/* Se comprobará que todas las validaciones sean correctas y en tal caso, se habilitará el botón de envío del formulario */
function checkFullForm() {

    if (nameValid && telephoneNumberValid && passwordValid && repeatPasswordValid && useConditionsCheckbox.checked) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}


/* Las validaciones de los distintos campos seguirán un mismo patrón: al haberse establecido un span con el mensaje en el html,
    se buscará esa etiqueta que está después de cada input y en función de si el valor introducido es válido o no, será invisible o visible */

function validateName() {
    let errorSpan = inputNameElement.parentNode.querySelector("span"); // Buscamos el <span> dentro del mismo div que el input

    nameValid = nameRegex.test(inputNameElement.value);
    inputNameElement.classList.remove("ok");
    inputNameElement.classList.remove("error");

    if (!nameValid) {
        inputNameElement.classList.add("error");
        errorSpan.style.opacity = 1; // Hace el mensaje visible
    } else {
        inputNameElement.classList.add("ok");
        errorSpan.style.opacity = 0; // Hace el mensaje transparente
    }

    checkFullForm();
}


/* Validamos el número de teléfono */
function validateTelephone() {
    let errorSpan = inputTelephoneNumberElement.parentNode.querySelector("span");

    telephoneNumberValid = telephoneNumberRegex.test(inputTelephoneNumberElement.value);
    inputTelephoneNumberElement.classList.remove("ok");
    inputTelephoneNumberElement.classList.remove("error");

    if (!telephoneNumberValid) {
        inputTelephoneNumberElement.classList.add("error");
        errorSpan.style.opacity = 1; 
    } else {
        inputTelephoneNumberElement.classList.add("ok");
        errorSpan.style.opacity = 0; 
    }

    checkFullForm();
}


/* Validamos la contraseña */
function validatePassword() {
    let errorSpan = inputPasswordElement.parentNode.querySelector("span");

    passwordValid = passwordRegex.test(inputPasswordElement.value);
    inputPasswordElement.classList.remove("ok");
    inputPasswordElement.classList.remove("error");

    if (!passwordValid) {
        inputPasswordElement.classList.add("error");
        errorSpan.style.opacity = 1; 
    } else {
        inputPasswordElement.classList.add("ok");
        errorSpan.style.opacity = 0; 
    }

    checkFullForm();
}


/* Validamos la contraseña repetida */
function validateRepeatPassword() {
    let errorSpan = repeatPasswordInputElement.parentNode.querySelector("span");

    repeatPasswordValid = repeatPasswordInputElement.value === inputPasswordElement.value;
    repeatPasswordInputElement.classList.remove("ok");
    repeatPasswordInputElement.classList.remove("error");

    if (!repeatPasswordValid) {
        repeatPasswordInputElement.classList.add("error");
        errorSpan.style.opacity = 1; 
    } else {
        repeatPasswordInputElement.classList.add("ok");
        errorSpan.style.opacity = 0; 
    }

    checkFullForm();
}

/* Al darle al botón de enviar (si se puede hacer es porque todo está correcto) */
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el comportamiento natural del evento, en este caso, que se envíe la información
    alert("¡Formulario enviado con éxito!");
});
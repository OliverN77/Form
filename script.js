// Obtener referencias a los elementos del HTML
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpForm = document.querySelector('.sign-up-form');
const signInForm = document.querySelector('.sign-in-form');
const errorMessageElement = document.getElementById('error-message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    errorMessageElement.textContent = mensaje;
}

// Funciones para enviar los formularios
function signUp() {
    // Validar campos de formulario de registro aquí
    // Si los campos son válidos, entonces enviar el formulario, de lo contrario mostrar un mensaje de error
    signUpForm.submit();
}

function signIn() {
    // Validar campos de formulario de inicio de sesión aquí
    // Si los campos son válidos, entonces enviar el formulario, de lo contrario mostrar un mensaje de error
    signInForm.submit();
}

// Agregar eventos a los botones de registro e inicio de sesión
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Agregar eventos a los formularios de registro e inicio de sesión para prevenir el envío predeterminado
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Enviar formulario de registro
    signUp();
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Enviar formulario de inicio de sesión
    signIn();
});

// Aquí es donde debes agregar el código para mostrar un mensaje de error si existe un parámetro 'error' en la URL
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
        mostrarError(error);
    }
});

// Enviar formulario de inicio de sesión al servidor y manejar errores
function signIn() {
    // Validar campos de formulario de inicio de sesión aquí
    // Si los campos son válidos, entonces enviar el formulario, de lo contrario mostrar un mensaje de error
    fetch('/ingreso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            contraseña: passwordInput.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response;
    })
    .then(() => {
        // Si las credenciales son correctas, puedes hacer lo que necesites, como redirigir al usuario o mostrar un mensaje de éxito
        console.log('Inicio de sesión exitoso');
    })
    .catch(error => {
        // Manejar el error y mostrar el mensaje de error en la página
        mostrarError(error.message);
    });
}

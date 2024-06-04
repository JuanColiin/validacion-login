// Espera a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Obtiene referencias a los elementos del formulario y a los mensajes de error
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    // Agrega un evento para manejar el envío del formulario
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        validateForm(); // Llama a la función de validación del formulario
    });

    // Agrega eventos para la validación y limpieza de errores en los campos de entrada
    emailInput.addEventListener('blur', function () {
        validateEmail(); // Valida el email cuando el campo pierde el foco
    });

    emailInput.addEventListener('change', function () {
        clearError(emailError); // Limpia el mensaje de error cuando el contenido del campo cambia
    });

    passwordInput.addEventListener('change', function () {
        clearError(passwordError); // Limpia el mensaje de error cuando el contenido del campo cambia
    });

    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError); // Limpia el mensaje de error cuando el contenido del campo cambia
    });

    // Agrega un evento para mostrar/ocultar las contraseñas
    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text'; // Cambia el tipo de entrada a texto para mostrar las contraseñas
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password'; // Cambia el tipo de entrada a password para ocultar las contraseñas
        }
    });

    // Función para validar el formulario
    function validateForm() {
        const isValidEmail = validateEmail(); // Valida el email
        const isValidPassword = validatePassword(); // Valida la contraseña
        const passwordMatch = validatePasswordMatch(); // Verifica si las contraseñas coinciden

        // Si todas las validaciones son correctas, guarda los datos y muestra un mensaje de éxito
        if (isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage(); // Guarda los datos en el almacenamiento local
            alert('Has ingresado con éxito'); // Muestra un mensaje de éxito
        }
    }

    // Función para validar el email
    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Expresión regular para validar el formato del email
        const emailValue = emailInput.value.trim(); // Elimina espacios vacíos al comienzo y final del input

        // Muestra un mensaje de error si el email no es válido
        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido');
            return false;
        }

        return true; // El email es válido
    }

    // Función para validar la contraseña
    function validatePassword() {
        const passwordValue = passwordInput.value.trim(); // Elimina espacios vacíos al comienzo y final del input

        // Muestra un mensaje de error si la contraseña tiene menos de 6 caracteres
        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres');
            return false;
        }

        return true; // La contraseña es válida
    }

    // Función para verificar si las contraseñas coinciden
    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim(); // Elimina espacios vacíos al comienzo y final del input
        const confirmPasswordValue = confirmPasswordInput.value.trim(); // Elimina espacios vacíos al comienzo y final del input

        // Muestra un mensaje de error si las contraseñas no coinciden
        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden');
            return false;
        }

        return true; // Las contraseñas coinciden
    }

    // Función para mostrar mensajes de error
    function showError(errorElement, message) {
        errorElement.innerHTML = message; // Establece el mensaje de error
        errorElement.style.display = 'block'; // Muestra el mensaje de error
    }

    // Función para limpiar los mensajes de error
    function clearError(errorElement) {
        errorElement.innerHTML = ''; // Limpia el contenido del mensaje de error
        errorElement.style.display = 'none'; // Oculta el mensaje de error
    }

    // Función para guardar los datos en el almacenamiento local
    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim(); // Elimina espacios vacíos al comienzo y final del input
        localStorage.setItem('email', emailValue); // Guarda el email en el almacenamiento local
        const body = bodyBuilderJSON(); // Construye un objeto JSON con los datos del formulario
        console.log(body); // Muestra el objeto JSON en la consola
    }

    // Función para construir un objeto JSON con los datos del formulario
    function bodyBuilderJSON() {
        return {
            "email": emailInput.value, // Establece el email en el objeto JSON
            "password": passwordInput.value // Establece la contraseña en el objeto JSON
        };
    }
});

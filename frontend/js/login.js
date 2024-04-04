const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const togglePasswordButton = document.getElementById("togglePassword");

//password visibility

togglePasswordButton.addEventListener("click", ()=>{
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    togglePasswordButton.innerHTML = type === "password" ? ' <i class="bx bxs-lock-alt"/> ': '<i class="bx bxs-lock-open-alt"/>';

});

//validation
function validatePassword(password) {
    // Minimum 3 characters
    return password.length>=3;
}

function displayErrorMessage(element, message) {
    element.textContent = message;
    element.style.color="red";
}

function clearErrorMessage(element) {
    element.textContent = "";
}


//api call login
async function postData(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    clearErrorMessage(passwordError);

    if (!validatePassword(password)) {
        displayErrorMessage(passwordError, "Password must be at least 3 characters long ");
        return;
    }

    const url = "http://localhost:8080/api/auth/login";
    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Handle response here
        if (response.ok) {
            window.location.href = "home.html";
        } else {
            if (response.status === 401) {
                const errorMessage = await response.text();
                displayErrorMessage(passwordError, errorMessage);
            } else {
                console.error("Error:", response.statusText);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

loginForm.addEventListener("submit", postData);


const LoginFormHandler = async(event) =>{
    event.preventDefault();
    console.log("Login Submitted");
    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
    if (email&&password){
        const res = await fetch('/api/users/login/', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (res.ok){
            alert("logged In");
            loggedIn = true;
            document.location.replace('/dashboard')
        }else{
            alert ('Failed to Log In');
        }
    }
};

const SignupFormHandler = async(event) =>{
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username&&email&&password){
        const res = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (res.ok){
            document.location.replace('/dashboard')
        }else{
            alert ('Failed to Sign Up');
        }
    }
};

document
    .querySelector(".login-form")
    .addEventListener("submit", LoginFormHandler);
document
    .querySelector(".signup-form")
    .addEventListener("submit", SignupFormHandler);
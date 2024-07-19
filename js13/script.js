document.addEventListener("DOMContentLoaded", function() {
   
    loadForm();
});

function saveForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullName = document.getElementById('fullName').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const email = document.getElementById('email').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    
    const languages = [];
    document.querySelectorAll('input[name="languages"]:checked').forEach(lang => {
        languages.push(lang.value);
    });

   
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (!validateEmail(email)) {
        alert('Invalid email address');
        return;
    }

    
    document.cookie = `username=${username}; path=/`;
    document.cookie = `fullName=${fullName}; path=/`;
    document.cookie = `gender=${gender}; path=/`;
    document.cookie = `languages=${languages.join(',')}; path=/`;
    document.cookie = `email=${email}; path=/`;
    document.cookie = `additionalInfo=${additionalInfo}; path=/`;

    alert('Form data saved successfully');
}

function loadForm() {
    const cookies = document.cookie.split('; ');
    const data = {};
    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=');
        data[key] = value;
    });

    if (data.username) document.getElementById('username').value = data.username;
    if (data.fullName) document.getElementById('fullName').value = data.fullName;
    if (data.gender) document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
    if (data.languages) {
        const languages = data.languages.split(',');
        languages.forEach(lang => {
            document.querySelector(`input[name="languages"][value="${lang}"]`).checked = true;
        });
    }
    if (data.email) document.getElementById('email').value = data.email;
    if (data.additionalInfo) document.getElementById('additionalInfo').value = data.additionalInfo;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('registerButton');

    submitButton.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password == confirmPassword) {
            const user = {
                firstName,
                lastName,
                email,
                password
            }
            console.log(user);
        }
    });
})



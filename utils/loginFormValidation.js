function loginFormValidation(email, password) {
    if (email.trim() == "" || password.trim() == "") {
        return "Please enter all fields";
    }
    if (email.indexOf('@') == -1) {
        return "Please enter a valid email";
    }
    return null;
}

module.exports = { loginFormValidation };
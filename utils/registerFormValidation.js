function registerFormValidation(firstName, lastName, email, password1, password2) {
    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password1.trim() === "" || password2.trim() === "") {
        return "Please enter all fields";
    }
    if (email.indexOf('@') === -1) {
        return "Please enter a valid email";
    }
    if (password1.length < 6) {
        return "Password must be at least 6 characters";
    }
    if (password1 !== password2) {
        return "Passwords do not match";
    }
    return null;
}

module.exports = { registerFormValidation };
const ejs = require('ejs');

const renderNavbar = (user) => {
    const navbar =
        `
    <nav class="navbar">
        <a class="navbar-logo" href = "/" > simuBank<a>
            <ul class="navbar-list">
                <% if (user) { %>
            <li class="navbar-list-element">
                <a class="navbar-link" href="/account">
                    Account
                </a>
            </li>
            <li class="navbar-list-element">
                <a class="navbar-link" href="/logout">
                    Log out
                </a>
            </li>
            <% } else { %>
                <li class="navbar-list-element">
                    <a class="navbar-link" href="/register">
                        Register
                    </a>
                </li>
                <li class="navbar-list-element">
                    <a class="navbar-link" href="/login">
                        Log in
                    </a>
                </li>
                <% } %>
         </ul>
    </nav> `;

    const renderedNavbar = ejs.render(navbar, { user: user });
    return renderedNavbar;
};

module.exports = renderNavbar;
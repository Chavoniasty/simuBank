const ejs = require('ejs');

const renderFooter = () => {
    const footer = `
            <footer>
                <div class="container">
                    Copyright &copy; Dominik Molenda 2023
                </div>
            </footer>
    `;
    const renderedFooter = ejs.render(footer);
    return renderedFooter;
};

module.exports = renderFooter;
document.addEventListener('DOMContentLoaded', () => {
    const openChangeButton = document.getElementById('changeDialogOpener');
    const closeChangeButton = document.getElementById('closeChangeDialog');
    const changeDialog = document.getElementById('changeDialog');
    const changeForm = document.getElementById('changeForm');

    openChangeButton.addEventListener('click', () => {
        changeDialog.showModal();
    });

    closeChangeButton.addEventListener('click', () => {
        changeDialog.close();
    });

    changeForm.addEventListener('submit', (event) => {
        console.log("submit");
        event.preventDefault();
    });
});
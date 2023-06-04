document.addEventListener('DOMContentLoaded', () => {
    const openTransferButton = document.getElementById('transferDialogOpener');
    const closeTransferButton = document.getElementById('closeTransferDialog');
    const transferDialog = document.getElementById('transferDialog');
    const transferForm = document.getElementById('transferForm');

    openTransferButton.addEventListener('click', () => {
        transferDialog.showModal();
    });

    closeTransferButton.addEventListener('click', () => {
        transferDialog.close();
    });

    transferForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const requestBody = {
            destinationAccount: transferForm.elements['destinationAccount'].value,
            amount: transferForm.elements['amount'].value
        }
        closeTransferButton.click();
        fetch('/account/transfer', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
    });
});
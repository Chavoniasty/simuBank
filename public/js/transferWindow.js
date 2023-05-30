document.addEventListener('DOMContentLoaded', () => {
    const openTransferButton = document.getElementById('a1');
    openTransferButton.addEventListener('click', () => {
        const transferModal = document.getElementById('transferModal');
        transferModal.style.display = 'block';
    });

    const closeTransferButton = document.getElementById('a2');
    closeTransferButton.addEventListener('click', () => {
        const transferModal = document.getElementById('transferModal');
        transferModal.style.display = 'none';
    });

    const transferForm = document.getElementById('transferForm');

    transferForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const requestBody = {
            destinationAccount: transferForm.elements['destinationAccount'].value,
            amount: transferForm.elements['amount'].value
        }
        fetch('/account/transfer', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
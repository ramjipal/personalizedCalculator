const saveButton = document.getElementById('saveData');
saveButton.addEventListener('click', function() {
    const formData = new FormData(document.getElementById('dataForm'));
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/save_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the response from the server, e.g., show a success message.
    })
    .catch(error => {
        // Handle errors, e.g., show an error message.
    });
});

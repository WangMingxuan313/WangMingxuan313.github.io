document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://api.github.com/repos/WangMingxuan313/WangMingxuan313.github.io/dispatches', {
            method: 'POST',
            headers: {
                'Authorization': 'token YOUR_GITHUB_TOKEN',
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                event_type: 'upload_file',
                client_payload: {
                    filename: file.name,
                    file_content: await file.arrayBuffer(),
                },
            }),
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'File uploaded successfully!';
        } else {
            document.getElementById('message').textContent = 'Failed to upload file.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred.';
    }
});

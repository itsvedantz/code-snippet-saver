document.getElementById('snippetForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;

    const response = await fetch('/snippets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, code, language }),
    });

    if (response.ok) {
        document.getElementById('snippetForm').reset();
        loadSnippets();
    }
    try {
        const response = await fetch('/snippets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, code, language }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        // ...
      } catch (error) {
        console.error('Error creating snippet:', error);
      }
});

async function loadSnippets() {
    const response = await fetch('/snippets');
    const snippets = await response.json();
    const snippetsDiv = document.getElementById('snippets');
    snippetsDiv.innerHTML = '';

    snippets.forEach(snippet => {
        const snippetDiv = document.createElement('div');
        snippetDiv.classList.add('snippet');
        snippetDiv.innerHTML = `<h3>${snippet.title} (${snippet.language})</h3><pre>${snippet.code}</pre>`;
        snippetsDiv.appendChild(snippetDiv);
    });
}

// Load snippets on page load
loadSnippets();

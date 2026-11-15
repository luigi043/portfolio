(() => {
    if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(window.location.hostname)) return;
    const scriptUrl = document.currentScript.src;
    fetch(new URL('../assets/projects/local-demos.json', scriptUrl))
        .then(response => { if (!response.ok) throw new Error('Demo catalogue unavailable'); return response.json(); })
        .then(demos => {
            document.querySelectorAll('[data-local-demo]').forEach(container => {
                const links = demos[container.dataset.localDemo] || [];
                for (const demo of links) {
                    const anchor = document.createElement('a');
                    anchor.href = demo.url;
                    anchor.textContent = `${demo.label} ↗`;
                    anchor.target = '_blank';
                    anchor.rel = 'noopener noreferrer';
                    anchor.className = 'local-demo-link';
                    container.appendChild(anchor);
                }
                if (links.length) {
                    const note = document.createElement('small');
                    note.textContent = 'Local only · services must be running on this computer';
                    container.appendChild(note);
                }
            });
        }).catch(() => {});
})();

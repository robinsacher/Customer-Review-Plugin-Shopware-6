// Live-Validierung der Länge des Kommentarfelds
export function validateComment(input, maxLength, errorMessage) {
    if (!input) return;

    // Error-Container erstellen
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    input.insertAdjacentElement('afterend', errorDiv);

    // Länge des Kommentars prüfen und Fehler anzeigen
    input.addEventListener('input', () => {
        if (input.value.length > maxLength) {
            input.classList.add('is-invalid');
            errorDiv.textContent = errorMessage;
        } else {
            input.classList.remove('is-invalid');
            errorDiv.textContent = '';
        }
    });
}

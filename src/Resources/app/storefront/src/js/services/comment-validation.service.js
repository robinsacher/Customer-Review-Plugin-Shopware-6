export function attachLiveValidation(input, maxLength, errorMessage) {
    if (!input) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    input.insertAdjacentElement('afterend', errorDiv);

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

// Formular aktivieren/deaktivieren
export default class FormStateManager {
    constructor(form, submitButtonSelector = 'button[type="submit"]') {
        this.form = form;
        this.submitButton = form?.querySelector(submitButtonSelector);
    }

    enable() {
        this.form.style.opacity = '1';
        this.form.style.pointerEvents = 'auto';

        this.form.querySelectorAll('input, textarea, .star')
            .forEach(el => el.removeAttribute('disabled'));

        if (this.submitButton) {
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.remove('disabled');
        }
    }

    disable() {
        this.form.style.opacity = '0.5';
        this.form.style.pointerEvents = 'none';

        this.form.querySelectorAll('input, textarea, .star')
            .forEach(el => el.setAttribute('disabled', 'disabled'));

        if (this.submitButton) {
            this.submitButton.setAttribute('disabled', 'disabled');
            this.submitButton.classList.add('disabled');
        }
    }
}

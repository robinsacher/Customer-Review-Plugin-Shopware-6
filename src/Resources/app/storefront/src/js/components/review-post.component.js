import {createXhr} from '../services/http.service';
import {getCSRFToken} from '../services/csrf-token.service';

export default class ReviewPostComponent {
    constructor(form, saveUrl, onSuccess) {
        this.form = form;
        this.saveUrl = saveUrl;
        this.onSuccess = onSuccess;

        // Submit-Handler registrieren
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Form-Submit an Server senden
    handleSubmit(event) {
        event.preventDefault();

        // FormData mit CSRF-Token
        const formData = new FormData(this.form);
        const csrfToken = getCSRFToken();
        if (csrfToken) formData.append('_token', csrfToken);

        const xhttp = createXhr('POST', this.saveUrl, csrfToken);

        xhttp.onload = () => {
            try {
                const data = JSON.parse(xhttp.responseText);
                if (data.success) {
                    this.form.reset();  // Formular zurücksetzen
                    // Success-Callback ausführen
                    if (typeof this.onSuccess === 'function') {
                        this.onSuccess();
                    }
                }
            } catch {
                console.error("Fehler beim Absenden.");
            }
        };

        xhttp.send(formData);
    }
}

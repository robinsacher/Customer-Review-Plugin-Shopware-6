import Plugin from 'src/plugin-system/plugin.class';

import CookieConsentService from './services/cookie-consent.service';
import CookieConsentWatcher from './services/cookie-consent-watcher.service';
import FormStateManager from './services/form-state-manager.service';

import {validateComment} from './services/comment-validation.service';
import StarRatingComponent from './components/star-rating.component';
import ReviewListComponent from './components/review-list.component';
import ReviewPostComponent from './components/review-post.component';

export default class ReviewPlugin extends Plugin {
    init() {
        this.form = this.el.querySelector('#review-form');
        this.reviewsContainer = this.el.querySelector('#reviews');
        this.commentField = this.el.querySelector('#rev-comment');
        this.starContainer = this.el.querySelector('#star-rating');
        this.hiddenInput = this.el.querySelector('#rev-stars');

        //Abbruch, falls Elemente fehlen
        if (!this.form || !this.reviewsContainer || !this.starContainer) return;

        // Form-Manager initialisieren
        this.formState = new FormStateManager(this.form);

        // Cookie Consent
        this.consentService = new CookieConsentService('customer-review-enabled');
        this.consentWatcher = new CookieConsentWatcher(
            this.consentService,
            (enabled) => this.updateFormState(enabled)
        );

        this.updateFormState(this.consentService.hasConsent());

        // Sterne-Bewertung Komponenten initialisieren
        this.stars = new StarRatingComponent(this.starContainer, this.hiddenInput);

        // Live Validierung für Kommentarfeld
        this.maxLength = parseInt(this.reviewsContainer.dataset.maxLength, 10) || 500;
        this.errorMessage = this.reviewsContainer.dataset.errorMessage || 'Kommentar ist zu lang.';
        validateComment(this.commentField, this.maxLength, this.errorMessage);

        // Review List Komponente
        this.reviewList = new ReviewListComponent(this.reviewsContainer);

        // Review Post mit Callback nach Erfolg
        this.reviewPost = new ReviewPostComponent(
            this.form,
            this.reviewsContainer.dataset.saveUrl,
            () => {
                this.stars.paint(0); // Sterne zurücksetzen
                this.reviewList.load(this.reviewsContainer.dataset.listUrl); // Reviews neu laden
            }
        );

        this.reviewList.load(this.reviewsContainer.dataset.listUrl);
    }

    // Formular aktivieren/deaktivieren basierend auf Consent
    updateFormState(enabled) {
        if (enabled) this.formState.enable();
        else this.formState.disable();
    }

    destroy() {
        this.consentWatcher?.destroy();
        super.destroy();
    }
}

import Plugin from 'src/plugin-system/plugin.class';

import CookieConsentService from './services/cookie-consent.service';
import CookieConsentWatcher from './services/cookie-consent-watcher.service';
import FormStateManager from './services/form-state-manager.service';

import {attachLiveValidation} from './services/comment-validation.service';
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

        if (!this.form || !this.reviewsContainer || !this.starContainer) return;

        // Form-Manager
        this.formState = new FormStateManager(this.form);

        // Consent
        this.consentService = new CookieConsentService('customer-review-enabled');
        this.consentWatcher = new CookieConsentWatcher(
            this.consentService,
            (enabled) => this.updateFormState(enabled)
        );

        this.updateFormState(this.consentService.hasConsent());

        // Komponenten
        this.stars = new StarRatingComponent(this.starContainer, this.hiddenInput);

        // Kommentar Validierung
        this.maxLength = parseInt(this.reviewsContainer.dataset.maxLength, 10) || 500;
        this.errorMessage = this.reviewsContainer.dataset.errorMessage || 'Kommentar ist zu lang.';
        attachLiveValidation(this.commentField, this.maxLength, this.errorMessage);

        // Review List
        this.reviewList = new ReviewListComponent(this.reviewsContainer);

        // Review Post
        this.reviewPost = new ReviewPostComponent(
            this.form,
            this.reviewsContainer.dataset.saveUrl,
            () => {
                this.stars.paint(0);
                this.reviewList.load(this.reviewsContainer.dataset.listUrl);
            }
        );

        this.reviewList.load(this.reviewsContainer.dataset.listUrl);
    }

    updateFormState(enabled) {
        if (enabled) this.formState.enable();
        else this.formState.disable();
    }

    destroy() {
        this.consentWatcher?.destroy();
        super.destroy();
    }
}

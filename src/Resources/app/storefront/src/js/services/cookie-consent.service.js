import CookieStorageHelper from 'src/helper/storage/cookie-storage.helper';

export default class CookieConsentService {
    constructor(cookieName = 'customer-review-enabled') {
        this.cookieName = cookieName;
    }

    // Cookie-Wert auslesen
    getValue() {
        return CookieStorageHelper.getItem(this.cookieName);
    }

    // Prüfen, ob Zustimmung erteilt wurde
    hasConsent() {
        return this.getValue() === '1';
    }
}

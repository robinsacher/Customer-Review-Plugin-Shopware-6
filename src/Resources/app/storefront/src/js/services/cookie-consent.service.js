import CookieStorageHelper from 'src/helper/storage/cookie-storage.helper';

export default class CookieConsentService {
    constructor(cookieName = 'customer-review-enabled') {
        this.cookieName = cookieName;
    }

    getValue() {
        return CookieStorageHelper.getItem(this.cookieName);
    }

    hasConsent() {
        return this.getValue() === '1';
    }
}

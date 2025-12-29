// Cookie-Änderungen überwachen
export default class CookieConsentWatcher {
    constructor(consentService, onChange, interval = 100) {
        this.consentService = consentService;
        this.onChange = onChange;
        this.intervalTime = interval;

        this.lastValue = this.consentService.getValue();
        this.start();
    }

    // Cookie-Änderungen überwachen
    start() {
        this.interval = setInterval(() => {
            const current = this.consentService.getValue();
            if (current !== this.lastValue) {
                this.lastValue = current;
                this.onChange(current === '1');
            }
        }, this.intervalTime);
    }

    // Überwachung stoppen
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

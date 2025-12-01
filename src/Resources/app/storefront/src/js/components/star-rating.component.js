export default class StarRatingComponent {
    constructor(container, hiddenInput) {
        this.stars = Array.from(container.querySelectorAll('.star'));
        this.hiddenInput = hiddenInput;
        this.paint(0);
        this.bindEvents();
    }

    bindEvents() {
        this.stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = parseInt(star.dataset.value, 10);
                if (value >= 1) {
                    this.hiddenInput.value = value;
                    this.paint(value);
                }
            });

            star.addEventListener('mouseenter', () => {
                this.paint(star.dataset.value);
            });

            star.addEventListener('mouseleave', () => {
                this.paint(this.hiddenInput.value || 0);
            });
        });
    }

    paint(val) {
        this.stars.forEach(star => {
            const active = (+star.dataset.value <= +val);
            star.textContent = active ? '★' : '☆';
            star.classList.toggle('active', active);
        });
    }
}

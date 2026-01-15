const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-review-form', {
    template: `<div class="sw-cms-el-review-form">
        <div style="border: 2px dashed #ccc; padding: 20px; text-align: center;">
            <h3>Review Formular</h3>
            <p>Name: _______________</p>
            <p>Email: _______________</p>
            <p>Bewertung: ⭐⭐⭐⭐⭐</p>
            <p>Kommentar: _______________</p>
            <button>Absenden</button>
        </div>
    </div>`,

    mixins: [Mixin.getByName('cms-element')]
});
const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-review-form', {
    template: `<div class="sw-cms-el-review-form">
        <p>Review Form Element</p>
    </div>`,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('review-form');
        }
    }
});
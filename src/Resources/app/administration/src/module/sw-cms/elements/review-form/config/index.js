const {Component, Mixin} = Shopware;

Component.register('sw-cms-el-config-review-form', {
    template: `<div class="sw-cms-el-config-review-form">
        <sw-text-field
            v-model="element.config.comment.value"
            label="Standard-Kommentar"
            placeholder="Optional">
        </sw-text-field>
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
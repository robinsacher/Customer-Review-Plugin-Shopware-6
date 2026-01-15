import template from './customer-reviews-list.html.twig';

const {Component, Mixin} = Shopware;

Component.register('customer-reviews-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            isLoading: true,
            items: [],
            repository: null
        };
    },

    created() {
        this.repository = this.repositoryFactory.create('vorbereitung_customer_review');
        this.loadItems();
    },

    methods: {
        async loadItems() {
            this.isLoading = true;
            const criteria = new Shopware.Data.Criteria(1, 50);
            this.items = await this.repository.search(criteria, Shopware.Context.api);
            this.isLoading = false;
        },

        async onToggleActive(item, newValue) {
            try {
                const entity = await this.repository.get(item.id, Shopware.Context.api);
                entity.active = newValue;

                await this.repository.save(entity, Shopware.Context.api);

                this.items = this.items.map(i => {
                    if (i.id === entity.id) {
                        return entity;
                    }
                    return i;
                });

                this.createNotificationSuccess({
                    title: this.$tc('vorbereitung-customer-review.list.cardTitle'),
                    message: this.$tc(entity.active
                        ? 'vorbereitung-customer-review.notifications.activate'
                        : 'vorbereitung-customer-review.notifications.deactivate')
                });

            } catch (error) {
                this.createNotificationError({
                    title: 'Fehler beim Speichern',
                    message: 'Aktualisierung fehlgeschlagen.'
                });
            }
        }

    }
});

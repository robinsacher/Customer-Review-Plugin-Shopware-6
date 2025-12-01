import './page/customer-reviews-list';

const {Module} = Shopware;

Module.register('customer-reviews', {
    type: 'plugin',
    name: 'Customer Reviews',
    title: 'vorbereitung-customer-review.general.mainMenuItemGeneral',
    description: 'vorbereitung-customer-review.general.descriptionTextModule',
    color: '#ffcc00',
    icon: 'default-action-star',

    routes: {
        list: {
            component: 'customer-reviews-list',
            path: 'list'
        }
    },

    navigation: [{
        id: 'customer-reviews',
        label: 'vorbereitung-customer-review.general.mainMenuItemGeneral',
        color: '#ffcc00',
        path: 'customer.reviews.list',
        icon: 'default-action-star',
        parent: 'sw-content',
        position: 100
    }],

    snippets: {
        'de-DE': require('../../snippet/de-DE.json'),
        'en-GB': require('../../snippet/en-GB.json')
    },

});

import './page/customer-reviews-list';
import deDE from '../../snippet/de-DE.json';
import enGB from '../../snippet/en-GB.json';

const {Module} = Shopware;

Module.register('customer-reviews', {
    type: 'plugin',
    name: 'Customer Reviews',
    title: 'vorbereitung-customer-review.general.mainMenuItemGeneral',
    description: 'vorbereitung-customer-review.general.descriptionTextModule',
    color: '#0074ff',
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
        color: '#0074ff',
        path: 'customer.reviews.list',
        icon: 'default-action-star',
        parent: 'sw-content',
        position: 100
    }],

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
});

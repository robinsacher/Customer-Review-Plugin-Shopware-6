import './page/customer-reviews-list';
import deDE from '../../snippet/de-DE.json';
import enGB from '../../snippet/en-GB.json';

const {Module} = Shopware;

Module.register('customer-reviews', {
    type: 'plugin',
    name: 'Customer Reviews',
    title: 'vorbereitung-customer-review.general.mainMenuItemGeneral',

    routes: {
        list: {
            component: 'customer-reviews-list',
            path: 'list'
        }
    },

    navigation: [{
        id: 'customer-reviews',
        label: 'vorbereitung-customer-review.general.mainMenuItemGeneral',
        path: 'customer.reviews.list',
        parent: 'sw-content',
    }],

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
});

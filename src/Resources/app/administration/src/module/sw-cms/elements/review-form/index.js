import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'review-form',
    label: 'Review Form',
    component: 'sw-cms-el-review-form',
    configComponent: 'sw-cms-el-config-review-form',
    previewComponent: 'sw-cms-el-preview-review-form',
    defaultConfig: {
        comment: {
            source: 'static',
            value: '',
            required: false
        }
    }
});
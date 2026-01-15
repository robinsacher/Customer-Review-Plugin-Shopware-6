import './component';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'review-form',
    label: 'Review Form',
    component: 'sw-cms-el-review-form',
    previewComponent: 'sw-cms-el-preview-review-form'
});
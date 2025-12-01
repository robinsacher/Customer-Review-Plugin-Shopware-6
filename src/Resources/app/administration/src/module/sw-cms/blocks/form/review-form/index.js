import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'review-form',
    label: 'Review Form',
    category: 'form',
    component: 'cms-block-review-form',
    previewComponent: 'cms-block-preview-review-form',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        content: {
            type: 'review-form',
            default: {
                config: {
                    comment: {
                        source: 'static',
                        value: ''
                    }
                }
            }
        }
    }
});
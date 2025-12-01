import ReviewPlugin from './js/review.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('ReviewPlugin', ReviewPlugin, '[data-review-plugin]');

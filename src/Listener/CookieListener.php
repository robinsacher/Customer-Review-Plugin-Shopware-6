<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Listener;

use Shopware\Storefront\Event\StorefrontRenderEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CookieListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            StorefrontRenderEvent::class => 'onStorefrontRender'
        ];
    }

    public function onStorefrontRender(StorefrontRenderEvent $event): void
    {
        $parameters = $event->getParameters();
        $cookies = $parameters['cookieGroups'] ?? [];

        foreach ($cookies as &$cookie) {
            if (!is_array($cookie)) {
                continue;
            }

            if (($cookie['snippet_name'] ?? null) === 'cookie.groupComfortFeatures') {
                $cookie['entries'][] = [
                    'snippet_name' => 'Bewertungsformular',
                    'snippet_description' => 'Ermöglicht das Absenden von Bewertungen',
                    'cookie' => 'customer-review-enabled',
                    'value' => '1',
                    'expiration' => '30'
                ];
            }
        }

        $event->setParameter('cookieGroups', $cookies);
    }
}
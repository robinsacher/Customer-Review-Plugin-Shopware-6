<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Subscriber;

use Shopware\Core\Content\Sitemap\Event\SitemapPopulateEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\RouterInterface;

class SitemapSubscriber implements EventSubscriberInterface
{
    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            SitemapPopulateEvent::class => 'onSitemapPopulate',
        ];
    }

    public function onSitemapPopulate(SitemapPopulateEvent $event): void
    {
        $url = $this->router->generate(
            'frontend.review.page',
            [],
            RouterInterface::ABSOLUTE_URL
        );

        $event->getUrlContainer()->addUrl(
            $url,
            $event->getSalesChannelId(),
            new \DateTimeImmutable(),
            SitemapPopulateEvent::CHANGEFREQ_DAILY,
            0.8
        );
    }
}

<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Framework\Cookie;

use Shopware\Storefront\Framework\Cookie\CookieProviderInterface;

class CustomCookieProvider implements CookieProviderInterface
{
    private const TARGET_GROUP_SNIPPET = 'cookie.groupComfortFeatures';

    private CookieProviderInterface $originalService;

    public function __construct(CookieProviderInterface $service)
    {
        $this->originalService = $service;
    }

    public function getCookieGroups(): array
    {
        $cookieGroups = $this->originalService->getCookieGroups();

        $newCookie = [
            'snippet_name' => 'vorbereitung.cookie.review.label',
            'snippet_description' => 'vorbereitung.cookie.review.description',
            'cookie' => 'customer-review-enabled',
            'value' => '1',
            'expiration' => '30',
        ];

        foreach ($cookieGroups as &$group) {
            if (($group['snippet_name'] ?? '') === self::TARGET_GROUP_SNIPPET) {
                $group['entries'][] = $newCookie;
                return $cookieGroups;
            }
        }

        return $cookieGroups;
    }
}

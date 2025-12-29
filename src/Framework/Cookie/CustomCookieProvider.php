<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Framework\Cookie;

use Shopware\Storefront\Framework\Cookie\CookieProviderInterface;

class CustomCookieProvider implements CookieProviderInterface
{
    private const COOKIE_GROUP = 'cookie.groupComfortFeatures';

    private CookieProviderInterface $baseCookieProvider;

    public function __construct(CookieProviderInterface $cookieProvider)
    {
        $this->baseCookieProvider = $cookieProvider;
    }

    public function getCookieGroups(): array
    {
        $cookieGroups = $this->baseCookieProvider->getCookieGroups();

        $customerReviewCookie = [
            'snippet_name' => 'vorbereitung.cookie.review.label',
            'snippet_description' => 'vorbereitung.cookie.review.description',
            'cookie' => 'customer-review-enabled',
            'value' => '1',
            'expiration' => '30',
        ];

        foreach ($cookieGroups as &$group) {
            if (($group['snippet_name'] ?? '') === self::COOKIE_GROUP) {
                $group['entries'][] = $customerReviewCookie;
                return $cookieGroups;
            }
        }

        return $cookieGroups;
    }
}

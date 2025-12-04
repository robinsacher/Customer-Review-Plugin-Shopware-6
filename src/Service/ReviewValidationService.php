<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Service;

use Shopware\Core\System\SystemConfig\SystemConfigService;
use Symfony\Component\HttpFoundation\JsonResponse;

class ReviewValidationService
{
    public function __construct(
        private readonly SystemConfigService $config
    )
    {
    }

    public function validateCookieConsent(): ?JsonResponse
    {
        $consent = $_COOKIE['customer-review-enabled'] ?? null;

        if ($consent !== '1') {
            return new JsonResponse([
                'success' => false,
                'error' => 'Cookie-Einwilligung fehlt.'
            ], 400);
        }

        return null;
    }

    public function validateInput(array $data): ?JsonResponse
    {
        $maxLength = (int)($this->config->get('VorbereitungCustomerReview.config.maxCommentLength') ?? 500);

        $stars = (int)($data['stars'] ?? 0);
        $email = trim((string)($data['email'] ?? ''));
        $comment = trim((string)($data['comment'] ?? ''));

        if ($stars < 1 || $stars > 5) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Ungültige Sternebewertung.'
            ], 400);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Ungültige E-Mail-Adresse.'
            ], 400);
        }

        // Kommentar bereinigen
        $comment = strip_tags($comment);
        $comment = preg_replace('/\p{C}+/u', '', $comment);
        $comment = trim($comment);

        if ($comment === '') {
            return new JsonResponse([
                'success' => false,
                'error' => 'Kommentar darf nicht leer sein.'
            ], 400);
        }

        if (mb_strlen($comment) > $maxLength) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Kommentar ist zu lang (max. ' . $maxLength . ' Zeichen).'
            ], 400);
        }

        return null;
    }
}

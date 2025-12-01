<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Service;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\HttpFoundation\JsonResponse;

class VorbereitungCustomerReviewService
{
    public function __construct(
        private readonly EntityRepository $reviewRepository
    )
    {
    }

    /**
     * Reviews anzeigen
     */
    public function getReviews(Context $context): JsonResponse
    {
        try {
            $criteria = (new Criteria())
                ->addFilter(new EqualsFilter('active', 1))
                ->addSorting(new FieldSorting('createdAt', FieldSorting::DESCENDING));

            $result = $this->reviewRepository->search($criteria, $context);

            $out = [];
            foreach ($result->getEntities() as $r) {
                $out[] = [
                    'stars' => (int)$r->get('stars'),
                    'comment' => (string)($r->get('comment') ?? ''),
                    'email' => (string)$r->get('email'),
                    'createdAt' => $r->get('createdAt')?->format('Y-m-d H:i:s'),
                ];
            }

            return new JsonResponse([
                'success' => true,
                'reviews' => $out
            ]);
        } catch (\Throwable $e) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Fehler beim Laden der Reviews: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Review speichern (Validierung läuft im Controller)
     */
    public function saveReview(array $data, Context $context): JsonResponse
    {
        try {
            $entry = [
                'id' => Uuid::randomHex(),
                'stars' => (int)$data['stars'],
                'comment' => (string)$data['comment'],
                'email' => strtolower((string)$data['email']),
                'active' => false
            ];

            $this->reviewRepository->create([$entry], $context);

            return new JsonResponse([
                'success' => true,
                'message' => 'Review gespeichert'
            ]);
        } catch (\Throwable $e) {
            return new JsonResponse([
                'success' => false,
                'error' => 'Fehler beim Speichern: ' . $e->getMessage()
            ], 500);
        }
    }
}

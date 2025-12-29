<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Storefront\Controller;

use Shopware\Storefront\Controller\StorefrontController;
use Shopware\Core\Framework\Context;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use VorbereitungCustomerReview\Service\VorbereitungCustomerReviewService;
use VorbereitungCustomerReview\Service\ReviewValidationService;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class ReviewController extends StorefrontController
{
    public function __construct(private readonly VorbereitungCustomerReviewService $reviewService, private readonly ReviewValidationService $validationService)
    {
    }

    #[Route(
        path: '/customer-review/list',
        name: 'frontend.review.list',
        defaults: ['_csrf_protected' => true, 'XmlHttpRequest' => true],
        methods: ['GET']
    )]
    public function list(Context $context): JsonResponse
    {
        return $this->reviewService->getReviews($context);
    }

    #[Route(
        path: '/customer-review/save',
        name: 'frontend.review.save',
        defaults: ['_csrf_protected' => true, 'XmlHttpRequest' => true],
        methods: ['POST']
    )]
    public function save(Request $request, Context $context): JsonResponse
    {
        $data = $request->request->all();

        if ($error = $this->validationService->validateCookieConsent()) {
            return $error;
        }

        if ($error = $this->validationService->validateInput($data)) {
            return $error;
        }

        return $this->reviewService->saveReview($data, $context);
    }
}

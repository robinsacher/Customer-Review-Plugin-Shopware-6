<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Core\Content\VorbereitungCustomerReview;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(VorbereitungCustomerReviewEntity $entity)
 * @method void set(string $key, VorbereitungCustomerReviewEntity $entity)
 * @method VorbereitungCustomerReviewEntity[] getIterator()
 * @method VorbereitungCustomerReviewEntity[] getElements()
 * @method VorbereitungCustomerReviewEntity|null get(string $key)
 * @method VorbereitungCustomerReviewEntity|null first()
 * @method VorbereitungCustomerReviewEntity|null last()
 */
class VorbereitungCustomerReviewCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return VorbereitungCustomerReviewEntity::class;
    }
}

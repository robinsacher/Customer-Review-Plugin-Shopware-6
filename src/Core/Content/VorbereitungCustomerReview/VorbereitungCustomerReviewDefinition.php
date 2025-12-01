<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Core\Content\VorbereitungCustomerReview;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;

class VorbereitungCustomerReviewDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'vorbereitung_customer_review';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return VorbereitungCustomerReviewEntity::class;
    }

    public function getCollectionClass(): string
    {
        return VorbereitungCustomerReviewCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new IntField('stars', 'stars'))->addFlags(new Required()),
            new LongTextField('comment', 'comment'),
            (new StringField('email', 'email'))->addFlags(new Required()),
            (new BoolField('active', 'active'))->addFlags(new Required()),
            new DateTimeField('created_at', 'createdAt'),
            new DateTimeField('updated_at', 'updatedAt'),
        ]);
    }
}

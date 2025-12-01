<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1757330932CreateVorbereitungCustomerReviewTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1757330932;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `vorbereitung_customer_review` (
            `id` BINARY(16) NOT NULL,
            `stars` TINYINT UNSIGNED NOT NULL, -- Bewertung (1–5 Sterne)
            `comment` LONGTEXT COLLATE utf8mb4_unicode_ci NULL,
            `email` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `created_at` DATETIME(3) NOT NULL,
            `updated_at` DATETIME(3) NULL,
            PRIMARY KEY (`id`)
        )
        ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
        $connection->executeStatement('DROP TABLE IF EXISTS `vorbereitung_customer_review`;');
    }
}

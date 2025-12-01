<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1757490067 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1757490067;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement("
            ALTER TABLE `vorbereitung_customer_review`
            ADD COLUMN `active` TINYINT(1) NOT NULL DEFAULT 1 AFTER `email`;
        ");
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}

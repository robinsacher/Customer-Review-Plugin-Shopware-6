<?php declare(strict_types=1);

namespace VorbereitungCustomerReview\Core\Content\VorbereitungCustomerReview;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class VorbereitungCustomerReviewEntity extends Entity
{
    use EntityIdTrait;

    protected $stars;
    protected $comment;
    protected $email;
    protected $active;

    public function getStars(): int { return (int) $this->stars; }
    public function setStars(int $stars): void { $this->stars = $stars; }

    public function getComment(): ?string { return $this->comment; }
    public function setComment(?string $comment): void { $this->comment = $comment; }

    public function getEmail(): string { return (string) $this->email; }
    public function setEmail(string $email): void { $this->email = $email; }

    public function isActive(): bool { return (bool) $this->active; }
    public function setActive(bool $active): void { $this->active = $active; }
}

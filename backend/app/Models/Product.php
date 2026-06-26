<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'part_no', 'brand_id', 'category_id',
        'mrp', 'selling_price', 'current_stock', 'seller_stock',
        'image', 'description', 'specifications', 'features',
        'warranty', 'usage_application', 'technical_details', 'is_active',
    ];

    protected $casts = [
        'specifications'   => 'array',
        'features'         => 'array',
        'technical_details'=> 'array',
        'mrp'              => 'float',
        'selling_price'    => 'float',
    ];

    // ── Relationships ─────────────────────────────────────────────────────────

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function enrichment(): HasOne
    {
        return $this->hasOne(ProductEnrichment::class)->where('status', 'approved')->latest();
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeB2cVisible(Builder $query): Builder
    {
        return $query
            ->where('current_stock', '>=', 1)
            ->where('seller_stock', 0)
            ->where('is_active', true);
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (!$term) return $query;

        return $query->where(function (Builder $q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
              ->orWhere('part_no', 'like', "%{$term}%");
        });
    }

    public function scopeForCategory(Builder $query, ?string $category): Builder
    {
        if (!$category) return $query;

        return $query->whereHas('category', fn ($q) =>
            $q->where('slug', $category)->orWhere('id', $category)
        );
    }

    public function scopeForBrand(Builder $query, ?string $brand): Builder
    {
        if (!$brand) return $query;

        return $query->whereHas('brand', fn ($q) =>
            $q->where('slug', $brand)->orWhere('id', $brand)
        );
    }
}

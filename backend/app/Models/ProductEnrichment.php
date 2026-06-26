<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductEnrichment extends Model
{
    protected $fillable = [
        'product_id', 'description', 'specifications', 'features',
        'warranty', 'usage_application', 'technical_details',
        'source', 'status', 'enriched_by', 'enriched_at',
    ];

    protected $casts = [
        'specifications'   => 'array',
        'features'         => 'array',
        'technical_details'=> 'array',
        'enriched_at'      => 'datetime',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

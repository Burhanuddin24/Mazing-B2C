<?php

namespace App\Http\Resources\B2C;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // enrichment is only eager-loaded on the detail endpoint; null-safe otherwise
        $enrichment = $this->relationLoaded('enrichment') ? $this->enrichment : null;

        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'slug'              => $this->slug,
            'part_no'           => $this->part_no,
            'brand'             => $this->brand?->name,
            'brand_slug'        => $this->brand?->slug,
            'category'          => $this->category?->name,
            'category_slug'     => $this->category?->slug,
            'mrp'               => $this->mrp,
            'selling_price'     => $this->selling_price,
            'discount_percent'  => $this->mrp && $this->mrp > $this->selling_price
                ? round((($this->mrp - $this->selling_price) / $this->mrp) * 100)
                : null,
            'current_stock'     => $this->current_stock,
            'image'             => $this->image,
            'description'       => $this->description,
            'specifications'    => $this->specifications,
            'features'          => $this->features,
            'warranty'          => $this->warranty,
            'usage_application' => $this->usage_application,
            'technical_details' => $this->technical_details,
            'enrichment'        => $enrichment ? [
                'description'       => $enrichment->description,
                'specifications'    => $enrichment->specifications,
                'features'          => $enrichment->features,
                'warranty'          => $enrichment->warranty,
                'usage_application' => $enrichment->usage_application,
                'technical_details' => $enrichment->technical_details,
                'source'            => $enrichment->source,
            ] : null,
        ];
    }
}

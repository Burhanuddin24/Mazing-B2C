<?php

namespace App\Http\Controllers\Api\B2C;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * GET /api/b2c/categories
     * All active categories with their B2C product count.
     */
    public function index(): JsonResponse
    {
        $categories = Category::where('is_active', true)
            ->withCount(['products as product_count' => function ($query) {
                $query->where('current_stock', '>=', 1)
                      ->where('seller_stock', 0)
                      ->where('is_active', true);
            }])
            ->orderBy('name')
            ->get()
            ->filter(fn ($cat) => $cat->product_count > 0)
            ->values()
            ->map(fn ($cat) => [
                'id'            => $cat->id,
                'name'          => $cat->name,
                'slug'          => $cat->slug,
                'image'         => $cat->image,
                'product_count' => $cat->product_count,
            ]);

        return response()->json([
            'success' => true,
            'data'    => $categories,
        ]);
    }
}

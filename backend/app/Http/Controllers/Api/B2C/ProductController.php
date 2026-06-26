<?php

namespace App\Http\Controllers\Api\B2C;

use App\Http\Controllers\Controller;
use App\Http\Resources\B2C\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET /api/b2c/products
     * List all B2C-visible products with search, filter, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->per_page ?? 20), 100);

        $products = Product::query()
            ->with(['brand', 'category'])
            ->b2cVisible()
            ->search($request->search)
            ->forCategory($request->category)
            ->forBrand($request->brand)
            ->orderBy('name')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data'    => ProductResource::collection($products)->response()->getData(true),
        ]);
    }

    /**
     * GET /api/b2c/products/{slug}
     * Single product detail page data.
     */
    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['brand', 'category', 'enrichment'])
            ->b2cVisible()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data'    => new ProductResource($product),
        ]);
    }
}

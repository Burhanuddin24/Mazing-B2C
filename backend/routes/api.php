<?php

use App\Http\Controllers\Api\B2C\CategoryController;
use App\Http\Controllers\Api\B2C\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| B2C API Routes — Opel Tools
|--------------------------------------------------------------------------
| All routes are public (no auth required for Phase 1).
| Products returned only where: current_stock >= 1 AND seller_stock = 0
*/

Route::prefix('b2c')->name('b2c.')->group(function () {
    Route::get('/products',           [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{slug}',    [ProductController::class, 'show'])->name('products.show');
    Route::get('/categories',         [CategoryController::class, 'index'])->name('categories.index');
});

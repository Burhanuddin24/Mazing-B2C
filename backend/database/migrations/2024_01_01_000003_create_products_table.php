<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('part_no')->nullable()->index();
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->decimal('mrp', 10, 2)->nullable();
            $table->decimal('selling_price', 10, 2)->default(0);
            $table->integer('current_stock')->default(0);
            $table->integer('seller_stock')->default(0);
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->json('specifications')->nullable();
            $table->json('features')->nullable();
            $table->text('warranty')->nullable();
            $table->text('usage_application')->nullable();
            $table->json('technical_details')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // B2C visibility index: current_stock >= 1 AND seller_stock = 0
            $table->index(['current_stock', 'seller_stock', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

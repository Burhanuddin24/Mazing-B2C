<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_enrichments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->text('description')->nullable();
            $table->json('specifications')->nullable();
            $table->json('features')->nullable();
            $table->text('warranty')->nullable();
            $table->text('usage_application')->nullable();
            $table->json('technical_details')->nullable();
            $table->enum('source', ['admin', 'ai', 'web'])->default('admin');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('enriched_by')->nullable();
            $table->timestamp('enriched_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_enrichments');
    }
};

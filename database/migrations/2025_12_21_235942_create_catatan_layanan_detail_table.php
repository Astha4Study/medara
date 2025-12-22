<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('catatan_layanan_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catatan_layanan_id')->constrained('catatan_layanan')->cascadeOnDelete();
            $table->foreignId('layanan_id')->constrained('layanan')->restrictOnDelete();
            $table->unsignedInteger('qty')->default(1);
            $table->timestamps();
            
            $table->unique(
                ['catatan_layanan_id', 'layanan_id'],
                'catatan_layanan_layanan_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_layanan_detail');
    }
};

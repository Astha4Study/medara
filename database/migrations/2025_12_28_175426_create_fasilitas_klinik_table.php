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
        Schema::create('fasilitas_klinik', function (Blueprint $table) {
    $table->id();
    $table->foreignId('klinik_id')->constrained('klinik')->onDelete('cascade');
    $table->foreignId('fasilitas_id')->constrained('fasilitas')->onDelete('cascade');
    $table->unique(['klinik_id', 'fasilitas_id']);
    $table->timestamps();


        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fasilitas_klinik');
    }
};

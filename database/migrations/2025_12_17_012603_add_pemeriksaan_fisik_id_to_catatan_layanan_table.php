<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('catatan_layanan', function (Blueprint $table) {
            $table->foreignId('pemeriksaan_fisik_id')->after('id')->constrained('pemeriksaan_fisik')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('catatan_layanan', function (Blueprint $table) {
            $table->dropForeign(['pemeriksaan_fisik_id']);
            $table->dropColumn('pemeriksaan_fisik_id');
        });
    }
};

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
        Schema::table('klinik', function (Blueprint $table) {
            $table->boolean('punya_resepsionis')->default(false)->after('kapasitas_tersedia');
            $table->boolean('punya_dokter')->default(false)->after('punya_resepsionis');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('klinik', function (Blueprint $table) {
            $table->dropColumn(['punya_resepsionis', 'punya_dokter']);
        });
    }
};

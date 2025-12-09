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
            $table->string('sumber_input')->nullable()->after('id');

            $table->string('nomor_pasien')->nullable()->after('antrian_id');

            // add foreign key
            $table->foreign('nomor_pasien')->references('nomor_pasien')->on('pasien')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('catatan_layanan', function (Blueprint $table) {
            $table->dropForeign(['nomor_pasien']);
            $table->dropColumn(['nomor_pasien', 'sumber_input']);
        });
    }
};

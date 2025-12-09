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
            $table->boolean('punya_server')->default(false)->after('punya_apoteker');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('klinik', function (Blueprint $table) {
            $table->dropColumn('punya_server');
        });
    }
};

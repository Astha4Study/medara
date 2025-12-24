<?php

use App\Http\Controllers\AdminAddResepsionisAndApotekerAndDoktorController;
use App\Http\Controllers\AdminKlinikController;
use App\Http\Controllers\AdminLayananController;
use App\Http\Controllers\AdminPengaturanController;
use App\Http\Controllers\AdminPengaturanKlinikController;
use App\Http\Controllers\ApotekerKlinikController;
use App\Http\Controllers\ApotekerObatController;
use App\Http\Controllers\ApotekerPenyerahanObatController;
use App\Http\Controllers\ApotekerResepController;
use App\Http\Controllers\ApotekerResepDetailController;
use App\Http\Controllers\ApotekerResepMasukController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientKlinikController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DokterAntrianController;
use App\Http\Controllers\DokterCatatanLayananController;
use App\Http\Controllers\DokterFinalStoreCatatanLayananController;
use App\Http\Controllers\DokterFinalStoreResepAndCatatanLayananController;
use App\Http\Controllers\DokterKlinikController;
use App\Http\Controllers\DokterPasienController;
use App\Http\Controllers\DokterResepController;
use App\Http\Controllers\DokterTanganiController;
use App\Http\Controllers\ResepsionisAntrianController;
use App\Http\Controllers\ResepsionisKlinikController;
use App\Http\Controllers\ResepsionisPasienController;
use App\Http\Controllers\ResepsionisPembayaranController;
use App\Http\Controllers\ResepsionisStoreAntrianAndPemeriksaanFisikController;
use App\Http\Controllers\SuperAdminAddAdminController;
use App\Http\Controllers\SuperAdminKlinikController;
use App\Http\Controllers\SuperAdminPasienController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ClientController::class, 'index'])->name('home');
Route::get('/klinik/{slug}', [ClientKlinikController::class, 'show'])
    ->name('klinik.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);

    Route::middleware(['auth', 'role:super_admin'])
        ->prefix('super-admin')
        ->as('super_admin.')
        ->group(function () {
            Route::resource('klinik', SuperAdminKlinikController::class)->only(['index', 'show']);
            Route::resource('pasien', SuperAdminPasienController::class)->only(['index', 'show']);
            Route::resource('kelola-admin', SuperAdminAddAdminController::class)
                ->parameters(['kelola-admin' => 'admin'])
                ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['auth', 'role:admin'])
        ->prefix('admin')
        ->as('admin.')
        ->group(function () {
            Route::resource('klinik', AdminKlinikController::class)
                ->parameters(['klinik' => 'klinik'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::resource('tambah-user', AdminAddResepsionisAndApotekerAndDoktorController::class)
                ->parameters(['tambah-user' => 'user'])
                ->names('users')
                ->only(['index', 'create', 'store', 'destroy']);
            Route::resource('users', AdminAddResepsionisAndApotekerAndDoktorController::class)
                ->parameters(['users' => 'user'])
                ->only(['show', 'edit', 'update']);
            Route::resource('layanan', AdminLayananController::class)
                ->parameters(['layanan' => 'layanan'])
                ->only(['index', 'create', 'show', 'edit', 'store', 'update', 'destroy']);
            Route::get('/pengaturan', [AdminPengaturanController::class, 'index'])
                ->name('pengaturan.index');
            Route::put('/pengaturan/update', [AdminPengaturanKlinikController::class, 'update'])
                ->name('pengaturan.update');
        });

    Route::middleware(['auth', 'role:resepsionis'])
        ->prefix('resepsionis')
        ->as('resepsionis.')
        ->group(function () {
            Route::resource('klinik', ResepsionisKlinikController::class)
                ->parameters(['klinik' => 'klinik'])
                ->only(['index', 'edit', 'update']);
            Route::resource('pasien', ResepsionisPasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::get('antrian/create/pasien/{pasien}', [ResepsionisAntrianController::class, 'createForPasien'])
                ->name('antrian.createForPasien');
            Route::resource('antrian', ResepsionisAntrianController::class)
                ->parameters(['antrian' => 'antrian'])
                ->only(['index', 'edit', 'update', 'destroy']);
            Route::post(
                'antrian/create/pasien/{pasien}',
                [ResepsionisStoreAntrianAndPemeriksaanFisikController::class, 'store']
            )->name('antrian.store');
            Route::get('pembayaran/{resep}/proses-bayar', [ResepsionisPembayaranController::class, 'edit'])
                ->name('pembayaran.proses-bayar');
            Route::put('pembayaran/{resep}', [ResepsionisPembayaranController::class, 'update'])
                ->name('pembayaran.update');
            Route::get('pembayaran', [ResepsionisPembayaranController::class, 'index'])
                ->name('pembayaran.index');
        });

    Route::middleware(['auth', 'role:dokter'])
        ->prefix('dokter')
        ->as('dokter.')
        ->group(function (): void {
            Route::resource('klinik', DokterKlinikController::class)
                ->only(['index']);
            Route::resource('pasien', DokterPasienController::class)
                ->only(['index', 'show']);
            Route::resource('antrian', DokterAntrianController::class)
                ->parameters(['antrian' => 'antrian'])
                ->only(['index', 'update']);
            Route::get('catatan-layanan', [DokterCatatanLayananController::class, 'index'])
                ->name('catatan-layanan.index');
            Route::get('catatan-layanan/{id}', [DokterCatatanLayananController::class, 'show'])
                ->name('catatan-layanan.show');
            Route::get('antrian/{antrian}/tangani', [DokterTanganiController::class, 'create'])
                ->name('tangani.create');
            Route::get('catatan-layanan', [DokterCatatanLayananController::class, 'index'])
                ->name('catatan-layanan.index');
            Route::post('antrian/{antrian}/tangani', [DokterCatatanLayananController::class, 'store'])
                ->name('tangani.store');
            Route::get('antrian/{antrian}/resep/create', [DokterResepController::class, 'create'])
                ->name('resep.create');
            Route::post('store-final', [DokterFinalStoreResepAndCatatanLayananController::class, 'storeFinal'])
                ->name('resep.store-final');
            Route::post('final-store', [DokterFinalStoreCatatanLayananController::class, 'FinalStore'])
                ->name('resep.final-store');
        });

    Route::middleware(['auth', 'role:apoteker'])
        ->prefix('apoteker')
        ->as('apoteker.')
        ->group(function (): void {
            Route::resource('klinik', ApotekerKlinikController::class)
                ->only(['index']);
            Route::resource('daftar-obat', ApotekerObatController::class)
                ->parameters(['daftar-obat' => 'obat'])
                ->names('daftarobat')
                ->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::resource('resep-masuk', ApotekerResepMasukController::class)
                ->only('index', 'edit', 'update')
                ->parameters(['resep-masuk' => 'resep']);
            Route::put('resep-masuk/{resep}/mulai', [ApotekerResepController::class, 'update'])
                ->name('resep-masuk.mulai');
            Route::resource('penyerahan-obat', ApotekerPenyerahanObatController::class)
                ->parameters(['penyerahan-obat' => 'serahkan'])
                ->only('index');
            Route::get('penyerahan-obat/{resep}/serahkan', [ApotekerPenyerahanObatController::class, 'edit'])
                ->name('penyerahan-obat.edit');
            Route::patch('penyerahan-obat/{resep}', [ApotekerPenyerahanObatController::class, 'update'])
                ->name('penyerahan-obat.update');
            Route::post('resep-masuk/{resep}/detail', [ApotekerResepDetailController::class, 'store'])
                ->name('resep-detail.store');
        });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

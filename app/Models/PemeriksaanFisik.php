<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PemeriksaanFisik extends Model
{
    use HasFactory;

    protected $table = 'pemeriksaan_fisik';

    protected $fillable = [
        'pasien_id',
        'klinik_id',
        'berat_badan',
        'tinggi_badan',
        'suhu_tubuh',
        'tekanan_darah',
        'kondisi_khusus',
    ];

    public function pasien()
    {
        $this->belongsTo(Pasien::class);
    }

    public function klinik()
    {
        $this->belongsTo(Klinik::class);
    }
}

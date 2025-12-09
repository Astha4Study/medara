<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatatanLayanan extends Model
{
    use HasFactory;

    protected $table = 'catatan_layanan';

    protected $fillable = [
        'sumber_input',
        'pasien_id',
        'klinik_id',
        'dokter_id',
        'antrian_id',
        'nomor_pasien',
        'tanggal_kunjungan',
        'keluhan_utama',
        'detail_keluhan',
        'diagnosa',
        'tindakan',
        'catatan_lain'
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }

    public function nomorPasien()
    {
        return $this->belongsTo(Pasien::class, 'nomor_pasien', 'nomor_pasien');
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class, 'klinik_id');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_id');
    }

    public function antrian()
    {
        return $this->belongsTo(Antrian::class, 'antrian_id');
    }

    // public function resep()
    // {
    //     return $this->hasOne(Resep::class, 'catatan_layanan_id');
    // }

}

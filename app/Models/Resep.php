<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resep extends Model
{
    use HasFactory;

    protected $table = 'resep';

    protected $fillable = [
        'catatan_layanan_id',
        'pasien_id',
        'klinik_id',
        'dokter_id',
        'apoteker_id',
        'resep_teks',
        'status',
        'total_harga',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_id');
    }

    public function apoteker()
    {
        return $this->belongsTo(User::class, 'apoteker_id');
    }

    public function resepDetail()
    {
        return $this->hasMany(ResepDetail::class, 'resep_id');
    }

    public function catatanLayanan()
    {
        return $this->belongsTo(CatatanLayanan::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasilitasKlinik extends Model
{
    use HasFactory;

    protected $table = 'fasilitas_klinik';

    protected $fillable = [
        'klinik_id',
        'nama_fasilitas',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}

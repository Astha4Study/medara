<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;

    protected $table = 'dokter';

    protected $fillable = [
        'user_id',
        'klinik_id',
        'status',
        'antrian_saat_ini',
        'max_antrian_per_hari',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    public function antrian()
    {
        return $this->hasMany(Antrian::class);
    }
}

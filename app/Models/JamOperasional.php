<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JamOperasional extends Model
{
    use HasFactory;

    protected $table = 'jam_operasional';

    protected $fillable = [
        'klinik_id',
        'hari',
        'jam_buka',
        'jam_tutup',
        'tutup',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }
}

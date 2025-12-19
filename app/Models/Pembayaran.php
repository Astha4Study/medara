<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';

    protected $fillable = [
        'klinik_id',
        'resep_id',
        'resepsionis_id',
        'total_bayar',
        'status',
    ];

    public function resep()
    {
        return $this->belongsTo(Resep::class, 'resep_id', 'id');
    }

    public function resepsionis()
    {
        return $this->belongsTo(User::class, 'resepsionis_id', 'id');
    }

    public function detail()
    {
        return $this->hasOne(PembayaranDetail::class);
    }
}

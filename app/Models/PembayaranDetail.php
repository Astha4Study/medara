<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PembayaranDetail extends Model
{
    use HasFactory;

    protected $table = 'pembayaran_detail';

    protected $fillable = [
        'pembayaran_id',
        'uang_dibayar',
        'kembalian',
        'metode_pembayaran',
    ];

    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class);
    }
}

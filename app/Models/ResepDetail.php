<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResepDetail extends Model
{
    use HasFactory;

    protected $table = 'resep_detail';

    protected $fillable = [
        'resep_id',
        'obat_id',
        'jumlah',
        'harga_satuan'
    ];

    public function resep()
    {
        return $this->belongsTo(Resep::class, 'resep_id');
    }

    public function obat()
    {
        return $this->belongsTo(Obat::class, 'obat_id');
    }
}

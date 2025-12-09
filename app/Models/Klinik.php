<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Klinik extends Model
{
    use HasFactory;

    protected $table = 'klinik';

    protected $fillable = [
        'kode_klinik',
        'nama_klinik',
        'jenis_klinik',
        'alamat',
        'kota',
        'provinsi',
        'no_telepon',
        'email',
        'deskripsi',
        'latitude',
        'longitude',
        'gambar',
        'rating',
        'kapasitas_total',
        'kapasitas_tersedia',
        'punya_apoteker',
        'punya_server',
        'created_by',
    ];

    protected $casts = [
        'punya_apoteker' => 'boolean',
    ];


    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pasien()
    {
        return $this->hasMany(Pasien::class);
    }


    public function getGambarUrlAttribute()
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }

    public function hapusGambarLama()
    {
        if ($this->gambar && Storage::disk('public')->exists($this->gambar)) {
            Storage::disk('public')->delete($this->gambar);
        }
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($klinik) {
            if (!$klinik->kode_klinik && $klinik->nama_klinik) {
                $words = explode(' ', $klinik->nama_klinik);
                $initials = '';
                foreach ($words as $word) {
                    if (ctype_alpha($word[0])) {
                        $initials .= strtoupper($word[0]);
                    }
                }
                $klinik->kode_klinik = $initials;
            }
        });

    }


}

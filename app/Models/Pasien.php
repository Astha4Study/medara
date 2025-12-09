<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Pasien extends Model
{
    use HasFactory;

    protected $table = 'pasien';

    protected $fillable = [
        'nomor_pasien',
        'nama_lengkap',
        'nik',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'alamat',
        'no_hp',
        'golongan_darah',
        'riwayat_penyakit',
        'alergi',
        'klinik_id',
        'created_by',
    ];

    protected $appends = ['umur', 'tanggal_lahir_format'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getUmurAttribute()
    {
        return $this->tanggal_lahir ? Carbon::parse($this->tanggal_lahir)->age : null;
    }

    public function getTanggalLahirFormatAttribute()
    {
        return $this->tanggal_lahir
            ? Carbon::parse($this->tanggal_lahir)->translatedFormat('d F Y')
            : '-';
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($pasien) {
            $user = Auth::user();

            if ($user && $user->hasRole('admin')) {
                $klinik = Klinik::where('created_by', $user->id)->first();
                if ($klinik) {
                    $pasien->klinik_id = $klinik->id;
                }
            }

            $klinik = Klinik::find($pasien->klinik_id);

            if (!$klinik) {
                throw new \Exception('Klinik tidak ditemukan, nomor pasien gagal dibuat.');
            }

            if (!$klinik->kode_klinik) {
                throw new \Exception('Kode klinik belum diisi, nomor pasien gagal dibuat.');
            }

            $tanggal = now()->format('Ymd');

            $last = self::where('klinik_id', $pasien->klinik_id)
                ->whereDate('created_at', now()->toDateString())
                ->orderBy('id', 'desc')
                ->first();

            $next = $last
                ? intval(substr($last->nomor_pasien, -4)) + 1
                : 1;

            $pasien->nomor_pasien = "{$klinik->kode_klinik}-{$tanggal}-" . str_pad($next, 4, '0', STR_PAD_LEFT);
        });
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ObatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_obat' => 'required|string|max:100',
            'jenis_obat' => 'required|in:tablet,kapsul,sachet,sirup,injeksi,salep',
            'satuan' => 'required|in:strip,sachet,box,botol,ampul,tube',
            'stok' => 'required|integer|min:0',
            'harga' => 'required|integer|min:0',
            'penggunaan_obat' => 'required|string|max:2000',
        ];
    }
}

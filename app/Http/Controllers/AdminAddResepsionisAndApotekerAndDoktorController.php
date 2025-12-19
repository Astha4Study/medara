<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminAddResepsionisAndApotekerAndDoktorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Auth::user();

        $users = User::where('created_by', $admin->id)
            ->with('roles')
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'roles' => $u->getRoleNames(),
                ];
            });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'role' => 'admin',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $admin = Auth::user();

        if (! $admin->klinik_id) {
            return redirect('/admin/klinik')
                ->with('error', 'Anda harus membuat fasilitas klinik terlebih dahulu sebelum menambahkan user.');
        }

        $klinik = $admin->klinik;

        $availableRoles = ['resepsionis', 'dokter'];

        if ($klinik && $klinik->punya_apoteker) {
            $availableRoles[] = 'apoteker';
        }

        return Inertia::render('Admin/Users/Create', [
            'availableRoles' => $availableRoles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $admin = Auth::user();
        $role = $request->role;

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:resepsionis,dokter,apoteker',
            'max_antrian_per_hari' => 'nullable|integer|min:1|max:50',
        ]);

        $role = $validated['role'];

        $klinikId = $admin->klinik_id;

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'klinik_id' => $klinikId,
            'created_by' => $admin->id,
        ]);

        $user->assignRole($role);

        if ($role === 'dokter') {
            Dokter::create([
                'user_id' => $user->id,
                'klinik_id' => $klinikId,
                'status' => 'tersedia',
                'antrian_saat_ini' => 0,
                'max_antrian_per_hari' => $validated['max_antrian_per_hari'] ?? 7,
            ]);
        }

        return redirect()->route('admin.users.index')
            ->with('success', ucfirst($role).' berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // $admin = Auth::user();
        // $user = User::findOrFail($id);

        // if ($user->created_by !== $admin->id) {
        //     abort(403, 'Anda tidak boleh mengedit user ini.');
        // }

        // return Inertia::render('Admin/Users/Edit', [
        //     'user' => $user,
        //     'role' => $user->getRoleNames()->first(),
        //     'dokter' => $user->dokter ?? null,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $admin = Auth::user();
        $user = User::findOrFail($id);

        if ($user->created_by !== $admin->id) {
            abort(403, 'Anda tidak boleh mengedit user ini.');
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:resepsionis,dokter,apoteker',
            'max_antrian_per_hari' => 'nullable|integer|min:1|max:50',
        ]);

        $role = $validated['role'];

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        if ($user->hasRole('dokter')) {
            $user->dokter->update([
                'max_antrian_per_hari' => $validated['max_antrian_per_hari'],
            ]);
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Auth::user();
        $user = User::findOrFail($id);

        if ($user->created_by !== $admin->id) {
            abort(403, 'Anda tidak boleh menghapus user ini.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil dihapus.');
    }
}

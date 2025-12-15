<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SuperAdminAddAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (! $user->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        $admins = User::role('admin')->get();

        return Inertia::render('SuperAdmin/Admins/Index', [
            'admins' => $admins->map(fn ($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'email' => $a->email,
                'created_at' => $a->created_at->format('d M Y'),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (! Auth::user()->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        return Inertia::render('SuperAdmin/Admins/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (! $user->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:8',
        ]);

        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'created_by' => $user->id,
        ]);

        $admin->assignRole('admin');

        return redirect()->route('super_admin.kelola-admin.index')->with('success', 'Admin berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = User::findOrFail($id);

        if (! Auth::user()->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        if (! $admin->hasRole('admin')) {
            abort(403, 'Data bukan admin.');
        }

        return Inertia::render('SuperAdmin/Admins/Show', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'created_at' => $admin->created_at->format('d M Y'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $admin = User::findOrFail($id);

        if (! Auth::user()->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        if (! $admin->hasRole('admin')) {
            abort(403, 'Hanya admin yang bisa diedit.');
        }

        return Inertia::render('SuperAdmin/Admins/Edit', [
            'admin' => $admin,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $admin = User::findOrFail($id);

        if (! Auth::user()->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'nullable|string|min:8',
        ]);

        $admin->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $admin->password,
        ]);

        return redirect()->route('super_admin.kelola-admin.index')->with('success', 'Admin berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $admin = User::findOrFail($id);

        if (! Auth::user()->hasRole('super_admin')) {
            abort(403, 'Akses ditolak.');
        }

        if (! $admin->hasRole('admin')) {
            abort(403, 'Hanya admin yang bisa dihapus.');
        }

        $admin->delete();

        return redirect()->route('super_admin.kelola-admin.index')->with('success', 'Admin berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\BugReports;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminBugReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $bugReports = BugReports::with('klinik')
            ->where('klinik_id', $user->klinik_id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/BugReports/Index', [
            'bugReports' => $bugReports,
            'klinik' => $user->klinik,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        if (! $user->klinik_id) {
            return redirect('/admin/klinik')
                ->with('error', 'Anda harus membuat fasilitas klinik terlebih dahulu sebelum melaporkan bug.');
        }

        return Inertia::render('Admin/BugReports/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'dampak_pelapor' => 'required|in:rendah,sedang,tinggi',
        ]);

        BugReports::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'dampak_pelapor' => $validated['dampak_pelapor'],
            'klinik_id' => auth()->user()->klinik_id,
            'reported_by' => auth()->id(),
            'status' => 'dibuka',
            'prioritas' => 'sedang',
        ]);

        return redirect()
            ->route('admin.bug-reports.index')
            ->with('success', 'Laporan bug berhasil dikirim');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bug = BugReports::with(['klinik', 'pelapor'])
            ->where('klinik_id', auth()->user()->klinik_id)
            ->findOrFail($id);

        return Inertia::render('Admin/BugReports/Show', [
            'bug' => $bug,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bug = BugReports::where('klinik_id', auth()->user()->klinik_id)
            ->where('status', 'dibuka')
            ->findOrFail($id);

        $bug->update([
            'status' => 'dibatalkan',
        ]);

        return redirect()
            ->route('admin.bug-reports.index')
            ->with('success', 'Laporan bug berhasil dibatalkan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

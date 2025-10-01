<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = env('FIREBASE_BASE_URL');
        $this->apiKey = env('FIREBASE_API_KEY');
    }

    // GET all books
    public function index()
    {
        $response = Http::get("{$this->baseUrl}/books?key={$this->apiKey}");
        if ($response->failed()) {
            return response()->json(['error' => 'Gagal ambil data'], 500);
        }

        $data = $response->json();
        $books = [];

        if (isset($data['documents'])) {
            foreach ($data['documents'] as $doc) {
                $fields = $doc['fields'];
                $books[] = [
                    'id' => basename($doc['name']),
                    'nama' => $fields['nama']['stringValue'] ?? '',
                    'penulis' => $fields['penulis']['stringValue'] ?? '',
                    'kategori' => $fields['kategori']['stringValue'] ?? '',
                    'rating' => $fields['rating']['stringValue'] ?? '',
                    'status' => $fields['status']['stringValue'] ?? 'Draft',
                    'deskripsi' => $fields['deskripsi']['stringValue'] ?? '',
                    'coverImage' => $fields['coverImage']['stringValue'] ?? null,
                ];
            }
        }

        return response()->json($books);
    }

    // CREATE
    // CREATE
    public function store(Request $request)
    {
        $coverUrl = null;
        if ($request->hasFile('coverImage')) {
            $file = $request->file('coverImage');
            $filename = time() . '_' . $file->getClientOriginalName();

            // simpan ke public/uploads/covers
            $path = public_path('uploads/covers');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            $file->move($path, $filename);
            $coverUrl = url('uploads/covers/' . $filename);
        }

        $data = [
            "fields" => [
                "nama" => ["stringValue" => $request->nama],
                "penulis" => ["stringValue" => $request->penulis],
                "kategori" => ["stringValue" => $request->kategori],
                "rating" => ["stringValue" => $request->rating],
                "status" => ["stringValue" => $request->status ?? "Draft"],
                "deskripsi" => ["stringValue" => $request->deskripsi],
                "coverImage" => ["stringValue" => $coverUrl ?? ""],
            ]
        ];

        $response = Http::post("{$this->baseUrl}/books?key={$this->apiKey}", $data);

        return $response->json();
    }


    // UPDATE
    public function update(Request $request, $id)
    {
        $bookRef = "{$this->baseUrl}/books/{$id}?key={$this->apiKey}";

        $coverUrl = null;
        if ($request->hasFile('coverImage')) {
            $file = $request->file('coverImage');
            $filename = time() . '_' . $file->getClientOriginalName();

            $path = public_path('uploads/covers');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            $file->move($path, $filename);
            $coverUrl = url('uploads/covers/' . $filename);


            if ($request->oldCover) {
                $oldPath = public_path(str_replace(url('/'), '', $request->oldCover));
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        } else {
            $coverUrl = $request->oldCover ?? null;
        }

        $data = [
            "fields" => [
                "nama" => ["stringValue" => $request->nama],
                "penulis" => ["stringValue" => $request->penulis],
                "kategori" => ["stringValue" => $request->kategori],
                "rating" => ["stringValue" => $request->rating],
                "deskripsi" => ["stringValue" => $request->deskripsi],
                "status" => ["stringValue" => $request->status],
                "coverImage" => ["stringValue" => $coverUrl ?? ""],
            ]
        ];

        $response = Http::patch($bookRef, $data);

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal update data'], 500);
        }

        return response()->json(['success' => true]);
    }



    // DELETE
    public function destroy($id, Request $request)
    {
        if ($request->coverImage) {
            $oldFile = str_replace(asset('storage/') . '/', '', $request->coverImage);
            Storage::disk('public')->delete($oldFile);
        }

        $response = Http::delete("{$this->baseUrl}/books/{$id}?key={$this->apiKey}");
        if ($response->failed()) {
            return response()->json(['error' => 'Gagal hapus data'], 500);
        }

        return response()->json(['success' => true]);
    }

    // SHOW (detail buku)
    public function show($id)
    {
        $response = Http::get("{$this->baseUrl}/books/{$id}?key={$this->apiKey}");

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal ambil detail buku'], 500);
        }

        $doc = $response->json();

        if (!isset($doc['fields'])) {
            return response()->json(['error' => 'Data buku tidak ditemukan'], 404);
        }

        $fields = $doc['fields'];

        $book = [
            'id' => $id,
            'nama' => $fields['nama']['stringValue'] ?? '',
            'penulis' => $fields['penulis']['stringValue'] ?? '',
            'kategori' => $fields['kategori']['stringValue'] ?? '',
            'rating' => $fields['rating']['stringValue'] ?? '',
            'status' => $fields['status']['stringValue'] ?? 'Draft',
            'deskripsi' => $fields['deskripsi']['stringValue'] ?? '',
            'coverImage' => $fields['coverImage']['stringValue'] ?? null,
        ];

        return response()->json($book);
    }
}

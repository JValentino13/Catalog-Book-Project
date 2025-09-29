<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
                ];
            }
        }

        return response()->json($books);
    }


    // CREATE new book
    public function store(Request $request)
    {
        $data = [
            "fields" => [
                "nama" => ["stringValue" => $request->nama],
                "penulis" => ["stringValue" => $request->penulis],
                "kategori" => ["stringValue" => $request->kategori],
                "rating" => ["stringValue" => $request->rating],
                "status" => ["stringValue" => "Draft"],
                "deskripsi" => ["stringValue" => $request->deskripsi],
            ]
        ];

        $response = Http::post("{$this->baseUrl}/books?key={$this->apiKey}", $data);

        return $response->json();
    }

    // UPDATE book
    public function update(Request $request, $id)
    {
        $data = [
            "fields" => [
                "nama" => ["stringValue" => $request->nama],
                "penulis" => ["stringValue" => $request->penulis],
                "kategori" => ["stringValue" => $request->kategori],
                "rating" => ["stringValue" => $request->rating],
                "deskripsi" => ["stringValue" => $request->deskripsi],
                "status" => ["stringValue" => $request->status],
            ]
        ];

        $response = Http::patch("{$this->baseUrl}/books/{$id}?key={$this->apiKey}", $data);

        return $response->json();
    }


    // DELETE book
    public function destroy($id)
    {
        $response = Http::delete("{$this->baseUrl}/books/{$id}?key={$this->apiKey}");

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal hapus data'], 500);
        }

        return response()->json(['success' => true]);
    }
}

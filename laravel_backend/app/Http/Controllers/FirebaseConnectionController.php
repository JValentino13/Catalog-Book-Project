<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;
use Illuminate\Support\Facades\Hash;


class FirebaseConnectionController extends Controller
{
    protected $auth, $database;
    public function  __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(storage_path('firebase/firebase.json'))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $factory->createDatabase();
        $this->auth = $factory->createAuth();


        //cara koneksi create database tanpa this
        // $reference = $database -> getReference('Coba Koneksi Firebase');
        // $reference -> set(['connection' => true]);
        // $snapShot = $reference -> getSnapshot();
        // $value = $snapShot -> getValue();
    }

    public function read()
    {
        $ref = $this->database->getReference('fiksi/novel')->getValue();
        $data = [];

        foreach ($ref as $author => $books) {
            foreach ($books as $key => $title) {
                $id = (int)$key;
                $data[] = [
                    "id" => $id,
                    "name" => $title,
                    "author" => $author,
                    "category" => "Novel Fiksi",
                    "price" => "Rp " . (70000 + ($id * 5000)),
                    "image" => "https://via.placeholder.com/150?text="
                ];
            }
        }

        $filteredData = array_filter($data, function ($item) {
            return $item['id'] !== 0 && $item['id'] !== null;
        });
        $filteredData = array_values($filteredData);

        return response()->json($filteredData);
    }


    public function update()
    {
        $ref = $this->database->getReference('fiksi/novel/Tere Liye')
            ->push(["6" => "Pergi"]);
    }

    public function set()
    {
        $ref = $this->database->getReference('fiksi/novel')
            ->set([
                "Tere Liye" => [
                    "1" => "Pulang",
                    "2" => "Bumi Manusia",
                    "3" => "Anak Semua Bangsa",
                    "4" => "Hujan",
                    "5" => "Bintang"
                ]
            ]);
    }

    public function delete()
    {
        /**
         * 1. remove()
         * 2. set(null)
         * 3. update(["key" => null])
         */

        // Mengunakan remove()
        $ref = $this->database->getReference('fiksi/novel')->remove();

        // Menggunakan set(null)
        // $ref = $this->database->getReference('hewan/karnivora/harimau/benggala')
        // ->set(null);

        // Menggunakan update(["key" => null])
        // $ref = $this->database->getReference('hewan/karnivora/harimau')
        // ->update(["benggala" => null]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        $factory = (new Factory)
            ->withServiceAccount(storage_path('storage/firebase/firebase.json'))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $factory->createDatabase();
        $this->auth = $factory->createAuth();

        $newUser = $this->database->getReference('users')->push([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User berhasil didaftarkan',
            'uid' => $newUser->getKey(),
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $users = $this->database->getReference('users')->getValue();

        if (!$users) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan',
            ], 404);
        }

        $userFound = null;
        foreach ($users as $userId => $user) {
            if ($user['email'] === $request->email) {
                $userFound = $user;
                break;
            }
        }

        if (!$userFound) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan',
            ], 401);    
        }

        if (!Hash::check($request->password, $userFound['password'])) {
            return response()->json([
                'success' => false,
                'message' => 'Password salah',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login sukses',
            'data' => [
                'email' => $userFound['email'],
                'name' => $userFound['name'],
                'role' => $userFound['role']
            ]
        ], 200);
    }
}

//NOTE
// __construct = untuk inisialisasi awal, otomatis jalan saat controller diakses. Harus __construct tidak bisa nama lain
// Untuk delete lebih simple menggunakan remove()

<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Exception\Auth\RevokedIdToken;

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
        $ref = $this->database->getReference('hewan/herbivora/domba')->getSnapshot();
        dump($ref);
        $ref = $this->database->getReference('hewan/herbivora')->getValue();
        dump($ref);
        $ref = $this->database->getReference('hewan/karnivora')->getValue();
        dump($ref);
        $ref = $this->database->getReference('hewan/omnivora')->getSnapshot()->exists();
        dump($ref);
    }

    public function update()
    {
        $ref = $this->database->getReference('daftar_buku/fiksi/Novel')
        ->update(["Tere Liye" => "Pergi"]);
    }

    public function set()
    {
        $ref = $this->database->getReference('daftar_buku/fiksi')
        ->set([
            "Novel" => [
                "Tere Liye" => "Pulang",
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
        $ref = $this->database->getReference('daftar_buku/fiksi/Novel')->remove();

        // Menggunakan set(null)
        // $ref = $this->database->getReference('hewan/karnivora/harimau/benggala') 
            // ->set(null);

        // Menggunakan update(["key" => null])
        // $ref = $this->database->getReference('hewan/karnivora/harimau')
            // ->update(["benggala" => null]);
    }
}

//NOTE
// __construct = untuk inisialisasi awal, otomatis jalan saat controller diakses. Harus __construct tidak bisa nama lain
// Untuk delete lebih simple menggunakan remove()

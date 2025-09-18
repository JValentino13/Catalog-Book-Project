<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class FirebaseConnectionController extends Controller
{
    public function index()
    {
        $path = base_path('storage/firebase/firebase.json');

        if (!file_exists($path)) {
            die('Firebase configuration file not found.');
        }
        try {
            $factory = (new Factory)
                ->withServiceAccount($path)
                ->withDatabaseUri('https://catalog-book-9132e-default-rtdb.asia-southeast1.firebasedatabase.app/');

                $database = $factory->createDatabase();
                $reference = $database -> getReference('contacts');
                $reference -> set(['connection' => true]);
                $snapShot = $reference -> getSnapshot();
                $value = $snapShot -> getValue();

                return response([
                    'message' => true,
                    'value' => $value,
                ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to connect to Firebase: ' . $e->getMessage()], 500);
        }
    }
}

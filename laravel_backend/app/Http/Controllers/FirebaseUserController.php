<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class FirebaseUserController extends Controller
{
    protected $database;

    public function __construct()
    {
        $firebase = (new Factory)
            ->withServiceAccount(storage_path('firebase/firebase.json'))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $firebase->createDatabase();
    }

    // Ambil semua user
    public function index()
    {
        $users = $this->database->getReference('users')->getValue();
        return response()->json($users);
    }

    // Ambil user berdasarkan token
    public function show($token)
    {
        $users = $this->database->getReference('users')->getValue();

        foreach ($users as $key => $user) {
            if (isset($user['token']) && $user['token'] === $token) {
                return response()->json($user);
            }
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}

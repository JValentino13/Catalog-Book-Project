<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;



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
            ->withServiceAccount(storage_path('firebase/firebase.json'))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $factory->createDatabase();
        $this->auth = $factory->createAuth();
        $plainTextToken = hash('sha256', Str::random(60));


        // create user
        $newUser = $this->database->getReference('users')->push([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'token' => $plainTextToken,
        ]);

        return response()->json([
            'message' => 'User berhasil didaftarkan',
            'token' => $plainTextToken,
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
                'role' => $userFound['role'],
                'token' => $userFound['token']

            ]
        ], 200);
    }

    public function auth(Request $request)
    {
        $bearerToken = $request->bearerToken();

        if (!$bearerToken) {
            return response()->json([
                'logged_in' => false,
                'message' => 'Token tidak ditemukan',
            ], 401);
        }

        Log::info("Token diterima: " . $bearerToken);
        $users = $this->database->getReference('users')->getValue();

        if (!$users) {
            return response()->json([
                'logged_in' => false,
                'message' => 'Tidak ada user',
            ], 401);
        }

        $userFound = null;
        foreach ($users as $userId => $user) {
            Log::info("Cek token user: " . $user['token']);
            if (isset($user['token']) && trim($user['token']) === trim($bearerToken)) {
                $userFound = $user;
                break;
            }
        }

        if (!$userFound) {
            return response()->json([
                'logged_in' => false,
                'message' => 'Token tidak valid',
            ], 401);
        }

        return response()->json([
            'logged_in' => true,
            'user' => [
                'email' => $userFound['email'],
                'name' => $userFound['name'],
                'role' => $userFound['role'],
            ]
        ], 200);
    }
}

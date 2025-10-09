<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class FirebaseConnectionController extends Controller
{
    /**
     * Mengembalikan instance Firebase Database
     */
    protected function getDatabase()
    {
        // Cek apakah FIREBASE_DATABASE_URL tersedia
        $databaseUrl = env('FIREBASE_DATABASE_URL');
        if (!$databaseUrl) {
            throw new \Exception('FIREBASE_DATABASE_URL is not set in environment variables.');
        }

        // Cek apakah file service account ada
        $serviceAccountPath = storage_path('firebase/firebase.json');
        if (!file_exists($serviceAccountPath)) {
            throw new \Exception("Firebase service account file not found at: {$serviceAccountPath}");
        }

        $factory = (new Factory)
            ->withServiceAccount($serviceAccountPath)
            ->withDatabaseUri($databaseUrl);

        return $factory->createDatabase();
    }

    /**
     * Register user baru
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        try {
            $database = $this->getDatabase();
            $plainTextToken = hash('sha256', Str::random(60));

            $newUser = $database->getReference('users')->push([
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
        } catch (\Exception $e) {
            Log::error('Firebase Register Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mendaftarkan user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        try {
            $database = $this->getDatabase();
            $users = $database->getReference('users')->getValue();

            if (!$users) {
                return response()->json([
                    'success' => false,
                    'message' => 'User tidak ditemukan',
                ], 404);
            }

            $userFound = null;
            foreach ($users as $userId => $user) {
                if (isset($user['email']) && $user['email'] === $request->email) {
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

            if (!Hash::check($request->password, $userFound['password'] ?? '')) {
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
                    'token' => $userFound['token'] ?? null
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Firebase Login Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error saat login: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verifikasi token auth
     */
    public function auth(Request $request)
    {
        $bearerToken = $request->bearerToken();

        if (!$bearerToken) {
            return response()->json([
                'logged_in' => false,
                'message' => 'Token tidak ditemukan',
            ], 401);
        }

        try {
            $database = $this->getDatabase();
            $users = $database->getReference('users')->getValue();

            if (!$users) {
                return response()->json([
                    'logged_in' => false,
                    'message' => 'Tidak ada user',
                ], 401);
            }

            $userFound = null;
            foreach ($users as $userId => $user) {
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
                    'email' => $userFound['email'] ?? null,
                    'name' => $userFound['name'] ?? null,
                    'role' => $userFound['role'] ?? null,
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Firebase Auth Error: ' . $e->getMessage());
            return response()->json([
                'logged_in' => false,
                'message' => 'Error saat verifikasi token: ' . $e->getMessage(),
            ], 500);
        }
    }
}

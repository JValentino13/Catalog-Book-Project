<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FirebaseConnectionController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\FirebaseUserController;

/*
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [FirebaseUserController::class, 'index']);
Route::get('/users/{token}', [FirebaseUserController::class, 'show']);

Route::get('/buku_fiksi', [FirebaseConnectionController::class, 'read']);

//Book CRUD
Route::get('/books', [BookController::class, 'index']);
Route::post('/books', [BookController::class, 'store']);
Route::put('/books/{id}', [BookController::class, 'update']);
Route::delete('/books/{id}', [BookController::class, 'destroy']);
Route::get('/books/{id}', [BookController::class, 'show']);

//User CRUD
Route::post('/register', [FirebaseConnectionController::class, 'register']);
Route::post('/login', [FirebaseConnectionController::class, 'login']);
Route::get('/auth', [FirebaseConnectionController::class, 'auth']);


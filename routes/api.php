<?php

use App\Http\Controllers\Api\SensorController;
use Illuminate\Support\Facades\Route;

// Route untuk ESP32 mengirim data
Route::post('/sensor', [SensorController::class, 'store']);

// Route untuk auto-refresh (tidak perlu autentikasi session)
Route::get('/sensor/latest', [SensorController::class, 'latest']);
Route::get('/sensor/history', [SensorController::class, 'history']);

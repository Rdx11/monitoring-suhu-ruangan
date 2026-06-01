<?php

use App\Http\Controllers\ChartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RecapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root ke dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

// Route login (guest only)
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');

// Route yang memerlukan autentikasi
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/chart', [ChartController::class, 'index'])->name('chart');
    Route::get('/recap', [RecapController::class, 'index'])->name('recap');
    Route::get('/recap/export', [RecapController::class, 'export'])->name('recap.export');
});

<?php

namespace App\Http\Controllers;

use App\Models\SensorReading;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Ambil data sensor terbaru
        $latestReading = SensorReading::latest('recorded_at')->first();

        // Format data untuk dikirim ke React
        $data = null;
        if ($latestReading) {
            $data = [
                'temperature' => number_format($latestReading->temperature, 2),
                'humidity' => number_format($latestReading->humidity, 2),
                'status' => $latestReading->status,
                'recorded_at' => $latestReading->recorded_at->format('d-m-Y H:i:s'),
            ];
        }

        return Inertia::render('Dashboard', [
            'latestReading' => $data,
        ]);
    }
}

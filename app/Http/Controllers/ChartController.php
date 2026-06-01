<?php

namespace App\Http\Controllers;

use App\Models\SensorReading;
use Inertia\Inertia;

class ChartController extends Controller
{
    public function index()
    {
        // Ambil 50 data terakhir untuk grafik
        $readings = SensorReading::latest('recorded_at')
            ->take(50)
            ->get()
            ->reverse()
            ->values()
            ->map(function ($reading) {
                return [
                    'temperature' => (float) number_format($reading->temperature, 2, '.', ''),
                    'humidity' => (float) number_format($reading->humidity, 2, '.', ''),
                    'time' => $reading->recorded_at->format('H:i:s'),
                    'recorded_at' => $reading->recorded_at->format('d-m-Y H:i:s'),
                ];
            });

        return Inertia::render('Chart', [
            'initialData' => $readings,
        ]);
    }
}

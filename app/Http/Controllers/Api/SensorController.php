<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SensorReading;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SensorController extends Controller
{
    /**
     * Menerima data dari ESP32
     */
    public function store(Request $request)
    {
        // Validasi API Key
        if ($request->input('api_key') !== config('app.sensor_api_key')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        // Validasi data sensor
        $validator = Validator::make($request->all(), [
            'temperature' => 'required|numeric|min:-50|max:100',
            'humidity' => 'required|numeric|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Hitung status
        $temperature = $request->input('temperature');
        $humidity = $request->input('humidity');
        $status = SensorReading::calculateStatus($temperature, $humidity);

        // Simpan data
        $reading = SensorReading::create([
            'temperature' => $temperature,
            'humidity' => $humidity,
            'status' => $status,
            'recorded_at' => Carbon::now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil disimpan',
            'id' => $reading->id,
        ], 201);
    }

    /**
     * Ambil data terbaru (untuk auto-refresh dashboard)
     */
    public function latest()
    {
        $reading = SensorReading::latest('recorded_at')->first();

        if (!$reading) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada data',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'temperature' => number_format($reading->temperature, 2),
                'humidity' => number_format($reading->humidity, 2),
                'status' => $reading->status,
                'recorded_at' => $reading->recorded_at->format('d-m-Y H:i:s'),
            ],
        ]);
    }

    /**
     * Ambil history data (untuk auto-refresh grafik)
     */
    public function history(Request $request)
    {
        $limit = $request->input('limit', 50);

        $readings = SensorReading::latest('recorded_at')
            ->take($limit)
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

        return response()->json([
            'success' => true,
            'data' => $readings,
        ]);
    }
}

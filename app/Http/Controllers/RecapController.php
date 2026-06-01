<?php

namespace App\Http\Controllers;

use App\Models\SensorReading;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecapController extends Controller
{
    public function index(Request $request)
    {
        // Default filter: 7 hari terakhir
        $tanggalDari = $request->input('tanggal_dari', Carbon::now()->subDays(7)->format('Y-m-d'));
        $tanggalSampai = $request->input('tanggal_sampai', Carbon::now()->format('Y-m-d'));

        // Query dengan filter tanggal
        $query = SensorReading::query()
            ->whereDate('recorded_at', '>=', $tanggalDari)
            ->whereDate('recorded_at', '<=', $tanggalSampai)
            ->orderBy('recorded_at', 'desc');

        // Pagination 15 per halaman
        $readings = $query->paginate(15)->through(function ($reading, $index) {
            return [
                'id' => $reading->id,
                'temperature' => number_format($reading->temperature, 2),
                'humidity' => number_format($reading->humidity, 2),
                'status' => $reading->status,
                'recorded_at' => $reading->recorded_at->format('d-m-Y H:i:s'),
            ];
        });

        return Inertia::render('Recap', [
            'readings' => $readings,
            'filters' => [
                'tanggal_dari' => $tanggalDari,
                'tanggal_sampai' => $tanggalSampai,
            ],
        ]);
    }

    public function export(Request $request)
    {
        // Ambil filter dari request
        $tanggalDari = $request->input('tanggal_dari', Carbon::now()->subDays(7)->format('Y-m-d'));
        $tanggalSampai = $request->input('tanggal_sampai', Carbon::now()->format('Y-m-d'));

        // Query data sesuai filter
        $readings = SensorReading::query()
            ->whereDate('recorded_at', '>=', $tanggalDari)
            ->whereDate('recorded_at', '<=', $tanggalSampai)
            ->orderBy('recorded_at', 'desc')
            ->get();

        // Generate CSV
        $filename = 'rekap_sensor_' . Carbon::now()->format('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($readings) {
            $file = fopen('php://output', 'w');
            
            // Header CSV
            fputcsv($file, ['No', 'Tanggal & Waktu', 'Suhu', 'Kelembapan', 'Status']);

            // Data rows
            foreach ($readings as $index => $reading) {
                fputcsv($file, [
                    $index + 1,
                    $reading->recorded_at->format('d-m-Y H:i:s'),
                    number_format($reading->temperature, 2) . ' °C',
                    number_format($reading->humidity, 2) . ' %',
                    ucfirst($reading->status),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}

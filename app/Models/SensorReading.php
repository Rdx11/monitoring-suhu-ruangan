<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SensorReading extends Model
{
    protected $fillable = [
        'temperature',
        'humidity',
        'status',
        'recorded_at',
    ];

    protected $casts = [
        'temperature' => 'decimal:2',
        'humidity' => 'decimal:2',
        'recorded_at' => 'datetime',
    ];

    /**
     * Hitung status berdasarkan suhu dan kelembapan
     */
    public static function calculateStatus(float $temperature, float $humidity): string
    {
        // Tinggi → jika suhu > 35°C ATAU kelembapan > 80%
        if ($temperature > 35 || $humidity > 80) {
            return 'tinggi';
        }

        // Waspada → jika suhu > 28°C ATAU kelembapan > 60%
        if ($temperature > 28 || $humidity > 60) {
            return 'waspada';
        }

        // Normal → jika suhu ≤ 28°C DAN kelembapan ≤ 60%
        return 'normal';
    }
}

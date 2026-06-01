import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AppLayout from '../components/AppLayout'
import SensorCard from '../components/SensorCard'
import StatusCard from '../components/StatusCard'

interface SensorData {
  temperature: string
  humidity: string
  status: 'normal' | 'waspada' | 'tinggi'
  recorded_at: string
}

interface DashboardProps {
  latestReading: SensorData | null
}

export default function Dashboard({ latestReading }: DashboardProps) {
  const [data, setData] = useState<SensorData | null>(latestReading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Auto-refresh setiap 5 detik
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('/api/sensor/latest')
        if (response.data.success) {
          setData(response.data.data)
          setError(null)
        }
      } catch (err) {
        setError('Gagal memperbarui data')
        console.error('Error fetching latest data:', err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AppLayout title="Dashboard">
      <Head title="Dashboard" />

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!data ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-600">
            Belum ada data sensor
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Menunggu data dari ESP32...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card Suhu */}
          <SensorCard
            label="Suhu Terkini"
            value={data.temperature}
            unit="°C"
            status={data.status}
            subtitle="Batas normal ≤ 28°C"
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />

          {/* Card Kelembapan */}
          <SensorCard
            label="Kelembapan Terkini"
            value={data.humidity}
            unit="%"
            status={data.status}
            subtitle="Batas normal ≤ 60%"
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            }
          />

          {/* Card Status */}
          <div className="lg:col-span-1">
            <StatusCard
              status={data.status}
              temperature={data.temperature}
              humidity={data.humidity}
              lastUpdated={data.recorded_at}
            />
          </div>
        </div>
      )}
    </AppLayout>
  )
}

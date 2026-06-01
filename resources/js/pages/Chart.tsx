import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AppLayout from '../components/AppLayout'
import SensorLineChart from '../components/SensorLineChart'

interface ChartData {
  temperature: number
  humidity: number
  time: string
  recorded_at: string
}

interface ChartProps {
  initialData: ChartData[]
}

export default function Chart({ initialData }: ChartProps) {
  const [data, setData] = useState<ChartData[]>(initialData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Auto-refresh setiap 5 detik
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('/api/sensor/history?limit=50')
        if (response.data.success) {
          setData(response.data.data)
          setError(null)
        }
      } catch (err) {
        setError('Gagal memperbarui data grafik')
        console.error('Error fetching history data:', err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AppLayout title="Grafik">
      <Head title="Grafik" />

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {data.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">
            Belum ada data untuk ditampilkan. Menunggu data dari ESP32...
          </p>
        </div>
      ) : (
        <SensorLineChart data={data} />
      )}
    </AppLayout>
  )
}

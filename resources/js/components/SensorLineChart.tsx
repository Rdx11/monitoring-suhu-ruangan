import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ChartData {
  temperature: number
  humidity: number
  time: string
  recorded_at: string
}

interface SensorLineChartProps {
  data: ChartData[]
}

export default function SensorLineChart({ data }: SensorLineChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800">
          Tren Suhu & Kelembapan
        </h3>
        <p className="text-sm text-slate-600">
          Menampilkan {data.length} pembacaan terakhir
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="time"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#334155', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={(value) => (
              <span style={{ color: '#334155', fontSize: '14px' }}>
                {value}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 3 }}
            name="Suhu (°C)"
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3 }}
            name="Kelembapan (%)"
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

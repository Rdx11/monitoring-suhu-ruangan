interface StatusCardProps {
  status: 'normal' | 'waspada' | 'tinggi'
  temperature: string
  humidity: string
  lastUpdated: string
}

export default function StatusCard({
  status,
  temperature,
  humidity,
  lastUpdated,
}: StatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'tinggi':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100/50',
          border: 'border-red-300',
          text: 'text-red-700',
          label: 'TINGGI',
          badgeBg: 'bg-red-500',
          icon: (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 shadow-lg shadow-red-500/30">
              <svg
                className="h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ),
          description:
            'Suhu atau kelembapan melebihi batas maksimum! Segera lakukan tindakan.',
        }
      case 'waspada':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100/50',
          border: 'border-yellow-300',
          text: 'text-yellow-700',
          label: 'WASPADA',
          badgeBg: 'bg-yellow-500',
          icon: (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 shadow-lg shadow-yellow-500/30">
              <svg
                className="h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ),
          description:
            'Suhu atau kelembapan mendekati batas maksimum. Perlu perhatian.',
        }
      case 'normal':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100/50',
          border: 'border-green-300',
          text: 'text-green-700',
          label: 'NORMAL',
          badgeBg: 'bg-green-500',
          icon: (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/30">
              <svg
                className="h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ),
          description: 'Kondisi gudang dalam batas aman.',
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          label: 'TIDAK DIKETAHUI',
          badgeBg: 'bg-gray-500',
          icon: null,
          description: 'Status tidak diketahui.',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div
      className={`rounded-2xl border-2 ${config.border} ${config.bg} p-6 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600">
          Status Kondisi Gudang
        </h3>
        {config.icon}
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center space-x-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${config.badgeBg}`}
          ></span>
          <p className={`text-2xl font-bold ${config.text}`}>{config.label}</p>
        </div>
        <p className="text-sm text-gray-600">{config.description}</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 rounded-xl bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-medium text-gray-500">Suhu Saat Ini</p>
          <p className="mt-1 text-xl font-bold text-gray-800">
            {temperature} °C
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">
            Kelembapan Saat Ini
          </p>
          <p className="mt-1 text-xl font-bold text-gray-800">{humidity} %</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Terakhir diperbarui: {lastUpdated}</span>
      </div>
    </div>
  )
}

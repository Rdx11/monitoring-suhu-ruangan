import { Link } from '@inertiajs/react'

interface Reading {
  id: number
  temperature: string
  humidity: string
  status: 'normal' | 'waspada' | 'tinggi'
  recorded_at: string
}

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface RecapTableProps {
  readings: {
    data: Reading[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
    links: PaginationLink[]
  }
}

export default function RecapTable({ readings }: RecapTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'tinggi':
        return (
          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
            Tinggi
          </span>
        )
      case 'waspada':
        return (
          <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            Waspada
          </span>
        )
      case 'normal':
        return (
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            Normal
          </span>
        )
      default:
        return (
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                No
              </th>
              <th className="border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Tanggal & Waktu
              </th>
              <th className="border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Suhu
              </th>
              <th className="border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Kelembapan
              </th>
              <th className="border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {readings.data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-600">
                  Tidak ada data untuk ditampilkan
                </td>
              </tr>
            ) : (
              readings.data.map((reading, index) => (
                <tr
                  key={reading.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                    {readings.from + index}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                    {reading.recorded_at}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                    {reading.temperature} °C
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                    {reading.humidity} %
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {getStatusBadge(reading.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {readings.data.length > 0 && (
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Menampilkan {readings.from} - {readings.to} dari {readings.total}{' '}
              data
            </div>
            <div className="flex space-x-2">
              {readings.links.map((link, index) => {
                if (!link.url) {
                  return (
                    <span
                      key={index}
                      className="cursor-not-allowed rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-400"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  )
                }

                return (
                  <Link
                    key={index}
                    href={link.url}
                    preserveState
                    className={`rounded-md border px-3 py-2 text-sm ${
                      link.active
                        ? 'border-blue-500 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

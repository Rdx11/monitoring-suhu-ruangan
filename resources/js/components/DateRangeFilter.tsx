import { router } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'

interface DateRangeFilterProps {
  filters: {
    tanggal_dari: string
    tanggal_sampai: string
  }
}

export default function DateRangeFilter({ filters }: DateRangeFilterProps) {
  const [tanggalDari, setTanggalDari] = useState(filters.tanggal_dari)
  const [tanggalSampai, setTanggalSampai] = useState(filters.tanggal_sampai)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    router.get(
      '/recap',
      {
        tanggal_dari: tanggalDari,
        tanggal_sampai: tanggalSampai,
      },
      {
        preserveState: true,
      },
    )
  }

  const handleReset = () => {
    router.get('/recap')
  }

  const handleExport = () => {
    window.location.href = `/recap/export?tanggal_dari=${tanggalDari}&tanggal_sampai=${tanggalSampai}`
  }

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Filter Tanggal
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="tanggal_dari"
              className="block text-sm font-medium text-slate-700"
            >
              Dari Tanggal
            </label>
            <input
              type="date"
              id="tanggal_dari"
              value={tanggalDari}
              onChange={(e) => setTanggalDari(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tanggal_sampai"
              className="block text-sm font-medium text-slate-700"
            >
              Sampai Tanggal
            </label>
            <input
              type="date"
              id="tanggal_sampai"
              value={tanggalSampai}
              onChange={(e) => setTanggalSampai(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Terapkan Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Export CSV
          </button>
        </div>
      </form>
    </div>
  )
}

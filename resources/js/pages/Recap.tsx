import { Head } from '@inertiajs/react'
import AppLayout from '../components/AppLayout'
import DateRangeFilter from '../components/DateRangeFilter'
import RecapTable from '../components/RecapTable'

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

interface RecapProps {
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
  filters: {
    tanggal_dari: string
    tanggal_sampai: string
  }
}

export default function Recap({ readings, filters }: RecapProps) {
  return (
    <AppLayout title="Rekap">
      <Head title="Rekap" />

      <DateRangeFilter filters={filters} />
      <RecapTable readings={readings} />
    </AppLayout>
  )
}

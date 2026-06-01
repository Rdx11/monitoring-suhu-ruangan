import { ReactNode } from 'react'

interface SensorCardProps {
  label: string
  value: string
  unit: string
  icon: ReactNode
  status: 'normal' | 'waspada' | 'tinggi'
  subtitle?: string
}

export default function SensorCard({
  label,
  value,
  unit,
  icon,
  status,
  subtitle,
}: SensorCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'tinggi':
        return 'border-red-200 bg-red-50/50'
      case 'waspada':
        return 'border-yellow-200 bg-yellow-50/50'
      case 'normal':
        return 'border-green-200 bg-green-50/50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  const getIconColor = () => {
    switch (status) {
      case 'tinggi':
        return 'text-red-500'
      case 'waspada':
        return 'text-yellow-500'
      case 'normal':
        return 'text-green-500'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div
      className={`rounded-2xl border-2 p-6 shadow-sm transition-all hover:shadow-md ${getStatusStyles()}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600">{label}</h3>
        <div className={`${getIconColor()}`}>{icon}</div>
      </div>
      <div className="mb-2">
        <p className="text-4xl font-bold text-gray-800">
          {value}
          <span className="ml-1 text-2xl font-medium text-gray-500">
            {unit}
          </span>
        </p>
      </div>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  )
}

import { FormEventHandler, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Icon */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
              <svg
                className="h-8 w-8 text-white"
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
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Monitoring Gudang Padi
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Masuk untuk memantau kondisi gudang padi
            </p>
          </div>

          {/* Card dengan border dan shadow yang lebih kuat */}
          <div className="rounded-2xl border-2 border-green-200 bg-white p-8 shadow-2xl shadow-green-500/20">
            {/* Error Message */}
            {errors.email && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errors.email}
              </div>
            )}

            {/* Form */}
            <form onSubmit={submit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="admin@gudang.com"
                  className="block w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/20"
                  autoFocus
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-gray-900 transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/40 transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-600">
            Sistem Monitoring Suhu & Kelembapan Gudang
          </p>
        </div>
      </div>
    </>
  )
}

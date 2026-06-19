import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout, { AuthDivider, AuthFooterLink } from '../components/auth/AuthLayout'
import { GoogleButton, GoogleAccountPicker } from '../components/auth/GoogleAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googlePickerOpen, setGooglePickerOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSelect = (account) => {
    loginWithGoogle(account)
    setGooglePickerOpen(false)
    navigate('/')
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to Neo">
      <GoogleButton onClick={() => setGooglePickerOpen(true)} />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm text-[#8e8ea0] mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#2f2f2f] border border-[#424242]
              text-[#ececec] placeholder-[#8e8ea0] outline-none
              focus:border-[#565869] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-[#8e8ea0] mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#2f2f2f] border border-[#424242]
              text-[#ececec] placeholder-[#8e8ea0] outline-none
              focus:border-[#565869] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-black font-medium text-sm
            hover:bg-[#d9d9d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </form>

      <AuthFooterLink text="Don't have an account?" linkText="Sign up" to="/register" />

      <GoogleAccountPicker
        isOpen={googlePickerOpen}
        onClose={() => setGooglePickerOpen(false)}
        onSelect={handleGoogleSelect}
      />
    </AuthLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout, { AuthDivider, AuthFooterLink } from '../components/auth/AuthLayout'
import { GoogleButton, GoogleAccountPicker } from '../components/auth/GoogleAuth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loginWithGoogle } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googlePickerOpen, setGooglePickerOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      register(name, email, password)
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
    <AuthLayout title="Create your account" subtitle="Get started with Neo for free">
      <GoogleButton onClick={() => setGooglePickerOpen(true)} label="Sign up with Google" />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm text-[#8e8ea0] mb-1.5">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#2f2f2f] border border-[#424242]
              text-[#ececec] placeholder-[#8e8ea0] outline-none
              focus:border-[#565869] transition-colors"
          />
        </div>

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
            placeholder="Min. 6 characters"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl bg-[#2f2f2f] border border-[#424242]
              text-[#ececec] placeholder-[#8e8ea0] outline-none
              focus:border-[#565869] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm text-[#8e8ea0] mb-1.5">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
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
          {loading ? 'Creating account...' : 'Sign up with Email'}
        </button>
      </form>

      <AuthFooterLink text="Already have an account?" linkText="Sign in" to="/login" />

      <GoogleAccountPicker
        isOpen={googlePickerOpen}
        onClose={() => setGooglePickerOpen(false)}
        onSelect={handleGoogleSelect}
      />
    </AuthLayout>
  )
}

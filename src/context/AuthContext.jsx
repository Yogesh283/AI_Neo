import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'neo_users'
const SESSION_KEY = 'neo_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = loadSession()
    if (session) setUser(session)
    setLoading(false)
  }, [])

  const login = useCallback((email, password) => {
    const users = loadUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      throw new Error('Invalid email or password')
    }
    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      provider: 'email',
      avatar: found.name.charAt(0).toUpperCase(),
    }
    setUser(sessionUser)
    saveSession(sessionUser)
    return sessionUser
  }, [])

  const register = useCallback((name, email, password) => {
    const users = loadUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists')
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      provider: 'email',
    }
    users.push(newUser)
    saveUsers(users)
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: 'email',
      avatar: newUser.name.charAt(0).toUpperCase(),
    }
    setUser(sessionUser)
    saveSession(sessionUser)
    return sessionUser
  }, [])

  const loginWithGoogle = useCallback((googleUser) => {
    const sessionUser = {
      id: googleUser.id || `google-${Date.now()}`,
      name: googleUser.name,
      email: googleUser.email,
      provider: 'google',
      avatar: googleUser.name.charAt(0).toUpperCase(),
      picture: googleUser.picture,
    }
    setUser(sessionUser)
    saveSession(sessionUser)
    return sessionUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveSession(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

import { useState, useRef, useEffect } from 'react'

function IconSettings({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function IconHelp({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" />
    </svg>
  )
}

function IconUpgrade({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function IconLogout({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const menuItems = [
  { id: 'settings', label: 'Settings', icon: IconSettings },
  { id: 'help', label: 'Help & FAQ', icon: IconHelp },
  { id: 'upgrade', label: 'Upgrade plan', icon: IconUpgrade },
  { id: 'logout', label: 'Log out', icon: IconLogout, danger: true },
]

export default function UserMenu({ user, onAction }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
          hover:bg-[#2f2f2f] transition-colors"
      >
        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold text-white
          ${user?.provider === 'google' ? 'bg-blue-500' : 'bg-gradient-to-br from-violet-500 to-fuchsia-500'}`}>
          {user?.avatar || 'U'}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-[#ececec] truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-[#8e8ea0] truncate">
            {user?.provider === 'google' ? user.email : 'Free plan'}
          </p>
        </div>
        <svg className="w-5 h-5 text-[#8e8ea0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#2f2f2f] rounded-xl
          border border-[#424242] shadow-xl z-50 py-1 overflow-hidden">
          {menuItems.map(({ id, label, icon: Icon, danger }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                onAction(id)
                setOpen(false)
              }}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left
                hover:bg-[#424242] transition-colors
                ${danger ? 'text-red-400' : 'text-[#ececec]'}`}
            >
              <Icon className="w-4 h-4 opacity-70" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

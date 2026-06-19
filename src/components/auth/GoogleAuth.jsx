const googleAccounts = [
  {
    id: 'g1',
    name: 'Yogi Sharma',
    email: 'yogi@gmail.com',
    picture: null,
  },
  {
    id: 'g2',
    name: 'Yogi Work',
    email: 'yogi.work@gmail.com',
    picture: null,
  },
]

function GoogleLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export function GoogleButton({ onClick, label = 'Continue with Google' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full py-3 px-4
        rounded-xl bg-white text-gray-800 font-medium text-sm
        hover:bg-gray-100 transition-colors border border-gray-200"
    >
      <GoogleLogo className="w-5 h-5" />
      {label}
    </button>
  )
}

export function GoogleAccountPicker({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-8 pb-4 text-center">
          <GoogleLogo className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-xl font-normal text-gray-800">Sign in with Google</h2>
          <p className="text-sm text-gray-500 mt-1">to continue to Neo</p>
        </div>

        <div className="px-4 pb-4 space-y-1">
          {googleAccounts.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() => onSelect(account)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                hover:bg-gray-100 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center
                text-white font-semibold text-sm shrink-0">
                {account.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{account.name}</p>
                <p className="text-xs text-gray-500 truncate">{account.email}</p>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
              hover:bg-gray-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300
              flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Use another account</p>
          </button>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

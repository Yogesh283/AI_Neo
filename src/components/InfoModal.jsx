import { useEffect } from 'react'

function IconClose({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

const content = {
  settings: {
    title: 'Settings',
    body: (
      <div className="space-y-4 text-sm text-[#ececec]">
        <div className="flex items-center justify-between py-2 border-b border-[#424242]">
          <span>Theme</span>
          <span className="text-[#8e8ea0]">Dark</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#424242]">
          <span>Language</span>
          <span className="text-[#8e8ea0]">English</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span>Data controls</span>
          <button
            type="button"
            onClick={() => onAction?.('data-controls')}
            className="text-emerald-400 hover:underline"
          >
            Manage
          </button>
        </div>
      </div>
    ),
  },
  help: {
    title: 'Help & FAQ',
    body: (
      <div className="space-y-4 text-sm">
        <details className="group">
          <summary className="cursor-pointer text-[#ececec] hover:text-white py-2">How do I start a new chat?</summary>
          <p className="text-[#8e8ea0] pl-4 pb-2">Click &quot;New chat&quot; in the sidebar or header to begin a fresh conversation.</p>
        </details>
        <details className="group">
          <summary className="cursor-pointer text-[#ececec] hover:text-white py-2">Can I search old conversations?</summary>
          <p className="text-[#8e8ea0] pl-4 pb-2">Yes — use &quot;Search chats&quot; in the sidebar to find past chats by title.</p>
        </details>
        <details className="group">
          <summary className="cursor-pointer text-[#ececec] hover:text-white py-2">What is the Library?</summary>
          <p className="text-[#8e8ea0] pl-4 pb-2">Library stores saved prompts, tools, and guides you can reuse anytime.</p>
        </details>
      </div>
    ),
  },
  upgrade: {
    title: 'Upgrade to Neo Plus',
    body: (
      <div className="text-sm text-[#ececec] space-y-4">
        <p className="text-[#8e8ea0]">Get unlimited messages, faster responses, and priority access.</p>
        <ul className="space-y-2 text-[#8e8ea0]">
          <li>✓ Unlimited chats</li>
          <li>✓ Advanced models (o1, GPT-4o)</li>
          <li>✓ File uploads & voice input</li>
          <li>✓ Priority support</li>
        </ul>
        <button
          type="button"
          onClick={() => {
            onAction?.('upgrade-confirmed')
            onClose()
          }}
          className="w-full py-2.5 rounded-xl bg-white text-black font-medium
            hover:bg-[#d9d9d9] transition-colors"
        >
          Upgrade for $20/month
        </button>
      </div>
    ),
  },
}

export default function InfoModal({ type, onClose, onAction }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!type || !content[type]) return null

  const { title, body } = content[type]

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-[#212121] rounded-2xl border border-[#424242] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#ececec]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#2f2f2f] text-[#8e8ea0] transition-colors"
            aria-label="Close"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>
        {body}
      </div>
    </div>
  )
}

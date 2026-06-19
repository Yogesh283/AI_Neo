import { useState, useEffect, useRef } from 'react'

function IconClose({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

function IconSearch({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}

function IconChat({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function SearchPanel({ isOpen, onClose, chats, onSelectChat }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-[#2f2f2f] rounded-2xl border border-[#424242] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#424242]">
          <IconSearch className="w-5 h-5 text-[#8e8ea0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats..."
            className="flex-1 bg-transparent text-[#ececec] placeholder-[#8e8ea0] outline-none text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#424242] text-[#8e8ea0] transition-colors"
            aria-label="Close search"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[#8e8ea0]">No chats found</p>
          ) : (
            filtered.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => {
                  onSelectChat(chat.id)
                  onClose()
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-left
                  hover:bg-[#424242] transition-colors"
              >
                <IconChat className="w-4 h-4 text-[#8e8ea0] shrink-0" />
                <span className="text-sm text-[#ececec] truncate">{chat.title}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

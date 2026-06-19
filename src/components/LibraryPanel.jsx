import { useEffect } from 'react'
import { libraryItems } from '../data/mockChats'

function IconClose({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

export default function LibraryPanel({ isOpen, onClose, onSelectItem }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#212121] rounded-2xl border border-[#424242] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2f2f2f] shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#ececec]">Library</h2>
            <p className="text-sm text-[#8e8ea0] mt-0.5">Saved prompts, tools, and guides</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#2f2f2f] text-[#8e8ea0] transition-colors"
            aria-label="Close library"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {libraryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item)}
              className="flex items-start gap-3 p-4 rounded-xl border border-[#424242]
                bg-[#2f2f2f]/50 hover:bg-[#2f2f2f] hover:border-[#565869]
                text-left transition-all"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#ececec] truncate">{item.title}</p>
                <p className="text-xs text-[#8e8ea0] mt-1">{item.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

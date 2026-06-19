import { useState, useRef, useEffect } from 'react'
import { models } from '../data/mockChats'

function IconChevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ModelSelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = models.find((m) => m.id === selected) || models[0]

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
        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full
          bg-[#2f2f2f] text-[#8e8ea0] border border-[#424242]
          hover:bg-[#424242] hover:text-[#ececec] transition-colors"
      >
        {current.label}
        <IconChevron className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-[#2f2f2f] rounded-xl
          border border-[#424242] shadow-xl z-50 py-1 overflow-hidden">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => {
                onSelect(model.id)
                setOpen(false)
              }}
              className={`w-full px-4 py-2.5 text-left hover:bg-[#424242] transition-colors
                ${selected === model.id ? 'bg-[#424242]/50' : ''}`}
            >
              <p className="text-sm text-[#ececec]">{model.label}</p>
              <p className="text-xs text-[#8e8ea0] mt-0.5">{model.desc}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

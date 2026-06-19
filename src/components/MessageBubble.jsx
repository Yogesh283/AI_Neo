import { useState } from 'react'

function IconCopy({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function IconThumbsUp({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}

function IconThumbsDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}

function IconRefresh({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" />
      <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" strokeLinecap="round" />
      <path d="M16 16h5v5" strokeLinecap="round" />
    </svg>
  )
}

function renderMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#ececec]">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function MessageBubble({ role, content, onCopy, onFeedback, onRegenerate }) {
  const [feedback, setFeedback] = useState(null)
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-3">
        <div
          className="max-w-[70%] bg-[#2f2f2f] text-[#ececec]
            rounded-3xl px-5 py-3 text-base leading-7"
        >
          {content}
        </div>
      </div>
    )
  }

  const handleFeedback = (type) => {
    setFeedback(type)
    onFeedback?.(type)
  }

  return (
    <div className="px-4 py-3 group">
      <div className="max-w-3xl mx-auto flex gap-4">
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500
            flex items-center justify-center shrink-0 mt-0.5"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#ececec] text-base leading-7">
            {renderMarkdown(content)}
          </div>
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onCopy?.(content)}
              aria-label="Copy"
              className="p-1.5 rounded-lg text-[#8e8ea0] hover:text-[#ececec]
                hover:bg-[#2f2f2f] transition-colors"
            >
              <IconCopy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFeedback('up')}
              aria-label="Good response"
              className={`p-1.5 rounded-lg transition-colors
                ${feedback === 'up'
                  ? 'text-emerald-400 bg-[#2f2f2f]'
                  : 'text-[#8e8ea0] hover:text-[#ececec] hover:bg-[#2f2f2f]'
                }`}
            >
              <IconThumbsUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFeedback('down')}
              aria-label="Bad response"
              className={`p-1.5 rounded-lg transition-colors
                ${feedback === 'down'
                  ? 'text-red-400 bg-[#2f2f2f]'
                  : 'text-[#8e8ea0] hover:text-[#ececec] hover:bg-[#2f2f2f]'
                }`}
            >
              <IconThumbsDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRegenerate}
              aria-label="Regenerate"
              className="p-1.5 rounded-lg text-[#8e8ea0] hover:text-[#ececec]
                hover:bg-[#2f2f2f] transition-colors"
            >
              <IconRefresh className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

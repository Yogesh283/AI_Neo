import { useRef } from 'react'

function IconAttach({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconMic({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowUp({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onAttach,
  onMic,
  isListening,
  attachedFile,
  placeholder,
}) {
  const hasText = value.trim().length > 0
  const fileInputRef = useRef(null)

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      {attachedFile && (
        <div className="mb-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2f2f2f] border border-[#424242] w-fit">
          <IconAttach className="w-4 h-4 text-[#8e8ea0]" />
          <span className="text-sm text-[#ececec] truncate max-w-[200px]">{attachedFile}</span>
        </div>
      )}

      <div
        className="flex items-end gap-2 bg-[#2f2f2f] rounded-3xl
          border border-[#424242] px-4 py-3 shadow-lg
          focus-within:border-[#565869] transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onAttach?.(file.name)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 rounded-full text-[#8e8ea0] hover:text-[#ececec]
            hover:bg-[#424242] transition-colors shrink-0 mb-0.5"
          aria-label="Attach file"
        >
          <IconAttach className="w-5 h-5" />
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Message Neo...'}
          rows={1}
          className="flex-1 bg-transparent text-[#ececec] placeholder-[#8e8ea0]
            text-base resize-none outline-none max-h-52 leading-6 py-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (hasText) onSend()
            }
          }}
        />

        <div className="flex items-center gap-1 shrink-0 mb-0.5">
          {!hasText && (
            <button
              type="button"
              onClick={onMic}
              className={`p-1.5 rounded-full transition-colors
                ${isListening
                  ? 'bg-red-500/20 text-red-400 animate-pulse'
                  : 'text-[#8e8ea0] hover:text-[#ececec] hover:bg-[#424242]'
                }`}
              aria-label="Voice input"
            >
              <IconMic className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onSend}
            disabled={!hasText}
            className={`
              p-1.5 rounded-full transition-colors
              ${hasText
                ? 'bg-white text-black hover:bg-[#d9d9d9]'
                : 'bg-[#424242] text-[#8e8ea0] cursor-not-allowed'
              }
            `}
            aria-label="Send message"
          >
            <IconArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-[#8e8ea0] mt-2">
        Neo can make mistakes. Check important info.
      </p>
    </div>
  )
}

import { suggestions } from '../data/mockChats'

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br
            from-emerald-400 to-teal-500 flex items-center justify-center
            shadow-lg shadow-emerald-500/20"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-[#ececec] mb-2">
          What can I help with today?
        </h1>
        <p className="text-[#8e8ea0] text-base">
          Ask me anything — I'm here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((s) => (
          <button
            key={s.text}
            type="button"
            onClick={() => onSuggestionClick(s.text)}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl
              border border-[#424242] bg-[#2f2f2f]/50
              text-left text-sm text-[#ececec]
              hover:bg-[#2f2f2f] hover:border-[#565869]
              transition-all duration-150"
          >
            <span className="text-xl">{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

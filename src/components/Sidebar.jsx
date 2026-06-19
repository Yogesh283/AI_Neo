import { chatHistory } from '../data/mockChats'
import UserMenu from './UserMenu'

function IconPlus({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
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

function IconLibrary({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function IconMenu({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  )
}

function IconClose({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
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

export default function Sidebar({
  isOpen,
  onClose,
  activeChat,
  chats,
  user,
  onSelectChat,
  onNewChat,
  onOpenSearch,
  onOpenLibrary,
  onUserAction,
}) {
  const allChats = chats.length > 0 ? chats : chatHistory

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 flex flex-col
          w-[260px] h-full shrink-0
          bg-[#171717] text-[#ececec]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-3">
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg
              text-sm text-[#ececec] hover:bg-[#2f2f2f] transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            New chat
          </button>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-[#2f2f2f] transition-colors"
            aria-label="Close sidebar"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 space-y-0.5">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
              text-sm text-[#ececec] hover:bg-[#2f2f2f] transition-colors"
          >
            <IconSearch className="w-4 h-4 opacity-70" />
            Search chats
          </button>
          <button
            type="button"
            onClick={onOpenLibrary}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
              text-sm text-[#ececec] hover:bg-[#2f2f2f] transition-colors"
          >
            <IconLibrary className="w-4 h-4 opacity-70" />
            Library
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 px-3">
          <p className="px-3 py-1 text-xs text-[#8e8ea0] font-medium">Chats</p>
          <div className="space-y-0.5 mt-1">
            {activeChat === null && (
              <button
                type="button"
                onClick={onNewChat}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
                  text-sm text-left bg-[#2f2f2f] text-[#ececec] hover:bg-[#3a3a3a] transition-colors"
              >
                <IconChat className="w-4 h-4 shrink-0 opacity-70" />
                <span className="truncate">New conversation</span>
              </button>
            )}
            {allChats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat(chat.id)}
                className={`
                  flex items-center gap-3 w-full px-3 py-2 rounded-lg
                  text-sm text-left transition-colors
                  ${activeChat === chat.id
                    ? 'bg-[#2f2f2f] text-[#ececec]'
                    : 'text-[#ececec] hover:bg-[#2f2f2f]'
                  }
                `}
              >
                <IconChat className="w-4 h-4 shrink-0 opacity-70" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-[#2f2f2f]">
          <UserMenu user={user} onAction={onUserAction} />
        </div>
      </aside>
    </>
  )
}

export { IconMenu }

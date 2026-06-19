import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar, { IconMenu } from './Sidebar'
import ChatArea from './ChatArea'
import ChatInput from './ChatInput'
import SearchPanel from './SearchPanel'
import LibraryPanel from './LibraryPanel'
import ModelSelector from './ModelSelector'
import InfoModal from './InfoModal'
import Toast from './Toast'
import {
  chatHistory,
  chatMessages,
  demoReply,
  models,
} from '../data/mockChats'

export default function ChatApp() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [chats, setChats] = useState(chatHistory)
  const [searchOpen, setSearchOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [infoModal, setInfoModal] = useState(null)
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [isListening, setIsListening] = useState(false)
  const [attachedFile, setAttachedFile] = useState(null)
  const [toast, setToast] = useState({ message: '', visible: false })

  const showToast = useCallback((message) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast({ message: '', visible: false }), 2500)
  }, [])

  const handleNewChat = () => {
    setActiveChat(null)
    setMessages([])
    setInput('')
    setAttachedFile(null)
    setSidebarOpen(false)
  }

  const handleSelectChat = (id) => {
    setActiveChat(id)
    setMessages(chatMessages[id] || [])
    setInput('')
    setAttachedFile(null)
    setSidebarOpen(false)
  }

  const handleSend = (textOverride) => {
    const text = (textOverride || input).trim()
    if (!text) return

    const userMsg = { id: Date.now().toString(), role: 'user', content: text }
    const assistantMsg = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: demoReply,
    }

    const newMessages = [...messages, userMsg, assistantMsg]
    setMessages(newMessages)

    if (activeChat === null) {
      const newId = `new-${Date.now()}`
      const title = text.length > 40 ? `${text.slice(0, 40)}...` : text
      setChats((prev) => [{ id: newId, title }, ...prev])
      setActiveChat(newId)
      chatMessages[newId] = newMessages
    } else {
      chatMessages[activeChat] = newMessages
    }

    setInput('')
    setAttachedFile(null)
  }

  const handleSuggestion = (text) => {
    handleSend(text)
  }

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      showToast('Copied to clipboard')
    } catch {
      showToast('Could not copy')
    }
  }

  const handleFeedback = (type) => {
    showToast(type === 'up' ? 'Thanks for your feedback!' : 'Feedback recorded')
  }

  const handleRegenerate = (index) => {
    setMessages((prev) => {
      const updated = [...prev]
      if (updated[index]?.role === 'assistant') {
        updated[index] = {
          ...updated[index],
          content: "Here's a regenerated response with a fresh perspective. " + demoReply,
        }
      }
      if (activeChat) chatMessages[activeChat] = updated
      return updated
    })
    showToast('Response regenerated')
  }

  const handleMic = () => {
    if (isListening) {
      setIsListening(false)
      setInput('Hello Neo, how are you today?')
      showToast('Voice input captured')
    } else {
      setIsListening(true)
      showToast('Listening... click mic again to stop')
    }
  }

  const handleAttach = (fileName) => {
    setAttachedFile(fileName)
    showToast(`Attached: ${fileName}`)
  }

  const handleLibraryItem = (item) => {
    setLibraryOpen(false)
    handleSend(`Help me with: ${item.title}`)
  }

  const handleUserAction = (action) => {
    if (action === 'logout') {
      logout()
      navigate('/login')
    } else {
      setInfoModal(action)
    }
  }

  return (
    <div className="flex h-full bg-[#212121] text-[#ececec] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeChat={activeChat}
        chats={chats}
        user={user}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLibrary={() => setLibraryOpen(true)}
        onUserAction={handleUserAction}
      />

      <main className="flex flex-col flex-1 min-w-0 h-full">
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#2f2f2f] shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-[#2f2f2f] transition-colors"
              aria-label="Open sidebar"
            >
              <IconMenu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNewChat}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-base font-semibold text-[#ececec]">Neo</span>
            </button>
            <ModelSelector selected={selectedModel} onSelect={(id) => {
              setSelectedModel(id)
              const label = models.find((m) => m.id === id)?.label || id
              showToast(`Model switched to ${label}`)
            }} />
          </div>
          <button
            type="button"
            onClick={handleNewChat}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
              text-sm text-[#8e8ea0] hover:text-[#ececec] hover:bg-[#2f2f2f]
              transition-colors border border-[#424242]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        </header>

        <ChatArea
          messages={messages}
          onSuggestionClick={handleSuggestion}
          onCopy={handleCopy}
          onFeedback={handleFeedback}
          onRegenerate={handleRegenerate}
        />

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          onAttach={handleAttach}
          onMic={handleMic}
          isListening={isListening}
          attachedFile={attachedFile}
        />
      </main>

      <SearchPanel
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        chats={chats}
        onSelectChat={handleSelectChat}
      />

      <LibraryPanel
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelectItem={handleLibraryItem}
      />

      <InfoModal
        type={infoModal}
        onClose={() => setInfoModal(null)}
        onAction={(action) => {
          if (action === 'upgrade-confirmed') showToast('Upgrade flow started!')
          if (action === 'data-controls') showToast('Data controls opened')
        }}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}

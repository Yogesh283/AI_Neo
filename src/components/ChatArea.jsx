import { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import WelcomeScreen from './WelcomeScreen'

export default function ChatArea({
  messages,
  onSuggestionClick,
  onCopy,
  onFeedback,
  onRegenerate,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return <WelcomeScreen onSuggestionClick={onSuggestionClick} />
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-6">
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            onCopy={onCopy}
            onFeedback={onFeedback}
            onRegenerate={
              msg.role === 'assistant'
                ? () => onRegenerate(index)
                : undefined
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

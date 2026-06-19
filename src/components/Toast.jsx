export default function Toast({ message, visible }) {
  if (!visible || !message) return null

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100]
        px-4 py-2.5 rounded-xl bg-[#2f2f2f] border border-[#424242]
        text-sm text-[#ececec] shadow-xl animate-in fade-in"
      role="status"
    >
      {message}
    </div>
  )
}

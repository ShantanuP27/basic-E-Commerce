import { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! Ask me anything about our products.' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setInput('')
    // Prior turns for multi-turn context: drop the initial greeting (index 0),
    // map to the {role, content} shape the backend expects, cap at last 10.
    const history = messages
      .slice(1)
      .map((m) => ({ role: m.role, content: m.text }))
      .slice(-10)
    setMessages((m) => [...m, { role: 'user', text }])
    setSending(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const reply = data.reply ?? data.message ?? JSON.stringify(data)
      setMessages((m) => [...m, { role: 'assistant', text: reply }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: 'Sorry, the chat service is unavailable right now.' },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="chat-window" role="dialog" aria-label="Chat">
          <div className="chat-header">Assistant</div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {sending && <div className="chat-msg chat-msg-assistant">…</div>}
            <div ref={endRef} />
          </div>
          <form className="chat-input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Chat message"
            />
            <button type="submit" disabled={sending}>Send</button>
          </form>
        </div>
      )}
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { getBotResponse, welcomeMessage, quickSuggestions } from '@lib/chatbotRules'
import { useCursorHover } from '@hooks/useCursorHover'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false) // Don't auto-open

  // Cursor hover effects
  const buttonHover = useCursorHover({ text: 'Chat' })
  const sendHover = useCursorHover({ text: 'Send' })
  const suggestionHover = useCursorHover({ text: 'Select' })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date(),
        suggestions: quickSuggestions
      }
      setMessages([welcomeMsg])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const { response, suggestions } = getBotResponse(content)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        suggestions
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    // Optional: Auto-send suggestion
    // handleSendMessage(suggestion)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={buttonHover.onMouseEnter}
        onMouseLeave={buttonHover.onMouseLeave}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-gradient-to-r from-accent to-accent-hover rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 left-8 z-50 w-[calc(100vw-4rem)] md:w-[420px] h-[70vh] max-h-[800px] min-h-[500px] rounded-2xl flex flex-col overflow-hidden cinematic-chatbot-dark backdrop-blur-lg"
          >
            {/* Header */}
            <div className="p-4 gold-gradient border-b border-[rgba(212,175,55,0.25)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#131f0f] border border-[#e8c547]/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#131f0f]">Saxby Films Assistant</h3>
                  <p className="text-xs text-[#1f2b1a]/80">Online • Usually replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white'
                          : 'bg-surface-hover'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-surface-hover px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions - Always show when chatbot is open */}
            {isOpen && (
              <div className="px-4 py-2 border-t border-white/10">
                <p className="text-xs secondary mb-2">Suggested responses:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-surface-secondary hover:bg-surface-tertiary rounded-full text-xs transition-colors"
                      {...suggestionHover}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 surface-secondary border border-light rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  onMouseEnter={sendHover.onMouseEnter}
                  onMouseLeave={sendHover.onMouseLeave}
                  className="w-10 h-10 bg-gradient-to-r from-accent to-accent-hover rounded-full flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

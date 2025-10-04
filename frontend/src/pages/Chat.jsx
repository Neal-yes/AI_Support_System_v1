import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Send, 
  Menu, 
  X, 
  Plus, 
  MessageSquare, 
  Settings, 
  LogOut, 
  User,
  Bot,
  MoreVertical,
  Trash2,
  Search
} from 'lucide-react'

function Chat({ onLogout }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '您好！我是智能客服助手，有什么可以帮助您的吗？',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [conversations, setConversations] = useState([
    { id: 1, title: '新对话', lastMessage: '您好！我是智能客服...', active: true },
    { id: 2, title: '产品咨询', lastMessage: '请问有什么可以帮助您的...', active: false },
    { id: 3, title: '技术支持', lastMessage: '我会帮您解决技术问题...', active: false },
    { id: 4, title: '账户管理', lastMessage: '关于账户的相关问题...', active: false },
    { id: 5, title: '订单查询', lastMessage: '请提供您的订单号...', active: false }
  ])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')

    // 模拟AI回复
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botReply])
    }, 1000)
  }

  const generateBotResponse = (userMessage) => {
    const responses = {
      '你好': '您好！很高兴为您服务，请问有什么可以帮助您的吗？',
      '帮助': '我可以帮助您解决各种问题，包括：产品咨询、技术支持、账户管理等。请告诉我您需要什么帮助。',
      '谢谢': '不客气！如果还有其他问题，随时欢迎咨询。',
      default: `我已经收到您的消息："${userMessage}"。我会尽快为您处理。请问还有其他需要帮助的吗？`
    }

    const lowerMessage = userMessage.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return value
      }
    }
    return responses.default
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewConversation = () => {
    const newConv = {
      id: conversations.length + 1,
      title: `新对话 ${conversations.length + 1}`,
      lastMessage: '开始新对话...',
      active: false
    }
    setConversations(prev => prev.map(c => ({ ...c, active: false })).concat(newConv))
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: '您好！我是智能客服助手，有什么可以帮助您的吗？',
        timestamp: new Date()
      }
    ])
  }

  const handleDeleteConversation = (e, convId) => {
    e.stopPropagation() // 阻止事件冒泡，避免触发对话选择
    
    // 至少保留一个对话
    if (conversations.length <= 1) {
      alert('至少需要保留一个对话')
      return
    }

    const deletedConv = conversations.find(c => c.id === convId)
    const updatedConversations = conversations.filter(c => c.id !== convId)

    // 如果删除的是当前激活的对话，激活第一个对话
    if (deletedConv.active && updatedConversations.length > 0) {
      updatedConversations[0].active = true
      // 重置消息为初始状态
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: '您好！我是智能客服助手，有什么可以帮助您的吗？',
          timestamp: new Date()
        }
      ])
    }

    setConversations(updatedConversations)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  // 过滤对话列表
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return conv.title.toLowerCase().includes(query) || 
           conv.lastMessage.toLowerCase().includes(query)
  })

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 侧边栏 */}
      <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        {/* 侧边栏头部 */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">对话列表</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition mb-3"
          >
            <Plus className="w-4 h-4" />
            <span>新建对话</span>
          </button>
          
          {/* 搜索框 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索聊天记录..."
              className="w-full pl-9 pr-3 py-2 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-white transition" />
              </button>
            )}
          </div>
        </div>

        {/* 对话历史 */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`group p-3 rounded-lg mb-2 cursor-pointer transition relative ${
                  conv.active ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{conv.title}</h3>
                    <p className="text-xs text-gray-400 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {/* 删除按钮 - 鼠标悬停时显示 */}
                  <button
                    onClick={(e) => handleDeleteConversation(e, conv.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-600 rounded-md flex-shrink-0"
                    title="删除对话"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-white" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Search className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm text-center">
                未找到匹配的聊天记录
              </p>
              <p className="text-gray-500 text-xs text-center mt-1">
                试试其他关键词
              </p>
            </div>
          )}
        </div>

        {/* 侧边栏底部 */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/admin"
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition text-left text-white"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">管理后台</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition text-left text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">退出登录</span>
          </button>
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">智能客服助手</h1>
                <p className="text-xs text-green-600">在线</p>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 message-animation ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* 头像 */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* 消息内容 */}
              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div className={`px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            {/* 输入框 */}
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入消息... (按 Enter 发送，Shift + Enter 换行)"
                  className="input-focus w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="1"
                  style={{ minHeight: '52px', maxHeight: '200px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
                  }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="h-[52px] px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span className="font-semibold">发送</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat


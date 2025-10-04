import React from 'react'
import { AlertCircle } from 'lucide-react'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, type = 'warning' }) {
  if (!isOpen) return null

  const typeStyles = {
    warning: {
      bg: 'bg-yellow-100',
      icon: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    },
    danger: {
      bg: 'bg-red-100',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    },
    info: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  }

  const style = typeStyles[type]

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 ${style.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <AlertCircle className={`w-6 h-6 ${style.icon}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`flex-1 px-4 py-2 text-white rounded-lg transition ${style.button}`}
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog


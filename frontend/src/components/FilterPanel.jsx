import React from 'react'
import { X } from 'lucide-react'
import Select from './Select'

function FilterPanel({ isOpen, onClose, onApply, filters, setFilters }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[45]">
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl z-[45]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">筛选条件</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={filters.status || ''}
                onChange={(value) => setFilters({...filters, status: value})}
                placeholder="全部"
                options={[
                  { value: '', label: '全部' },
                  { value: '已上线', label: '已上线' },
                  { value: '待审核', label: '待审核' },
                  { value: '草稿', label: '草稿' },
                  { value: '已下线', label: '已下线' }
                ]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <Select
                value={filters.category || ''}
                onChange={(value) => setFilters({...filters, category: value})}
                placeholder="全部"
                options={[
                  { value: '', label: '全部' },
                  { value: 'IT运维', label: 'IT运维' },
                  { value: '人力资源', label: '人力资源' },
                  { value: '财务制度', label: '财务制度' },
                  { value: '产品手册', label: '产品手册' }
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">作者</label>
              <input
                type="text"
                value={filters.author || ''}
                onChange={(e) => setFilters({...filters, author: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="输入作者名称"
              />
            </div>
          </div>

          <div className="p-4 border-t flex gap-3">
            <button
              onClick={() => setFilters({})}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              重置
            </button>
            <button
              onClick={() => {
                onApply()
                onClose()
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700"
            >
              应用
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel


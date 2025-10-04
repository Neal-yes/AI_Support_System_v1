import React, { useState } from 'react'
import { Plus, Search, Filter, Upload, Download, Edit, Trash2, Eye, FileText, FolderTree, Save, X as XIcon } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Toast from '../../components/Toast'
import FilterPanel from '../../components/FilterPanel'
import Select from '../../components/Select'

function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [toast, setToast] = useState(null)
  const [filters, setFilters] = useState({})
  const [currentItem, setCurrentItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'it',
    content: '',
    status: 'draft'
  })

  const categories = [
    { id: 'all', name: '全部知识', count: 156 },
    { id: 'it', name: 'IT运维', count: 45 },
    { id: 'hr', name: '人力资源', count: 32 },
    { id: 'finance', name: '财务制度', count: 28 },
    { id: 'product', name: '产品手册', count: 51 },
  ]

  const [knowledgeItems, setKnowledgeItems] = useState([
    {
      id: 1,
      title: 'VPN连接故障排查指南',
      category: 'IT运维',
      status: '已上线',
      updateTime: '2024-01-15 14:30',
      author: '张三',
      content: '## VPN连接故障排查\n\n1. 检查网络连接\n2. 验证账号密码\n3. 重启VPN客户端',
    },
    {
      id: 2,
      title: '员工请假流程说明',
      category: '人力资源',
      status: '已上线',
      updateTime: '2024-01-14 10:20',
      author: '李四',
      content: '## 请假流程\n\n1. 填写请假申请\n2. 主管审批\n3. HR备案',
    },
    {
      id: 3,
      title: '差旅报销制度',
      category: '财务制度',
      status: '待审核',
      updateTime: '2024-01-13 16:45',
      author: '王五',
      content: '## 报销流程\n\n详细的报销说明...',
    },
    {
      id: 4,
      title: '产品功能使用手册',
      category: '产品手册',
      status: '已上线',
      updateTime: '2024-01-12 09:15',
      author: '赵六',
      content: '## 产品使用指南\n\n产品的详细使用说明...',
    },
  ])

  const getStatusBadge = (status) => {
    const styles = {
      '已上线': 'bg-green-100 text-green-700',
      '待审核': 'bg-yellow-100 text-yellow-700',
      '草稿': 'bg-gray-100 text-gray-700',
      '已下线': 'bg-red-100 text-red-700',
    }
    return styles[status] || styles['草稿']
  }

  const handleAdd = () => {
    setFormData({
      title: '',
      category: 'it',
      content: '',
      status: 'draft'
    })
    setShowAddModal(true)
  }

  const handleEdit = (item) => {
    setCurrentItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      status: item.status
    })
    setShowEditModal(true)
  }

  const handlePreview = (item) => {
    setCurrentItem(item)
    setShowPreviewModal(true)
  }

  const handleDelete = (item) => {
    setCurrentItem(item)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== currentItem.id))
    setToast({ type: 'success', message: '知识删除成功！' })
  }

  const handleSave = () => {
    if (showAddModal) {
      const newItem = {
        id: knowledgeItems.length + 1,
        title: formData.title,
        category: formData.category,
        status: formData.status === 'draft' ? '草稿' : '已上线',
        updateTime: new Date().toLocaleString('zh-CN'),
        author: '当前用户',
        content: formData.content,
      }
      setKnowledgeItems([...knowledgeItems, newItem])
      setShowAddModal(false)
      setToast({ type: 'success', message: '知识添加成功！' })
    } else if (showEditModal) {
      setKnowledgeItems(knowledgeItems.map(item => 
        item.id === currentItem.id 
          ? { ...item, ...formData, updateTime: new Date().toLocaleString('zh-CN') }
          : item
      ))
      setShowEditModal(false)
      setToast({ type: 'success', message: '知识更新成功！' })
    }
  }

  const handleImport = () => {
    setShowImportModal(true)
  }

  const handleExport = () => {
    setToast({ type: 'info', message: '正在导出知识库数据...' })
    setTimeout(() => {
      setToast({ type: 'success', message: '导出成功！已保存到下载目录' })
    }, 1500)
  }

  const applyFilters = () => {
    setToast({ type: 'success', message: '筛选条件已应用' })
  }

  return (
    <div className="p-6 space-y-6">
      {/* 顶部操作栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索知识标题、内容..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowFilterPanel(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">筛选</span>
            </button>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <button 
              onClick={handleImport}
              className="flex-1 lg:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>批量导入</span>
            </button>
            <button 
              onClick={handleExport}
              className="flex-1 lg:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>导出</span>
            </button>
            <button 
              onClick={handleAdd}
              className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>新增知识</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧分类 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FolderTree className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">知识分类</h3>
            </div>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{cat.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === cat.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧知识列表 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      知识标题
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      分类
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      更新时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      作者
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {knowledgeItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-800">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{item.updateTime}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{item.author}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handlePreview(item)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition" 
                            title="预览"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition" 
                            title="编辑"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item)}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition" 
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 新增知识弹窗 */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="新增知识" size="lg">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">知识标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入知识标题"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">知识分类 *</label>
              <Select
                value={formData.category}
                onChange={(value) => setFormData({...formData, category: value})}
                options={[
                  { value: 'it', label: 'IT运维' },
                  { value: 'hr', label: '人力资源' },
                  { value: 'finance', label: '财务制度' },
                  { value: 'product', label: '产品手册' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({...formData, status: value})}
                options={[
                  { value: 'draft', label: '草稿' },
                  { value: 'published', label: '已上线' }
                ]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">知识内容 *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="支持Markdown格式..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 编辑知识弹窗 */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="编辑知识" size="lg">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">知识标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">知识分类 *</label>
              <Select
                value={formData.category}
                onChange={(value) => setFormData({...formData, category: value})}
                options={[
                  { value: 'IT运维', label: 'IT运维' },
                  { value: '人力资源', label: '人力资源' },
                  { value: '财务制度', label: '财务制度' },
                  { value: '产品手册', label: '产品手册' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({...formData, status: value})}
                options={[
                  { value: '草稿', label: '草稿' },
                  { value: '待审核', label: '待审核' },
                  { value: '已上线', label: '已上线' },
                  { value: '已下线', label: '已下线' }
                ]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">知识内容 *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 预览弹窗 */}
      <Modal isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)} title="知识预览" size="lg">
        {currentItem && (
          <div className="p-6">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentItem.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>分类：{currentItem.category}</span>
                <span>作者：{currentItem.author}</span>
                <span>更新时间：{currentItem.updateTime}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(currentItem.status)}`}>
                  {currentItem.status}
                </span>
              </div>
            </div>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">{currentItem.content}</div>
            </div>
          </div>
        )}
      </Modal>

      {/* 批量导入弹窗 */}
      <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)} title="批量导入知识" size="md">
        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">点击或拖拽文件到此区域上传</p>
            <p className="text-xs text-gray-500">支持格式：Excel, CSV, Word, PPT, Markdown</p>
            <input type="file" className="hidden" accept=".xlsx,.xls,.csv,.docx,.doc,.pptx,.ppt,.md" />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">导入说明</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Excel/CSV：需包含标题、分类、内容等字段</li>
              <li>• Word/PPT：自动提取文字内容和排版结构</li>
              <li>• Markdown：直接导入格式化内容</li>
            </ul>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowImportModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => {
                setShowImportModal(false)
                setToast({ type: 'success', message: '文件导入成功！共导入 156 条知识' })
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700"
            >
              开始导入
            </button>
          </div>
        </div>
      </Modal>

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="确认删除"
        message={`确定要删除知识"${currentItem?.title}"吗？此操作不可恢复。`}
        type="danger"
      />

      {/* 筛选面板 */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApply={applyFilters}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Toast提示 */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default KnowledgeBase

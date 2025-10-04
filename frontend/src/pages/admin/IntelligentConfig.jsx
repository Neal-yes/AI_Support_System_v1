import React, { useState } from 'react'
import { Plus, Search, Brain, Tag, Settings2, Edit, Trash2, TestTube, Save } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Select from '../../components/Select'

function IntelligentConfig() {
  const [activeTab, setActiveTab] = useState('intent')
  const [showAddIntentModal, setShowAddIntentModal] = useState(false)
  const [showEditIntentModal, setShowEditIntentModal] = useState(false)
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [showEditRuleModal, setShowEditRuleModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [intentForm, setIntentForm] = useState({
    name: '',
    keywords: '',
    priority: '中',
    status: '已启用'
  })
  const [ruleForm, setRuleForm] = useState({
    name: '',
    type: '精确匹配',
    condition: '',
    action: ''
  })

  const [intents, setIntents] = useState([
    { id: 1, name: '加班申请流程', keywords: '加班,申请,流程', priority: '高', status: '已启用' },
    { id: 2, name: 'VPN连接故障', keywords: 'VPN,连接,故障', priority: '高', status: '已启用' },
    { id: 3, name: '差旅报销', keywords: '差旅,报销,费用', priority: '中', status: '已启用' },
    { id: 4, name: '密码重置', keywords: '密码,重置,忘记', priority: '高', status: '已启用' },
  ])

  const [rules, setRules] = useState([
    { id: 1, name: '关键词精确匹配', type: '精确匹配', condition: '包含"报销"', action: '返回报销流程' },
    { id: 2, name: '多轮对话引导', type: '上下文规则', condition: '询问报销类型', action: '引导选择' },
    { id: 3, name: '兜底规则', type: '兜底规则', condition: '未识别', action: '转人工客服' },
  ])

  const handleAddIntent = () => {
    setIntentForm({ name: '', keywords: '', priority: '中', status: '已启用' })
    setShowAddIntentModal(true)
  }

  const handleEditIntent = (intent) => {
    setCurrentItem(intent)
    setIntentForm(intent)
    setShowEditIntentModal(true)
  }

  const handleTestIntent = (intent) => {
    setCurrentItem(intent)
    setShowTestModal(true)
  }

  const handleDeleteIntent = (intent) => {
    setCurrentItem(intent)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteIntent = () => {
    setIntents(intents.filter(i => i.id !== currentItem.id))
  }

  const handleSaveIntent = () => {
    if (showAddIntentModal) {
      const newIntent = { id: intents.length + 1, ...intentForm }
      setIntents([...intents, newIntent])
      setShowAddIntentModal(false)
    } else if (showEditIntentModal) {
      setIntents(intents.map(i => i.id === currentItem.id ? { ...i, ...intentForm } : i))
      setShowEditIntentModal(false)
    }
  }

  const handleAddRule = () => {
    setRuleForm({ name: '', type: '精确匹配', condition: '', action: '' })
    setShowAddRuleModal(true)
  }

  const handleEditRule = (rule) => {
    setCurrentItem(rule)
    setRuleForm(rule)
    setShowEditRuleModal(true)
  }

  const handleDeleteRule = (rule) => {
    setCurrentItem(rule)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteRule = () => {
    setRules(rules.filter(r => r.id !== currentItem.id))
  }

  const handleSaveRule = () => {
    if (showAddRuleModal) {
      const newRule = { id: rules.length + 1, ...ruleForm }
      setRules([...rules, newRule])
      setShowAddRuleModal(false)
    } else if (showEditRuleModal) {
      setRules(rules.map(r => r.id === currentItem.id ? { ...r, ...ruleForm } : r))
      setShowEditRuleModal(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 标签页切换 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab('intent')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'intent'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Tag className="w-4 h-4" />
                <span>意图管理</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'rules'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings2 className="w-4 h-4" />
                <span>问答规则配置</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'intent' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索意图名称、关键词..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddIntent}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增意图</span>
                </button>
              </div>

              {/* 意图列表 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">意图名称</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">关键词</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">优先级</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {intents.map((intent) => (
                      <tr key={intent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium text-gray-800">{intent.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {intent.keywords.split(',').map((keyword, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            intent.priority === '高' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {intent.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {intent.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleTestIntent(intent)}
                              className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded" 
                              title="测试"
                            >
                              <TestTube className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditIntent(intent)}
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded" 
                              title="编辑"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteIntent(intent)}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded" 
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
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex justify-between">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索规则..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddRule}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增规则</span>
                </button>
              </div>

              {/* 规则列表 */}
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {rule.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">触发条件：</span>
                            <span className="text-gray-800 font-medium">{rule.condition}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">执行动作：</span>
                            <span className="text-gray-800 font-medium">{rule.action}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditRule(rule)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteRule(rule)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 新增/编辑意图弹窗 */}
      <Modal 
        isOpen={showAddIntentModal || showEditIntentModal} 
        onClose={() => {
          setShowAddIntentModal(false)
          setShowEditIntentModal(false)
        }} 
        title={showAddIntentModal ? '新增意图' : '编辑意图'}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">意图名称 *</label>
            <input
              type="text"
              value={intentForm.name}
              onChange={(e) => setIntentForm({...intentForm, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：加班申请流程"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">关键词 *</label>
            <input
              type="text"
              value={intentForm.keywords}
              onChange={(e) => setIntentForm({...intentForm, keywords: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="多个关键词用逗号分隔，如：加班,申请,流程"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">优先级</label>
              <Select
                value={intentForm.priority}
                onChange={(value) => setIntentForm({...intentForm, priority: value})}
                options={[
                  { value: '高', label: '高' },
                  { value: '中', label: '中' },
                  { value: '低', label: '低' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={intentForm.status}
                onChange={(value) => setIntentForm({...intentForm, status: value})}
                options={[
                  { value: '已启用', label: '已启用' },
                  { value: '已禁用', label: '已禁用' }
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddIntentModal(false)
                setShowEditIntentModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSaveIntent}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 新增/编辑规则弹窗 */}
      <Modal 
        isOpen={showAddRuleModal || showEditRuleModal} 
        onClose={() => {
          setShowAddRuleModal(false)
          setShowEditRuleModal(false)
        }} 
        title={showAddRuleModal ? '新增规则' : '编辑规则'}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">规则名称 *</label>
            <input
              type="text"
              value={ruleForm.name}
              onChange={(e) => setRuleForm({...ruleForm, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：关键词精确匹配"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">规则类型 *</label>
            <Select
              value={ruleForm.type}
              onChange={(value) => setRuleForm({...ruleForm, type: value})}
              options={[
                { value: '精确匹配', label: '精确匹配' },
                { value: '模糊匹配', label: '模糊匹配' },
                { value: '上下文规则', label: '上下文规则' },
                { value: '兜底规则', label: '兜底规则' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">触发条件 *</label>
            <input
              type="text"
              value={ruleForm.condition}
              onChange={(e) => setRuleForm({...ruleForm, condition: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：包含'报销'"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">执行动作 *</label>
            <input
              type="text"
              value={ruleForm.action}
              onChange={(e) => setRuleForm({...ruleForm, action: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：返回报销流程"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddRuleModal(false)
                setShowEditRuleModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSaveRule}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 测试意图弹窗 */}
      <Modal isOpen={showTestModal} onClose={() => setShowTestModal(false)} title="意图测试">
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">测试意图：{currentItem?.name}</h4>
            <p className="text-xs text-blue-700">关键词：{currentItem?.keywords}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">输入测试问题</label>
            <textarea
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="输入一个问题测试意图是否能正确识别..."
            />
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">测试结果：</h5>
            <p className="text-sm text-gray-600">等待输入测试问题...</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowTestModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              关闭
            </button>
            <button
              onClick={() => alert('执行意图测试...')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700"
            >
              开始测试
            </button>
          </div>
        </div>
      </Modal>

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={activeTab === 'intent' ? confirmDeleteIntent : confirmDeleteRule}
        title="确认删除"
        message={`确定要删除${activeTab === 'intent' ? '意图' : '规则'}"${currentItem?.name}"吗？`}
        type="danger"
      />
    </div>
  )
}

export default IntelligentConfig

import React, { useState } from 'react'
import { Plus, Search, Database, Play, Edit, Trash2, Copy, AlertCircle, Save, CheckCircle } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Toast from '../../components/Toast'
import Select from '../../components/Select'

function MySQLConfig() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [testParams, setTestParams] = useState({})
  const [testResult, setTestResult] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    category: '财务数据',
    sql: '',
    params: '',
    status: '测试中'
  })

  const [sqlStatements, setSqlStatements] = useState([
    {
      id: 1,
      name: '查询部门报销总额',
      identifier: 'dept_reimburse_monthly',
      category: '财务数据',
      sql: 'SELECT SUM(amount) FROM reimburse WHERE dept_id={{dept_id}} AND month={{month}}',
      params: 'dept_id, month',
      status: '已启用',
      callCount: 156,
    },
    {
      id: 2,
      name: '查询客户数量',
      identifier: 'dept_customer_count',
      category: 'HR数据',
      sql: 'SELECT COUNT(*) FROM customer WHERE dept_id={{dept_id}}',
      params: 'dept_id',
      status: '已启用',
      callCount: 89,
    },
    {
      id: 3,
      name: '查询员工信息',
      identifier: 'employee_info',
      category: 'HR数据',
      sql: 'SELECT name, position FROM employee WHERE emp_id={{emp_id}}',
      params: 'emp_id',
      status: '测试中',
      callCount: 12,
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case '已启用': return 'bg-green-100 text-green-700'
      case '测试中': return 'bg-yellow-100 text-yellow-700'
      case '已禁用': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleAdd = () => {
    setFormData({
      name: '',
      identifier: '',
      category: '财务数据',
      sql: '',
      params: '',
      status: '测试中'
    })
    setShowAddModal(true)
  }

  const handleEdit = (stmt) => {
    setCurrentItem(stmt)
    setFormData(stmt)
    setShowEditModal(true)
  }

  const handleTest = (stmt) => {
    setCurrentItem(stmt)
    // 初始化测试参数
    const params = stmt.params.split(',').reduce((acc, param) => {
      acc[param.trim()] = ''
      return acc
    }, {})
    setTestParams(params)
    setTestResult(null)
    setShowTestModal(true)
  }

  const handleDelete = (stmt) => {
    setCurrentItem(stmt)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    setSqlStatements(sqlStatements.filter(s => s.id !== currentItem.id))
  }

  const handleCopy = (stmt) => {
    setFormData({
      ...stmt,
      id: undefined,
      name: stmt.name + ' (副本)',
      identifier: stmt.identifier + '_copy',
      callCount: 0
    })
    setShowAddModal(true)
  }

  const handleSave = () => {
    if (showAddModal) {
      const newStmt = { 
        id: sqlStatements.length + 1, 
        ...formData,
        callCount: 0
      }
      setSqlStatements([...sqlStatements, newStmt])
      setShowAddModal(false)
    } else if (showEditModal) {
      setSqlStatements(sqlStatements.map(s => 
        s.id === currentItem.id ? { ...s, ...formData } : s
      ))
      setShowEditModal(false)
    }
  }

  const handleTestConnection = () => {
    alert('测试数据库连接中...\n\n连接成功！\n服务器: 192.168.1.100\n数据库: company_db\n状态: 正常')
  }

  const executeTest = () => {
    // 模拟执行SQL测试
    setTestResult({
      success: true,
      data: [
        { id: 1, name: '张三', value: 12500 },
        { id: 2, name: '李四', value: 8900 }
      ],
      executionTime: '45ms',
      rowCount: 2
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* 安全提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-1">安全提醒</h4>
            <p className="text-sm text-blue-700">
              所有SQL语句仅使用只读账号执行，且已限制可查询的库/表/字段。请确保参数化配置正确，防止SQL注入风险。
            </p>
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索语句名称、标识符..."
              className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={handleTestConnection}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>测试连接</span>
            </button>
            <button 
              onClick={handleAdd}
              className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>新增语句</span>
            </button>
          </div>
        </div>
      </div>

      {/* SQL语句列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">语句名称</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">标识符</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">分类</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">参数</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">调用次数</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sqlStatements.map((stmt) => (
                <React.Fragment key={stmt.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">{stmt.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                        {stmt.identifier}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{stmt.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {stmt.params.split(',').map((param, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">
                            {param.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{stmt.callCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(stmt.status)}`}>
                        {stmt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleTest(stmt)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded" 
                          title="测试"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleCopy(stmt)}
                          className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded" 
                          title="复制"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(stmt)}
                          className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded" 
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(stmt)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded" 
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-6 py-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">SQL:</span>
                        <code className="text-xs text-gray-700 font-mono break-all">
                          {stmt.sql}
                        </code>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 调用日志摘要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">今日调用</span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">257</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% 较昨日</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">成功率</span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">98.5%</p>
          <p className="text-xs text-green-600 mt-1">↑ 0.5% 较昨日</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">平均响应</span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">120ms</p>
          <p className="text-xs text-green-600 mt-1">↓ 15ms 较昨日</p>
        </div>
      </div>

      {/* 新增/编辑SQL语句弹窗 */}
      <Modal 
        isOpen={showAddModal || showEditModal} 
        onClose={() => {
          setShowAddModal(false)
          setShowEditModal(false)
        }} 
        title={showAddModal ? '新增SQL语句' : '编辑SQL语句'}
        size="lg"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">语句名称 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：查询部门报销总额"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">唯一标识符 *</label>
              <input
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：dept_reimburse_monthly"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类 *</label>
              <Select
                value={formData.category}
                onChange={(value) => setFormData({...formData, category: value})}
                options={[
                  { value: '财务数据', label: '财务数据' },
                  { value: 'HR数据', label: 'HR数据' },
                  { value: '业务数据', label: '业务数据' },
                  { value: '其他', label: '其他' }
                ]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SQL语句 *</label>
            <textarea
              value={formData.sql}
              onChange={(e) => setFormData({...formData, sql: e.target.value})}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="SELECT * FROM table WHERE id={{param}}"
            />
            <p className="text-xs text-gray-500 mt-1">使用 {'{{'} param {'}}'}  格式定义参数</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">参数列表</label>
              <input
                type="text"
                value={formData.params}
                onChange={(e) => setFormData({...formData, params: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="多个参数用逗号分隔"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({...formData, status: value})}
                options={[
                  { value: '测试中', label: '测试中' },
                  { value: '已启用', label: '已启用' },
                  { value: '已禁用', label: '已禁用' }
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddModal(false)
                setShowEditModal(false)
              }}
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

      {/* 测试SQL弹窗 */}
      <Modal isOpen={showTestModal} onClose={() => setShowTestModal(false)} title="测试SQL语句" size="lg">
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">SQL语句</h4>
            <code className="text-xs text-gray-700 font-mono break-all">{currentItem?.sql}</code>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">参数设置</h4>
            {Object.keys(testParams).map((param) => (
              <div key={param}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{param}</label>
                <input
                  type="text"
                  value={testParams[param]}
                  onChange={(e) => setTestParams({...testParams, [param]: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`请输入 ${param} 的值`}
                />
              </div>
            ))}
          </div>
          {testResult && (
            <div className={`border rounded-lg p-4 ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <h5 className="text-sm font-semibold">执行结果</h5>
              </div>
              {testResult.success && (
                <>
                  <p className="text-xs text-gray-600 mb-2">
                    执行时间: {testResult.executionTime} | 返回行数: {testResult.rowCount}
                  </p>
                  <div className="bg-white rounded border border-gray-200 p-3 max-h-60 overflow-auto">
                    <pre className="text-xs font-mono">{JSON.stringify(testResult.data, null, 2)}</pre>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowTestModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              关闭
            </button>
            <button
              onClick={executeTest}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              执行测试
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
        message={`确定要删除SQL语句"${currentItem?.name}"吗？此操作不可恢复。`}
        type="danger"
      />
    </div>
  )
}

export default MySQLConfig

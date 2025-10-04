import React, { useState } from 'react'
import { Save, Building2, Bot, Mail, MessageSquare, Database, Check, AlertCircle } from 'lucide-react'
import Toast from '../../components/Toast'
import Modal from '../../components/Modal'
import Select from '../../components/Select'

function SystemConfig() {
  const [config, setConfig] = useState({
    companyName: 'XX企业',
    assistantName: 'XX企业内部助手',
    notifyChannel: 'wechat',
    notifyReceivers: 'admin@company.com',
  })

  const [toast, setToast] = useState(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [currentInterface, setCurrentInterface] = useState(null)
  const [interfaceConfig, setInterfaceConfig] = useState({
    appId: '',
    appSecret: '',
    webhookUrl: ''
  })

  const handleSave = () => {
    setToast({ type: 'info', message: '正在保存配置...' })
    setTimeout(() => {
      setToast({ type: 'success', message: '配置保存成功！' })
    }, 1000)
  }

  const handleTestConnection = (interfaceName) => {
    setToast({ type: 'info', message: `正在测试${interfaceName}连接...` })
    setTimeout(() => {
      setToast({ type: 'success', message: `${interfaceName}连接测试成功！` })
    }, 1500)
  }

  const handleOpenConfig = (interfaceItem) => {
    setCurrentInterface(interfaceItem)
    setInterfaceConfig({
      appId: '',
      appSecret: '',
      webhookUrl: ''
    })
    setShowConfigModal(true)
  }

  const handleSaveInterfaceConfig = () => {
    setShowConfigModal(false)
    setToast({ type: 'success', message: `${currentInterface.name}配置保存成功！` })
  }

  const interfaceStatus = [
    { name: '企业微信', type: 'wechat', status: '已连接', lastSync: '2024-01-15 14:30' },
    { name: '钉钉', type: 'dingtalk', status: '未配置', lastSync: '-' },
    { name: 'OA系统', type: 'oa', status: '已连接', lastSync: '2024-01-15 10:20' },
  ]

  const notifyScenarios = [
    { name: 'SQL调用失败', enabled: true, channel: '企业微信 + 邮件' },
    { name: '权限越权尝试', enabled: true, channel: '企业微信' },
    { name: '知识库批量导入完成', enabled: true, channel: '邮件' },
    { name: '系统异常', enabled: true, channel: '企业微信 + 邮件' },
  ]

  return (
    <div className="p-6 space-y-6">

      {/* 基础设置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">基础设置</h3>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              企业名称
            </label>
            <input
              type="text"
              value={config.companyName}
              onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              智能客服名称
            </label>
            <input
              type="text"
              value={config.assistantName}
              onChange={(e) => setConfig({ ...config, assistantName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如: XX企业内部助手"
            />
          </div>
        </div>
      </div>

      {/* 接口配置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">接口配置</h3>
            </div>
            <button 
              onClick={() => {
                setToast({ type: 'info', message: '正在测试所有接口连接...' })
                setTimeout(() => {
                  setToast({ type: 'success', message: '所有接口连接正常！' })
                }, 2000)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              测试所有连接
            </button>
          </div>
        <div className="space-y-3">
          {interfaceStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.status === '已连接' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {item.type === 'wechat' && <MessageSquare className="w-5 h-5 text-green-600" />}
                  {item.type === 'dingtalk' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                  {item.type === 'oa' && <Database className="w-5 h-5 text-purple-600" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">最后同步: {item.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${
                  item.status === '已连接' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.status}
                </span>
                <button 
                  onClick={() => handleOpenConfig(item)}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                >
                  配置
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 通知配置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">通知配置</h3>
        </div>
        
        <div className="space-y-4 mb-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              通知渠道
            </label>
            <Select
              value={config.notifyChannel}
              onChange={(value) => setConfig({ ...config, notifyChannel: value })}
              options={[
                { value: 'wechat', label: '企业微信' },
                { value: 'email', label: '邮件' },
                { value: 'both', label: '企业微信 + 邮件' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              通知接收人（邮箱，多个用逗号分隔）
            </label>
            <input
              type="text"
              value={config.notifyReceivers}
              onChange={(e) => setConfig({ ...config, notifyReceivers: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@company.com, manager@company.com"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">通知场景配置</h4>
          <div className="space-y-2">
            {notifyScenarios.map((scenario, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={scenario.enabled}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-800">{scenario.name}</span>
                </div>
                <span className="text-xs text-gray-500">{scenario.channel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 系统日志 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">系统日志</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto font-mono text-xs text-gray-700">
          <div className="space-y-1">
            <p>[2024-01-15 14:30:25] [INFO] 知识库导入成功，共导入 156 条记录</p>
            <p>[2024-01-15 14:25:18] [INFO] SQL语句 dept_customer_monthly 执行成功</p>
            <p>[2024-01-15 14:20:42] [WARN] SQL语句 employee_info 执行失败：数据库连接超时</p>
            <p>[2024-01-15 14:15:33] [INFO] 用户 admin 登录成功，IP: 192.168.1.100</p>
            <p>[2024-01-15 14:10:21] [INFO] 系统配置已更新</p>
            <p>[2024-01-15 14:05:15] [INFO] 企业微信接口连接成功</p>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md hover:shadow-lg transition"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">保存配置</span>
        </button>
      </div>

      {/* 接口配置弹窗 */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`配置${currentInterface?.name}`}
      >
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-700">
              配置{currentInterface?.name}接口参数，用于系统通知和数据同步
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App ID</label>
            <input
              type="text"
              value={interfaceConfig.appId}
              onChange={(e) => setInterfaceConfig({...interfaceConfig, appId: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入App ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App Secret</label>
            <input
              type="password"
              value={interfaceConfig.appSecret}
              onChange={(e) => setInterfaceConfig({...interfaceConfig, appSecret: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入App Secret"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
            <input
              type="text"
              value={interfaceConfig.webhookUrl}
              onChange={(e) => setInterfaceConfig({...interfaceConfig, webhookUrl: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/webhook"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => handleTestConnection(currentInterface?.name)}
              className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              测试连接
            </button>
            <button
              onClick={handleSaveInterfaceConfig}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

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

export default SystemConfig


import React, { useState } from 'react'
import { Plus, Search, UserCog, Shield, Edit, Trash2, Key, Clock, Save } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Toast from '../../components/Toast'
import Select from '../../components/Select'

function UserManagement() {
  const [activeTab, setActiveTab] = useState('accounts')
  const [showAddAccountModal, setShowAddAccountModal] = useState(false)
  const [showEditAccountModal, setShowEditAccountModal] = useState(false)
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [showEditRoleModal, setShowEditRoleModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [toast, setToast] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [accountForm, setAccountForm] = useState({
    username: '',
    name: '',
    role: '知识库管理员',
    password: '',
    status: '启用'
  })
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: []
  })

  const [adminAccounts, setAdminAccounts] = useState([
    {
      id: 1,
      username: 'admin',
      name: '超级管理员',
      role: '超级管理员',
      lastLogin: '2024-01-15 14:30',
      ip: '192.168.1.100',
      status: '启用',
    },
    {
      id: 2,
      username: 'mysql_admin',
      name: '张三',
      role: 'MySQL模块管理员',
      lastLogin: '2024-01-15 10:20',
      ip: '192.168.1.101',
      status: '启用',
    },
    {
      id: 3,
      username: 'knowledge_admin',
      name: '李四',
      role: '知识库管理员',
      lastLogin: '2024-01-14 16:45',
      ip: '192.168.1.102',
      status: '启用',
    },
  ])

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: '超级管理员',
      description: '拥有所有模块的完整权限',
      permissions: ['知识库', 'MySQL', '智能配置', '权限管理', '用户管理', '数据统计', '系统配置'],
      userCount: 1,
    },
    {
      id: 2,
      name: 'MySQL模块管理员',
      description: '仅能操作MySQL语句配置模块',
      permissions: ['MySQL语句配置', '数据统计查看'],
      userCount: 2,
    },
    {
      id: 3,
      name: '知识库管理员',
      description: '仅能操作知识库管理模块',
      permissions: ['知识库管理', '数据统计查看'],
      userCount: 3,
    },
  ])

  const availablePermissions = [
    '知识库管理',
    'MySQL语句配置',
    '智能配置',
    '权限管理',
    '用户管理',
    '数据统计查看',
    '系统配置'
  ]

  const handleAddAccount = () => {
    setAccountForm({ username: '', name: '', role: '知识库管理员', password: '', status: '启用' })
    setShowAddAccountModal(true)
  }

  const handleEditAccount = (account) => {
    setCurrentItem(account)
    setAccountForm(account)
    setShowEditAccountModal(true)
  }

  const handleResetPassword = (account) => {
    setCurrentItem(account)
    setShowResetPasswordModal(true)
  }

  const handleDeleteAccount = (account) => {
    setCurrentItem(account)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteAccount = () => {
    setAdminAccounts(adminAccounts.filter(a => a.id !== currentItem.id))
    setToast({ type: 'success', message: '账号删除成功' })
  }

  const handleSaveAccount = () => {
    if (showAddAccountModal) {
      const newAccount = {
        id: adminAccounts.length + 1,
        ...accountForm,
        lastLogin: '-',
        ip: '-'
      }
      setAdminAccounts([...adminAccounts, newAccount])
      setShowAddAccountModal(false)
      setToast({ type: 'success', message: '账号创建成功' })
    } else if (showEditAccountModal) {
      setAdminAccounts(adminAccounts.map(a => 
        a.id === currentItem.id ? { ...a, ...accountForm } : a
      ))
      setShowEditAccountModal(false)
      setToast({ type: 'success', message: '账号更新成功' })
    }
  }

  const handleAddRole = () => {
    setRoleForm({ name: '', description: '', permissions: [] })
    setShowAddRoleModal(true)
  }

  const handleEditRole = (role) => {
    setCurrentItem(role)
    setRoleForm(role)
    setShowEditRoleModal(true)
  }

  const handleDeleteRole = (role) => {
    setCurrentItem(role)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteRole = () => {
    setRoles(roles.filter(r => r.id !== currentItem.id))
    setToast({ type: 'success', message: '角色删除成功' })
  }

  const handleSaveRole = () => {
    if (showAddRoleModal) {
      const newRole = {
        id: roles.length + 1,
        ...roleForm,
        userCount: 0
      }
      setRoles([...roles, newRole])
      setShowAddRoleModal(false)
      setToast({ type: 'success', message: '角色创建成功' })
    } else if (showEditRoleModal) {
      setRoles(roles.map(r => 
        r.id === currentItem.id ? { ...r, ...roleForm } : r
      ))
      setShowEditRoleModal(false)
      setToast({ type: 'success', message: '角色更新成功' })
    }
  }

  const togglePermission = (perm) => {
    if (roleForm.permissions.includes(perm)) {
      setRoleForm({
        ...roleForm,
        permissions: roleForm.permissions.filter(p => p !== perm)
      })
    } else {
      setRoleForm({
        ...roleForm,
        permissions: [...roleForm.permissions, perm]
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 标签页 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'accounts'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserCog className="w-4 h-4" />
                <span>管理员账号</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'roles'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>角色权限</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'accounts' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索账号、姓名..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddAccount}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增账号</span>
                </button>
              </div>

              {/* 账号列表 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">账号</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">姓名</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">角色</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">最后登录</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">登录IP</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {adminAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <code className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {account.username}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-800">{account.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {account.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{account.lastLogin}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{account.ip}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {account.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleResetPassword(account)}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded" 
                              title="重置密码"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditAccount(account)}
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded" 
                              title="编辑"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAccount(account)}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded" 
                              title="禁用"
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

          {activeTab === 'roles' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex justify-end">
                <button 
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增角色</span>
                </button>
              </div>

              {/* 角色列表 */}
              <div className="space-y-3">
                {roles.map((role) => (
                  <div key={role.id} className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-800">{role.name}</h4>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {role.userCount} 个用户
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                        <div>
                          <span className="text-xs text-gray-500 block mb-2">权限范围：</span>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((perm, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditRole(role)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role)}
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

      {/* 新增/编辑账号弹窗 */}
      <Modal
        isOpen={showAddAccountModal || showEditAccountModal}
        onClose={() => {
          setShowAddAccountModal(false)
          setShowEditAccountModal(false)
        }}
        title={showAddAccountModal ? '新增管理员账号' : '编辑管理员账号'}
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">账号 *</label>
              <input
                type="text"
                value={accountForm.username}
                onChange={(e) => setAccountForm({...accountForm, username: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入账号"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
              <input
                type="text"
                value={accountForm.name}
                onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入姓名"
              />
            </div>
          </div>
          {showAddAccountModal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码 *</label>
              <input
                type="password"
                value={accountForm.password}
                onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">角色 *</label>
              <Select
                value={accountForm.role}
                onChange={(value) => setAccountForm({...accountForm, role: value})}
                options={roles.map(role => ({ value: role.name, label: role.name }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <Select
                value={accountForm.status}
                onChange={(value) => setAccountForm({...accountForm, status: value})}
                options={[
                  { value: '启用', label: '启用' },
                  { value: '禁用', label: '禁用' }
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddAccountModal(false)
                setShowEditAccountModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSaveAccount}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 新增/编辑角色弹窗 */}
      <Modal
        isOpen={showAddRoleModal || showEditRoleModal}
        onClose={() => {
          setShowAddRoleModal(false)
          setShowEditRoleModal(false)
        }}
        title={showAddRoleModal ? '新增角色' : '编辑角色'}
        size="lg"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">角色名称 *</label>
            <input
              type="text"
              value={roleForm.name}
              onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入角色名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">角色描述</label>
            <textarea
              value={roleForm.description}
              onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="请输入角色描述"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">权限配置 *</label>
            <div className="grid grid-cols-2 gap-2 p-4 border border-gray-200 rounded-lg">
              {availablePermissions.map((perm, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roleForm.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{perm}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddRoleModal(false)
                setShowEditRoleModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSaveRole}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 重置密码弹窗 */}
      <Modal
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        title="重置密码"
      >
        <div className="p-6 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              确定要重置账号 <strong>{currentItem?.username}</strong> 的密码吗？
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">新密码 *</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入新密码"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">确认密码 *</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请再次输入新密码"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setShowResetPasswordModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => {
                setShowResetPasswordModal(false)
                setToast({ type: 'success', message: '密码重置成功' })
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700"
            >
              确认重置
            </button>
          </div>
        </div>
      </Modal>

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={activeTab === 'accounts' ? confirmDeleteAccount : confirmDeleteRole}
        title="确认删除"
        message={`确定要删除${activeTab === 'accounts' ? '账号' : '角色'}"${currentItem?.name || currentItem?.username}"吗？`}
        type="danger"
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

export default UserManagement

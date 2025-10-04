import React, { useState } from 'react'
import { Plus, Search, Shield, Building2, Database, Edit, Trash2, Save } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Select from '../../components/Select'
import Toast from '../../components/Toast'

function DataPermission() {
  const [activeTab, setActiveTab] = useState('department')
  const [showAddDeptModal, setShowAddDeptModal] = useState(false)
  const [showEditDeptModal, setShowEditDeptModal] = useState(false)
  const [showAddPermModal, setShowAddPermModal] = useState(false)
  const [showEditPermModal, setShowEditPermModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [deptForm, setDeptForm] = useState({
    name: '',
    code: '',
    parent: '',
    status: '启用'
  })
  const [permForm, setPermForm] = useState({
    sqlName: '',
    identifier: '',
    allowedDepts: [],
    deniedDepts: [],
    rowLevel: false
  })

  const [departments, setDepartments] = useState([
    { id: 1, name: '市场部', code: '002', parent: '营销中心', status: '启用', employees: 45 },
    { id: 2, name: '招商部', code: '001', parent: '营销中心', status: '启用', employees: 32 },
    { id: 3, name: '技术部', code: '003', parent: '研发中心', status: '启用', employees: 68 },
    { id: 4, name: '财务部', code: '004', parent: '行政中心', status: '启用', employees: 28 },
  ])

  const [permissions, setPermissions] = useState([
    {
      id: 1,
      sqlName: '查询部门客户数',
      identifier: 'dept_customer_monthly',
      allowedDepts: ['市场部', '招商部'],
      deniedDepts: [],
      rowLevel: '是',
    },
    {
      id: 2,
      sqlName: '查询部门报销总额',
      identifier: 'dept_reimburse_monthly',
      allowedDepts: ['财务部'],
      deniedDepts: ['市场部', '招商部'],
      rowLevel: '是',
    },
    {
      id: 3,
      sqlName: '查询员工信息',
      identifier: 'employee_info',
      allowedDepts: ['技术部', '财务部'],
      deniedDepts: [],
      rowLevel: '否',
    },
  ])

  const handleAddDept = () => {
    setDeptForm({ name: '', code: '', parent: '', status: '启用' })
    setShowAddDeptModal(true)
  }

  const handleEditDept = (dept) => {
    setCurrentItem(dept)
    setDeptForm(dept)
    setShowEditDeptModal(true)
  }

  const handleDeleteDept = (dept) => {
    setCurrentItem(dept)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteDept = () => {
    setDepartments(departments.filter(d => d.id !== currentItem.id))
  }

  const handleSaveDept = () => {
    if (showAddDeptModal) {
      const newDept = { id: departments.length + 1, ...deptForm, employees: 0 }
      setDepartments([...departments, newDept])
      setShowAddDeptModal(false)
    } else if (showEditDeptModal) {
      setDepartments(departments.map(d => d.id === currentItem.id ? { ...d, ...deptForm } : d))
      setShowEditDeptModal(false)
    }
  }

  const handleAddPerm = () => {
    setPermForm({
      sqlName: '',
      identifier: '',
      allowedDepts: [],
      deniedDepts: [],
      rowLevel: false
    })
    setShowAddPermModal(true)
  }

  const handleEditPerm = (perm) => {
    setCurrentItem(perm)
    setPermForm({
      ...perm,
      rowLevel: perm.rowLevel === '是'
    })
    setShowEditPermModal(true)
  }

  const handleDeletePerm = (perm) => {
    setCurrentItem(perm)
    setShowDeleteConfirm(true)
  }

  const confirmDeletePerm = () => {
    setPermissions(permissions.filter(p => p.id !== currentItem.id))
  }

  const handleSavePerm = () => {
    const formattedData = {
      ...permForm,
      rowLevel: permForm.rowLevel ? '是' : '否'
    }
    if (showAddPermModal) {
      const newPerm = { id: permissions.length + 1, ...formattedData }
      setPermissions([...permissions, newPerm])
      setShowAddPermModal(false)
    } else if (showEditPermModal) {
      setPermissions(permissions.map(p => p.id === currentItem.id ? { ...p, ...formattedData } : p))
      setShowEditPermModal(false)
    }
  }

  const toggleDept = (deptName, list, setList) => {
    if (list.includes(deptName)) {
      setList(list.filter(d => d !== deptName))
    } else {
      setList([...list, deptName])
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 安全提示 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">权限隔离机制</h4>
            <p className="text-sm text-yellow-700">
              通过部门-数据权限绑定，确保仅本部门用户可访问所属部门数据。禁止权限优先级高于允许权限。
            </p>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab('department')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'department'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>部门管理</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('permission')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'permission'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Database className="w-4 h-4" />
                <span>SQL语句权限绑定</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'department' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索部门名称、编码..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddDept}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增部门</span>
                </button>
              </div>

              {/* 部门列表 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">部门名称</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">部门编码</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">上级部门</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">员工数</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {departments.map((dept) => (
                      <tr key={dept.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-800">{dept.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {dept.code}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{dept.parent}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{dept.employees}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {dept.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditDept(dept)}
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDept(dept)}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
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

          {activeTab === 'permission' && (
            <div className="space-y-4">
              {/* 操作栏 */}
              <div className="flex justify-between">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索SQL语句..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddPerm}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>配置权限</span>
                </button>
              </div>

              {/* 权限列表 */}
              <div className="space-y-3">
                {permissions.map((perm) => (
                  <div key={perm.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-800">{perm.sqlName}</h4>
                          <code className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                            {perm.identifier}
                          </code>
                          {perm.rowLevel === '是' && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              行级权限
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditPerm(perm)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePerm(perm)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block mb-2">允许访问部门：</span>
                        <div className="flex flex-wrap gap-1">
                          {perm.allowedDepts.map((dept, i) => (
                            <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                              {dept}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-2">禁止访问部门：</span>
                        <div className="flex flex-wrap gap-1">
                          {perm.deniedDepts.length > 0 ? (
                            perm.deniedDepts.map((dept, i) => (
                              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                                {dept}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">无</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 新增/编辑部门弹窗 */}
      <Modal 
        isOpen={showAddDeptModal || showEditDeptModal} 
        onClose={() => {
          setShowAddDeptModal(false)
          setShowEditDeptModal(false)
        }} 
        title={showAddDeptModal ? '新增部门' : '编辑部门'}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">部门名称 *</label>
            <input
              type="text"
              value={deptForm.name}
              onChange={(e) => setDeptForm({...deptForm, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：市场部"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">部门编码 *</label>
              <input
                type="text"
                value={deptForm.code}
                onChange={(e) => setDeptForm({...deptForm, code: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：002"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">上级部门</label>
              <input
                type="text"
                value={deptForm.parent}
                onChange={(e) => setDeptForm({...deptForm, parent: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：营销中心"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
            <Select
              value={deptForm.status}
              onChange={(value) => setDeptForm({...deptForm, status: value})}
              options={[
                { value: '启用', label: '启用' },
                { value: '禁用', label: '禁用' }
              ]}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddDeptModal(false)
                setShowEditDeptModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSaveDept}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 新增/编辑权限弹窗 */}
      <Modal 
        isOpen={showAddPermModal || showEditPermModal} 
        onClose={() => {
          setShowAddPermModal(false)
          setShowEditPermModal(false)
        }} 
        title={showAddPermModal ? '新增权限配置' : '编辑权限配置'}
        size="lg"
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SQL语句名称 *</label>
              <input
                type="text"
                value={permForm.sqlName}
                onChange={(e) => setPermForm({...permForm, sqlName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：查询部门客户数"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标识符 *</label>
              <input
                type="text"
                value={permForm.identifier}
                onChange={(e) => setPermForm({...permForm, identifier: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：dept_customer_monthly"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">允许访问部门</label>
            <div className="grid grid-cols-3 gap-2 p-4 border border-gray-200 rounded-lg">
              {departments.map(dept => (
                <label key={dept.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permForm.allowedDepts.includes(dept.name)}
                    onChange={() => {
                      const newAllowed = permForm.allowedDepts.includes(dept.name)
                        ? permForm.allowedDepts.filter(d => d !== dept.name)
                        : [...permForm.allowedDepts, dept.name]
                      setPermForm({...permForm, allowedDepts: newAllowed})
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{dept.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">禁止访问部门</label>
            <div className="grid grid-cols-3 gap-2 p-4 border border-gray-200 rounded-lg">
              {departments.map(dept => (
                <label key={dept.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permForm.deniedDepts.includes(dept.name)}
                    onChange={() => {
                      const newDenied = permForm.deniedDepts.includes(dept.name)
                        ? permForm.deniedDepts.filter(d => d !== dept.name)
                        : [...permForm.deniedDepts, dept.name]
                      setPermForm({...permForm, deniedDepts: newDenied})
                    }}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{dept.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={permForm.rowLevel}
                onChange={(e) => setPermForm({...permForm, rowLevel: e.target.checked})}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">启用行级权限控制</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              启用后将在SQL语句中自动添加部门ID过滤条件
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddPermModal(false)
                setShowEditPermModal(false)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSavePerm}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={activeTab === 'department' ? confirmDeleteDept : confirmDeletePerm}
        title="确认删除"
        message={`确定要删除${activeTab === 'department' ? '部门' : '权限配置'}"${currentItem?.name || currentItem?.sqlName}"吗？`}
        type="danger"
      />
    </div>
  )
}

export default DataPermission

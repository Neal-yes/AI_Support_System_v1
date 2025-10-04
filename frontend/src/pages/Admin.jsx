import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Database,
  Shield,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

// 导入各个模块页面
import KnowledgeBase from './admin/KnowledgeBase'
import IntelligentConfig from './admin/IntelligentConfig'
import MySQLConfig from './admin/MySQLConfig'
import DataPermission from './admin/DataPermission'
import UserManagement from './admin/UserManagement'
import DataAnalytics from './admin/DataAnalytics'
import SystemConfig from './admin/SystemConfig'
import Dashboard from './admin/Dashboard'

function Admin({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: '数据看板', color: 'text-blue-500' },
    { path: '/admin/knowledge', icon: BookOpen, label: '知识库管理', color: 'text-green-500' },
    { path: '/admin/intelligent', icon: Brain, label: '智能配置', color: 'text-purple-500' },
    { path: '/admin/mysql', icon: Database, label: 'MySQL语句配置', color: 'text-orange-500' },
    { path: '/admin/permission', icon: Shield, label: '数据访问权限', color: 'text-red-500' },
    { path: '/admin/users', icon: Users, label: '用户与权限', color: 'text-indigo-500' },
    { path: '/admin/analytics', icon: BarChart3, label: '数据统计分析', color: 'text-cyan-500' },
    { path: '/admin/system', icon: Settings, label: '系统配置', color: 'text-gray-500' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden shadow-lg`}>
        {/* Logo区域 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">管理后台</h1>
              <p className="text-xs text-gray-500">智能客服系统</p>
            </div>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  active
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? item.color : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className={`flex-1 text-sm font-medium ${active ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>

        {/* 底部操作 */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/chat"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition mb-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>返回对话</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || '管理后台'}
              </h2>
              <p className="text-sm text-gray-500">企业内部智能问答客服系统</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">超级管理员</p>
              <p className="text-xs text-gray-500">admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/intelligent" element={<IntelligentConfig />} />
            <Route path="/mysql" element={<MySQLConfig />} />
            <Route path="/permission" element={<DataPermission />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/analytics" element={<DataAnalytics />} />
            <Route path="/system" element={<SystemConfig />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin


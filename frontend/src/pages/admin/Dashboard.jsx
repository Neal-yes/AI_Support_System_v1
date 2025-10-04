import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, MessageSquare, Database, CheckCircle, Clock, AlertCircle } from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const stats = [
    { label: '今日查询量', value: '1,234', change: '+12%', icon: MessageSquare, color: 'blue' },
    { label: 'SQL调用成功率', value: '98.5%', change: '+2.3%', icon: CheckCircle, color: 'green' },
    { label: '平均响应时间', value: '1.2s', change: '-0.3s', icon: Clock, color: 'purple' },
    { label: '自助解决率', value: '85%', change: '+5%', icon: TrendingUp, color: 'orange' },
  ]

  const recentActivities = [
    { action: '新增知识条目', user: '张三', time: '5分钟前', type: 'success' },
    { action: '修改SQL语句', user: '李四', time: '15分钟前', type: 'info' },
    { action: 'SQL调用失败告警', user: '系统', time: '30分钟前', type: 'warning' },
    { action: '批量导入知识库', user: '王五', time: '1小时前', type: 'success' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近活动 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">最近活动</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} · {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/admin/knowledge')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition text-left"
            >
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium text-gray-700">新增知识</p>
            </button>
            <button 
              onClick={() => navigate('/admin/intelligent')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition text-left"
            >
              <div className="text-2xl mb-2">🔧</div>
              <p className="text-sm font-medium text-gray-700">配置意图</p>
            </button>
            <button 
              onClick={() => navigate('/admin/mysql')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition text-left"
            >
              <div className="text-2xl mb-2">💾</div>
              <p className="text-sm font-medium text-gray-700">SQL语句</p>
            </button>
            <button 
              onClick={() => navigate('/admin/analytics')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition text-left"
            >
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-medium text-gray-700">查看报表</p>
            </button>
          </div>
        </div>
      </div>

      {/* 告警信息 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">系统提醒</h4>
            <p className="text-sm text-yellow-700">检测到3条SQL语句调用失败，请及时检查配置。</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


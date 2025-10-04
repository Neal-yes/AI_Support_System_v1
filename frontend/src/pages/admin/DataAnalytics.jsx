import React, { useState } from 'react'
import { Download, Calendar, TrendingUp, MessageSquare, Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import DateRangePicker from '../../components/DateRangePicker'
import Toast from '../../components/Toast'

function DataAnalytics() {
  const [dateRange, setDateRange] = useState('week')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [toast, setToast] = useState(null)

  // 不同时间范围的数据
  const dataByRange = {
    today: {
      totalQueries: 856,
      resolveRate: '87.2%',
      sqlSuccessRate: '97.8%',
      avgResponseTime: '1.3s',
      topQuestions: [
        { question: '如何申请远程办公', count: 12 },
        { question: '公司年会时间', count: 10 },
        { question: '新员工入职流程', count: 8 },
      ],
      sqlFailures: [
        { sql: 'dept_reimburse_monthly', reason: '参数类型错误', count: 2, time: '今天 14:30' },
      ],
      deptStats: [
        { dept: '技术部', queryCount: 78, avgTime: '1.1s', resolveRate: '90%' },
        { dept: '市场部', queryCount: 56, avgTime: '1.3s', resolveRate: '85%' },
      ]
    },
    week: {
      totalQueries: 3245,
      resolveRate: '89.5%',
      sqlSuccessRate: '98.2%',
      avgResponseTime: '1.2s',
      topQuestions: [
        { question: '如何申请远程办公', count: 45 },
        { question: '公司年会时间', count: 38 },
        { question: '新员工入职流程', count: 32 },
        { question: '食堂菜单查询', count: 28 },
        { question: '打印机使用说明', count: 25 },
      ],
      sqlFailures: [
        { sql: 'dept_reimburse_monthly', reason: '参数类型错误', count: 12, time: '2024-01-15 14:30' },
        { sql: 'employee_info', reason: '数据库连接超时', count: 8, time: '2024-01-15 10:20' },
        { sql: 'dept_customer_count', reason: '权限不足', count: 5, time: '2024-01-14 16:45' },
      ],
      deptStats: [
        { dept: '技术部', queryCount: 256, avgTime: '1.1s', resolveRate: '92%' },
        { dept: '市场部', queryCount: 189, avgTime: '1.3s', resolveRate: '87%' },
        { dept: '财务部', queryCount: 145, avgTime: '0.9s', resolveRate: '95%' },
        { dept: '人事部', queryCount: 132, avgTime: '1.2s', resolveRate: '89%' },
      ]
    },
    month: {
      totalQueries: 15680,
      resolveRate: '91.3%',
      sqlSuccessRate: '98.5%',
      avgResponseTime: '1.1s',
      topQuestions: [
        { question: '如何申请远程办公', count: 156 },
        { question: '公司年会时间', count: 142 },
        { question: '新员工入职流程', count: 128 },
        { question: '食堂菜单查询', count: 98 },
        { question: '打印机使用说明', count: 85 },
        { question: '考勤系统使用', count: 76 },
      ],
      sqlFailures: [
        { sql: 'dept_reimburse_monthly', reason: '参数类型错误', count: 45, time: '2024-01-15 14:30' },
        { sql: 'employee_info', reason: '数据库连接超时', count: 32, time: '2024-01-15 10:20' },
        { sql: 'dept_customer_count', reason: '权限不足', count: 18, time: '2024-01-14 16:45' },
      ],
      deptStats: [
        { dept: '技术部', queryCount: 1245, avgTime: '1.0s', resolveRate: '93%' },
        { dept: '市场部', queryCount: 987, avgTime: '1.2s', resolveRate: '88%' },
        { dept: '财务部', queryCount: 756, avgTime: '0.9s', resolveRate: '96%' },
        { dept: '人事部', queryCount: 689, avgTime: '1.1s', resolveRate: '90%' },
      ]
    }
  }

  const currentData = dataByRange[dateRange]
  const topUnknownQuestions = currentData.topQuestions
  const sqlFailures = currentData.sqlFailures
  const deptStats = currentData.deptStats

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    setToast({ type: 'success', message: `已切换到${range === 'today' ? '今日' : range === 'week' ? '本周' : '本月'}数据` })
  }

  const handleCustomDateApply = (dates) => {
    setToast({ type: 'info', message: `自定义时间范围：${dates.startDate} 至 ${dates.endDate}` })
  }

  const handleExport = () => {
    setToast({ type: 'info', message: '正在生成报表...' })
    setTimeout(() => {
      setToast({ type: 'success', message: '报表导出成功！已保存到下载目录' })
    }, 1500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* 时间筛选和导出 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => handleDateRangeChange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                dateRange === range
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range === 'today' ? '今日' : range === 'week' ? '本周' : '本月'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowDatePicker(true)}
            className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 flex items-center gap-2 transition"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">自定义时间</span>
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">导出报表</span>
          </button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{currentData.totalQueries.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">总查询量</p>
          <p className="text-xs text-green-600 mt-2">↑ 15.3% 较上周</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{currentData.resolveRate}</h3>
          <p className="text-sm text-gray-600">自助解决率</p>
          <p className="text-xs text-green-600 mt-2">↑ 3.2% 较上周</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{currentData.sqlSuccessRate}</h3>
          <p className="text-sm text-gray-600">SQL成功率</p>
          <p className="text-xs text-green-600 mt-2">↑ 1.5% 较上周</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{currentData.avgResponseTime}</h3>
          <p className="text-sm text-gray-600">平均响应时间</p>
          <p className="text-xs text-red-600 mt-2">↓ 0.2s 较上周</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 未识别问题TOP10 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            未识别问题 TOP 10
          </h3>
          <div className="space-y-3">
            {topUnknownQuestions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3 flex-1">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-800">{item.question}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{item.count}次</span>
              </div>
            ))}
          </div>
        </div>

        {/* SQL调用失败分析 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-red-600" />
            SQL调用失败记录
          </h3>
          <div className="space-y-3">
            {sqlFailures.map((item, index) => (
              <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <code className="px-2 py-1 bg-white text-red-700 text-xs rounded font-mono">
                    {item.sql}
                  </code>
                  <span className="text-xs text-red-600 font-semibold">{item.count}次失败</span>
                </div>
                <p className="text-sm text-red-700 mb-1">原因：{item.reason}</p>
                <p className="text-xs text-red-600">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 部门查询统计 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">部门查询统计</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">部门</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">查询量</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">平均响应时间</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">自助解决率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deptStats.map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">{dept.dept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{dept.queryCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{dept.avgTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: dept.resolveRate }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{dept.resolveRate}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 自定义日期选择器 */}
      <DateRangePicker
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApply={handleCustomDateApply}
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

export default DataAnalytics


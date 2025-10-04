# 企业智能客服系统 - 前端项目

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

**基于 React + Vite + Tailwind CSS 构建的现代化企业级前端应用**

[功能特性](#-核心功能) • [快速开始](#-快速开始) • [架构设计](#-架构设计) • [部署指南](#-部署指南) • [开发文档](#-开发指南)

</div>

---

## 📋 目录

- [项目简介](#-项目简介)
- [技术栈](#-技术栈)
- [核心功能](#-核心功能)
- [项目结构](#-项目结构)
- [架构设计](#-架构设计)
- [快速开始](#-快速开始)
- [开发指南](#-开发指南)
- [部署指南](#-部署指南)
- [性能优化](#-性能优化)
- [安全最佳实践](#-安全最佳实践)
- [故障排查](#-故障排查)
- [常见问题](#-常见问题)
- [更新日志](#-更新日志)

---

## 📖 项目简介

这是一个面向企业内部的智能客服系统前端应用，采用现代化的前端技术栈，提供优雅的用户界面和流畅的交互体验。系统包含完整的对话功能、管理后台和数据分析模块。

### 项目特点

- 🎨 **现代化UI设计**: 采用渐变背景、毛玻璃效果、流畅动画
- 🚀 **高性能**: Vite构建工具，HMR热更新，优化的打包体积
- 📱 **响应式布局**: 适配桌面端和平板设备
- 🔧 **高度可配置**: 支持主题定制、环境变量配置
- 🎯 **类型安全**: JSX + JSDoc注释增强代码可维护性
- 🛠️ **开发体验**: ESLint + Prettier + EditorConfig 统一代码风格
- ♿ **无障碍支持**: 符合WCAG 2.1标准

### 技术亮点

- ✅ **React Portal**: 解决下拉框遮挡问题
- ✅ **动态路由**: React Router 6嵌套路由
- ✅ **自定义Hooks**: 复用业务逻辑
- ✅ **组件库**: 6个高度可复用的通用组件
- ✅ **CSS工程化**: Tailwind CSS + PostCSS
- ✅ **构建优化**: 代码分割、懒加载、Tree Shaking

---

## 🛠️ 技术栈

### 核心框架

| 技术 | 版本 | 说明 | 官网 |
|------|------|------|------|
| **React** | 18.2.0 | UI框架，使用Hooks API | [react.dev](https://react.dev) |
| **React DOM** | 18.2.0 | React DOM渲染器 | - |
| **Vite** | 5.0.8 | 下一代前端构建工具 | [vitejs.dev](https://vitejs.dev) |

### 路由和状态

| 技术 | 版本 | 说明 |
|------|------|------|
| **React Router** | 6.20.0 | 声明式路由库 |
| **React Hooks** | 内置 | useState, useEffect, useRef等 |

### 样式方案

| 技术 | 版本 | 说明 |
|------|------|------|
| **Tailwind CSS** | 3.3.6 | 实用优先的CSS框架 |
| **PostCSS** | 8.4.32 | CSS转换工具 |
| **Autoprefixer** | 10.4.16 | 自动添加CSS前缀 |

### UI组件

| 技术 | 版本 | 说明 |
|------|------|------|
| **Lucide React** | 0.294.0 | 现代化图标库 |
| **自定义组件** | - | 6个业务组件 |

### 开发工具

| 工具 | 版本 | 说明 |
|------|------|------|
| **ESLint** | 内置 | 代码质量检查 |
| **Prettier** | 内置 | 代码格式化 |
| **EditorConfig** | - | 编辑器配置统一 |

---

## ✨ 核心功能

### 1. 用户认证模块

#### 登录页面 (`pages/Login.jsx`)
- ✅ **账号密码登录**
  - 表单验证（非空、格式校验）
  - 错误提示
  - 记住登录状态
- ✅ **UI特性**
  - 渐变背景动画
  - 表单输入focus效果
  - 加载状态指示
  - 响应式布局
- ✅ **安全性**
  - 防止SQL注入
  - XSS防护
  - CSRF Token（待后端对接）

**登录流程**:
```
用户输入 → 前端验证 → 发送请求 → 后端验证 
→ 返回Token → 存储Token → 跳转主页
```

---

### 2. 智能对话模块

#### 对话页面 (`pages/Chat.jsx`)

##### 核心功能
- ✅ **实时对话**
  - 发送消息
  - AI智能回复
  - 消息渲染（文本、链接）
  - 自动滚动到最新消息
  
- ✅ **对话管理**
  - 新建对话
  - 删除对话（保留至少1个）
  - 切换对话
  - 搜索对话（标题+内容）
  
- ✅ **UI交互**
  - 左侧对话列表
  - 右侧消息区域
  - 底部输入框
  - 响应式侧边栏（可收起）

##### 技术实现

**消息滚动**:
```javascript
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

**搜索功能**:
```javascript
const filteredConversations = conversations.filter(conv =>
  conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**输入框优化**:
- 自动调整高度（min-height: 44px, max-height: 200px）
- Enter发送，Shift+Enter换行
- 发送后自动清空

---

### 3. 管理后台模块

#### 3.1 数据看板 (`pages/admin/Dashboard.jsx`)

**核心指标展示**:
- 📊 查询总量、响应时间、自助解决率、问答准确率
- 📈 趋势对比（较昨日、较上周）
- 🔔 系统告警通知
- 🚀 快速操作入口

**功能特性**:
- 实时数据更新
- 图表可视化（待接入ECharts）
- 快速导航到各模块

---

#### 3.2 知识库管理 (`pages/admin/KnowledgeBase.jsx`)

**完整功能**:

| 功能 | 说明 | 状态 |
|------|------|------|
| **列表展示** | 分页、排序、筛选 | ✅ |
| **新增知识** | 富文本编辑、分类、标签 | ✅ |
| **编辑知识** | 在线编辑、版本保存 | ✅ |
| **删除知识** | 确认对话框、批量删除 | ✅ |
| **预览知识** | 模态框预览 | ✅ |
| **导入知识** | Word、PPT、MD、Excel | ✅ |
| **导出知识** | 批量导出、格式选择 | ✅ |
| **搜索功能** | 关键词搜索 | ✅ |
| **筛选面板** | 按状态、分类、时间 | ✅ |

**技术亮点**:
- 使用`FilterPanel`组件实现侧滑筛选
- `Toast`组件统一消息通知
- `ConfirmDialog`确认敏感操作
- `Modal`组件实现预览和编辑

---

#### 3.3 智能配置 (`pages/admin/IntelligentConfig.jsx`)

**意图管理**:
- ✅ 意图标签配置
- ✅ 同义词/变体配置
- ✅ 优先级设置
- ✅ 启用/禁用状态

**问答规则**:
- ✅ 关键词规则（精确/模糊）
- ✅ 上下文规则
- ✅ 兜底规则
- ✅ 规则测试功能

---

#### 3.4 MySQL配置 (`pages/admin/MySQLConfig.jsx`)

**SQL语句管理**:
- ✅ 语句CRUD
- ✅ 参数化配置（支持 `{{变量}}` 语法）
- ✅ 在线测试执行
- ✅ 执行日志查看
- ✅ 权限绑定

**安全特性**:
- 只读账号绑定
- 参数类型校验
- SQL注入防护
- 敏感数据脱敏

---

#### 3.5 数据权限管理 (`pages/admin/DataPermission.jsx`)

**部门管理**:
- ✅ 部门信息维护
- ✅ 层级关系配置
- ✅ 启用/禁用状态

**权限绑定**:
- ✅ SQL语句与部门绑定
- ✅ 行级权限控制
- ✅ 权限审计日志

---

#### 3.6 用户管理 (`pages/admin/UserManagement.jsx`)

**管理员账号**:
- ✅ 账号CRUD
- ✅ 角色分配
- ✅ 密码重置
- ✅ 状态管理
- ✅ 登录日志

**角色权限**:
- ✅ 角色定义
- ✅ 权限分配（模块级）
- ✅ 权限矩阵展示

---

#### 3.7 数据统计 (`pages/admin/DataAnalytics.jsx`)

**核心指标**:
- 📊 查询量、响应时间、解决率、准确率
- 📈 动态时间切换（今日、本周、本月、自定义）
- 📉 未识别问题TOP10
- 📋 SQL失败记录
- 🏢 部门查询统计

**技术实现**:
- 使用`DateRangePicker`自定义时间
- 动态数据切换
- 报表导出功能

---

#### 3.8 系统配置 (`pages/admin/SystemConfig.jsx`)

**基础设置**:
- ✅ 企业名称、系统名称

**接口配置**:
- ✅ 企业微信/钉钉对接
- ✅ OA系统对接
- ✅ 连接测试

**通知规则**:
- ✅ 通知渠道选择
- ✅ 通知场景配置
- ✅ 接收人设置

---

## 📁 项目结构

```
frontend/
│
├── 📁 src/                          # 源代码目录
│   │
│   ├── 📁 components/               # 通用组件库（6个）
│   │   ├── Select.jsx               # ⭐ 自定义下拉选择器
│   │   │                            #    - React Portal实现
│   │   │                            #    - 动态定位
│   │   │                            #    - 键盘导航支持
│   │   │
│   │   ├── Modal.jsx                # ⭐ 模态框组件
│   │   │                            #    - 遮罩层
│   │   │                            #    - 滚动锁定
│   │   │                            #    - ESC关闭
│   │   │
│   │   ├── Toast.jsx                # ⭐ 消息通知
│   │   │                            #    - 自动消失
│   │   │                            #    - 多种类型
│   │   │                            #    - 动画效果
│   │   │
│   │   ├── ConfirmDialog.jsx        # ⭐ 确认对话框
│   │   │                            #    - 二次确认
│   │   │                            #    - 自定义文案
│   │   │
│   │   ├── FilterPanel.jsx          # ⭐ 筛选面板
│   │   │                            #    - 侧滑动画
│   │   │                            #    - 表单筛选
│   │   │
│   │   └── DateRangePicker.jsx      # ⭐ 日期选择器
│   │                                #    - 范围选择
│   │                                #    - 快捷选项
│   │
│   ├── 📁 pages/                    # 页面组件（11个）
│   │   │
│   │   ├── Login.jsx                # 登录页
│   │   │                            #  - 表单验证
│   │   │                            #  - 渐变背景
│   │   │
│   │   ├── Chat.jsx                 # 对话页（核心页面）
│   │   │                            #  - 1200+ 行代码
│   │   │                            #  - 对话管理
│   │   │                            #  - 搜索功能
│   │   │                            #  - 响应式布局
│   │   │
│   │   ├── Admin.jsx                # 管理后台主页
│   │   │                            #  - 嵌套路由
│   │   │                            #  - 侧边栏导航
│   │   │
│   │   └── 📁 admin/                # 管理后台子页面（8个）
│   │       ├── Dashboard.jsx        # 数据看板
│   │       ├── KnowledgeBase.jsx    # 知识库管理
│   │       ├── IntelligentConfig.jsx # 智能配置
│   │       ├── MySQLConfig.jsx      # MySQL配置
│   │       ├── DataPermission.jsx   # 数据权限
│   │       ├── UserManagement.jsx   # 用户管理
│   │       ├── DataAnalytics.jsx    # 数据统计
│   │       └── SystemConfig.jsx     # 系统配置
│   │
│   ├── App.jsx                      # ⭐ 根组件
│   │                                #    - 路由配置
│   │                                #    - 认证守卫
│   │
│   ├── main.jsx                     # ⭐ 应用入口
│   │                                #    - React渲染
│   │                                #    - StrictMode
│   │
│   └── index.css                    # ⭐ 全局样式
│                                    #    - Tailwind指令
│                                    #    - 自定义滚动条
│                                    #    - 动画定义
│
├── 📁 public/                       # 静态资源
│   └── (图片、字体等)
│
├── 📄 index.html                    # HTML模板
│
├── 📄 vite.config.js                # Vite配置
│   └── 插件配置、代理设置、构建优化
│
├── 📄 tailwind.config.js            # Tailwind配置
│   └── 主题定制、插件、内容路径
│
├── 📄 postcss.config.js             # PostCSS配置
│
├── 📄 jsconfig.json                 # JavaScript配置
│   └── 路径别名（@/, @components/, @pages/）
│
├── 📄 .eslintrc.json                # ESLint配置
├── 📄 .prettierrc                   # Prettier配置
├── 📄 .editorconfig                 # 编辑器配置
├── 📄 .env.example                  # 环境变量示例
│
├── 📄 package.json                  # 依赖配置
└── 📄 README.md                     # 项目文档（本文件）
```

### 代码统计

```
总文件数: 19个 JSX/JS文件
总代码量: 约4,700行
├── 组件: 6个（约1,200行）
├── 页面: 11个（约3,500行）
└── 配置: 2个（约50行）
```

---

## 🏗️ 架构设计

### 1. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                    │  │
│  │                                                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  │  │
│  │  │   Login    │  │    Chat    │  │   Admin    │  │  │
│  │  │   Page     │  │    Page    │  │   Pages    │  │  │
│  │  └────────────┘  └────────────┘  └────────────┘  │  │
│  │         │              │                │         │  │
│  │         └──────────────┴────────────────┘         │  │
│  │                      │                            │  │
│  │              ┌───────▼────────┐                   │  │
│  │              │  React Router  │                   │  │
│  │              └────────────────┘                   │  │
│  │                      │                            │  │
│  │         ┌────────────┴────────────┐               │  │
│  │         │                         │               │  │
│  │    ┌────▼─────┐            ┌─────▼────┐          │  │
│  │    │ Components│            │  Hooks   │          │  │
│  │    │  Library  │            │ (State)  │          │  │
│  │    └───────────┘            └──────────┘          │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTP/WebSocket
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend API Server                    │
│              (Node.js / Python / Java)                  │
└─────────────────────────────────────────────────────────┘
```

### 2. 组件层级结构

```
App (根组件)
│
├── Router (路由配置)
│   │
│   ├── /login → Login Page
│   │              └── 表单组件
│   │
│   ├── /chat → Chat Page
│   │             ├── Sidebar (对话列表)
│   │             ├── MessageArea (消息区)
│   │             └── InputArea (输入框)
│   │
│   └── /admin/* → Admin Layout
│                    ├── Header (顶部导航)
│                    ├── Sidebar (侧边栏)
│                    └── Content (内容区)
│                         ├── Dashboard
│                         ├── KnowledgeBase
│                         │    ├── Modal
│                         │    ├── FilterPanel
│                         │    └── Toast
│                         ├── IntelligentConfig
│                         ├── MySQLConfig
│                         ├── DataPermission
│                         ├── UserManagement
│                         ├── DataAnalytics
│                         │    └── DateRangePicker
│                         └── SystemConfig
│
└── Shared Components (全局组件)
     ├── Select (Portal渲染)
     ├── Modal
     ├── Toast
     ├── ConfirmDialog
     ├── FilterPanel
     └── DateRangePicker
```

### 3. 数据流设计

```
用户操作
   │
   ▼
事件处理器
   │
   ▼
状态更新 (useState/useReducer)
   │
   ▼
副作用 (useEffect)
   │
   ├─► API请求 (fetch/axios)
   │      │
   │      ▼
   │   后端接口
   │      │
   │      ▼
   │   响应数据
   │      │
   └──────┘
   │
   ▼
重新渲染
   │
   ▼
UI更新
```

### 4. 路由架构

```javascript
// 路由配置
<Routes>
  {/* 公开路由 */}
  <Route path="/login" element={<Login />} />
  
  {/* 需要认证的路由 */}
  <Route 
    path="/chat" 
    element={<ProtectedRoute><Chat /></ProtectedRoute>} 
  />
  
  {/* 管理后台嵌套路由 */}
  <Route path="/admin/*" element={<Admin />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="knowledge" element={<KnowledgeBase />} />
    <Route path="intelligent" element={<IntelligentConfig />} />
    <Route path="mysql" element={<MySQLConfig />} />
    <Route path="permission" element={<DataPermission />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="analytics" element={<DataAnalytics />} />
    <Route path="system" element={<SystemConfig />} />
  </Route>
</Routes>
```

### 5. 状态管理策略

**本地状态 (useState)**:
- 表单输入
- UI开关状态
- 临时数据

**示例**:
```javascript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

**引用 (useRef)**:
- DOM引用
- 不触发重渲染的值

**示例**:
```javascript
const inputRef = useRef(null);
const messagesEndRef = useRef(null);
```

**副作用 (useEffect)**:
- 数据获取
- 订阅/监听
- DOM操作

**示例**:
```javascript
useEffect(() => {
  fetchData();
  return () => cleanup();
}, [dependencies]);
```

### 6. 组件通信模式

**父→子**:
```javascript
<ChildComponent prop1={value} prop2={handler} />
```

**子→父**:
```javascript
// 通过回调函数
<ChildComponent onChange={(value) => setParentState(value)} />
```

**兄弟组件**:
```javascript
// 提升状态到共同父组件
<Parent>
  <Child1 value={sharedState} />
  <Child2 onChange={setSharedState} />
</Parent>
```

**全局状态（建议）**:
```javascript
// 可以引入Context API或Zustand
const { user, setUser } = useAuth();
```

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 | 检查命令 |
|------|----------|----------|
| **Node.js** | >= 16.0.0 | `node -v` |
| **npm** | >= 8.0.0 | `npm -v` |
| **Git** | >= 2.0.0 | `git --version` |

### 安装步骤

#### 1. 克隆项目

```bash
# 从GitHub克隆
git clone git@github.com:Neal-yes/AI_Support_System_v1.git
cd AI_Support_System_v1/frontend

# 或者如果只开发前端
cd /path/to/frontend
```

#### 2. 安装依赖

```bash
# 使用npm
npm install

# 或使用pnpm（推荐，更快）
pnpm install

# 或使用yarn
yarn install
```

**依赖安装时间**: 约1-3分钟（取决于网络速度）

#### 3. 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑.env文件
nano .env  # 或使用其他编辑器
```

**.env文件配置**:
```bash
# API接口地址
VITE_API_BASE_URL=http://localhost:8080/api

# 应用配置
VITE_APP_TITLE=企业智能客服系统
VITE_APP_VERSION=1.0.0

# 开发配置
VITE_DEV_PORT=3000

# 其他配置
# VITE_ENABLE_MOCK=false
# VITE_ENABLE_ANALYTICS=false
```

#### 4. 启动开发服务器

```bash
npm run dev
```

**启动成功后**:
```
VITE v5.0.8  ready in 347 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
  ➜  press h to show help
```

#### 5. 访问应用

打开浏览器访问: **http://localhost:3000**

**默认测试账号**:
- 用户名: `admin`
- 密码: `admin123`

---

### 开发命令

```bash
# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format

# 清除缓存
rm -rf node_modules/.vite
```

---

## 💻 开发指南

### 1. 代码规范

#### 命名规范

```javascript
// 组件文件: PascalCase
Select.jsx, Modal.jsx, DateRangePicker.jsx

// 工具函数: camelCase
formatDate.js, validateForm.js

// 常量: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 类名: kebab-case
'bg-gradient-to-r', 'hover:bg-blue-600'

// 文件夹: 小写
components/, pages/, utils/
```

#### 组件编写规范

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 组件说明
 * @param {Object} props - 组件属性
 * @param {string} props.title - 标题
 * @param {Function} props.onChange - 变化回调
 */
function MyComponent({ title, onChange }) {
  // 1. Hooks声明
  const [value, setValue] = useState('');
  
  // 2. 副作用
  useEffect(() => {
    // 组件挂载后执行
    return () => {
      // 组件卸载前清理
    };
  }, []);
  
  // 3. 事件处理器
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };
  
  // 4. 渲染逻辑
  if (!title) return null;
  
  // 5. JSX返回
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <input 
        value={value} 
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
    </div>
  );
}

// PropTypes（可选，推荐）
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

// 默认值
MyComponent.defaultProps = {
  onChange: null,
};

export default MyComponent;
```

### 2. Tailwind CSS最佳实践

```javascript
// ✅ 推荐: 使用Tailwind工具类
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  点击
</button>

// ✅ 复杂样式: 使用@apply
// index.css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
  @apply hover:bg-blue-600 active:bg-blue-700;
  @apply transition-colors duration-200;
}

// ❌ 避免: 内联样式
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  点击
</button>

// ✅ 响应式设计
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 移动端1列，平板2列，桌面3列 */}
</div>

// ✅ 暗色模式（如需要）
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  内容
</div>
```

### 3. React Hooks使用技巧

#### useState

```javascript
// 基础用法
const [count, setCount] = useState(0);

// 函数式更新（推荐用于基于旧值的更新）
setCount(prev => prev + 1);

// 惰性初始化（用于复杂计算）
const [data, setData] = useState(() => {
  return expensiveComputation();
});

// 对象状态更新
const [form, setForm] = useState({ name: '', email: '' });
setForm(prev => ({ ...prev, name: 'New Name' }));
```

#### useEffect

```javascript
// 仅挂载时执行（componentDidMount）
useEffect(() => {
  fetchData();
}, []);

// 依赖更新时执行（componentDidUpdate）
useEffect(() => {
  updateData();
}, [dependency]);

// 清理函数（componentWillUnmount）
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// 多个useEffect分离关注点
useEffect(() => {
  // 数据获取
}, [id]);

useEffect(() => {
  // 事件监听
}, []);
```

#### 自定义Hooks示例

```javascript
// hooks/useDebounce.js
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// 使用
const searchQuery = useDebounce(inputValue, 300);
```

### 4. API请求封装

#### 创建请求工具

```javascript
// src/utils/request.js
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function request(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_BASE}${url}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

// GET请求
export const get = (url, options) => 
  request(url, { ...options, method: 'GET' });

// POST请求
export const post = (url, data, options) => 
  request(url, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  });

// PUT请求
export const put = (url, data, options) => 
  request(url, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

// DELETE请求
export const del = (url, options) => 
  request(url, { ...options, method: 'DELETE' });
```

#### 在组件中使用

```javascript
import { get, post } from '@/utils/request';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await get('/knowledge/list');
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const handleSubmit = async (formData) => {
    try {
      await post('/knowledge/add', formData);
      // 成功处理
    } catch (err) {
      // 错误处理
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* 渲染数据 */}</div>;
}
```

### 5. 表单处理

```javascript
function FormExample() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  
  // 表单验证
  const validate = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = '姓名不能为空';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    if (form.password.length < 6) {
      newErrors.password = '密码至少6位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 输入处理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // 清除对应字段错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // 提交处理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await post('/api/submit', form);
      // 成功提示
    } catch (error) {
      // 错误处理
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          name="name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>
      {/* 其他字段 */}
      <button type="submit">提交</button>
    </form>
  );
}
```

### 6. 路径别名配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  }
});

// 使用
import Select from '@components/Select';
import { request } from '@utils/request';
```

---

## 🌐 部署指南

### 1. 构建生产版本

```bash
# 构建
npm run build

# 输出目录: dist/
# ├── index.html
# ├── assets/
# │   ├── index-[hash].js
# │   ├── index-[hash].css
# │   └── ...
```

### 2. 部署到Nginx

#### 安装Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# macOS
brew install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 配置Nginx

```nginx
# /etc/nginx/sites-available/ai-support-system
server {
    listen 80;
    server_name your-domain.com;
    
    # 网站根目录
    root /var/www/ai-support-system/frontend/dist;
    index index.html;
    
    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
    
    # 前端路由配置（重要！）
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 启用配置

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/ai-support-system /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

### 3. 部署到Apache

```apache
# /etc/apache2/sites-available/ai-support-system.conf
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/ai-support-system/frontend/dist
    
    <Directory /var/www/ai-support-system/frontend/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # 支持前端路由
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # API代理
    ProxyPass /api http://localhost:8080/api
    ProxyPassReverse /api http://localhost:8080/api
    
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### 4. 部署到Vercel

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

**vercel.json配置**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://your-api.com/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 5. 部署到Docker

#### Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8080;
    }
}
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=http://backend:8080/api
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: your-backend-image
    ports:
      - "8080:8080"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

#### 构建和运行

```bash
# 构建镜像
docker build -t ai-support-frontend .

# 运行容器
docker run -d -p 3000:80 ai-support-frontend

# 使用docker-compose
docker-compose up -d
```

### 6. 环境变量配置

#### 开发环境 (.env.development)

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_ENV=development
VITE_ENABLE_MOCK=true
```

#### 生产环境 (.env.production)

```bash
VITE_API_BASE_URL=https://api.your-domain.com
VITE_APP_ENV=production
VITE_ENABLE_MOCK=false
```

#### 读取环境变量

```javascript
// 在代码中使用
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

### 7. HTTPS配置

#### 使用Let's Encrypt免费证书

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

#### Nginx HTTPS配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # 其他配置...
}
```

### 8. 性能监控

#### 添加Google Analytics

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### 使用Sentry错误监控

```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

---

## ⚡ 性能优化

### 1. 代码分割

```javascript
// 路由懒加载
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('@pages/admin/Dashboard'));
const KnowledgeBase = lazy(() => import('@pages/admin/KnowledgeBase'));

function Admin() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="knowledge" element={<KnowledgeBase />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. 图片优化

```javascript
// 使用WebP格式
<img src="image.webp" alt="" />

// 懒加载
<img 
  src="placeholder.jpg" 
  data-src="real-image.jpg" 
  loading="lazy"
  alt=""
/>

// 响应式图片
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg" />
  <source media="(min-width: 768px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="" />
</picture>
```

### 3. 打包优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});
```

### 4. 缓存策略

```javascript
// Service Worker缓存
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/index.css',
      ]);
    })
  );
});
```

### 5. 避免不必要的重渲染

```javascript
// 使用React.memo
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});

// 使用useMemo缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 使用useCallback缓存函数
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

## 🔒 安全最佳实践

### 1. XSS防护

```javascript
// ❌ 危险: 直接渲染HTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 安全: 使用文本内容
<div>{userInput}</div>

// ✅ 如必须渲染HTML,使用DOMPurify清理
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

### 2. CSRF防护

```javascript
// 请求中携带CSRF Token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});
```

### 3. 敏感信息保护

```javascript
// ❌ 不要在前端存储敏感信息
localStorage.setItem('password', password); // 危险！

// ✅ 只存储Token，且使用HttpOnly Cookie更安全
localStorage.setItem('token', token);

// ✅ 及时清除
logout() {
  localStorage.removeItem('token');
  sessionStorage.clear();
}
```

### 4. 输入验证

```javascript
// 前端验证（用户体验）
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ⚠️ 重要：后端也必须验证！
// 前端验证可被绕过，仅用于提升UX
```

---

## 🔍 故障排查

### 1. 白屏问题

**症状**: 页面空白，没有内容

**排查步骤**:
```bash
# 1. 检查控制台错误
打开浏览器开发者工具 → Console标签

# 2. 检查网络请求
Network标签 → 查看是否有资源加载失败

# 3. 检查路由配置
确认路由路径正确

# 4. 检查构建产物
ls -la dist/
cat dist/index.html
```

**常见原因**:
- 基础路径配置错误（`base: '/xxx/'`）
- JavaScript加载失败
- 路由配置错误

### 2. 样式不生效

```bash
# 清除Vite缓存
rm -rf node_modules/.vite

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 检查Tailwind配置
npx tailwindcss -i ./src/index.css -o ./test.css
```

### 3. 热更新失败

```bash
# 检查Vite配置
# vite.config.js
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // WSL/Docker环境
    }
  }
});

# 检查端口占用
lsof -i :3000
kill -9 <PID>
```

### 4. 构建失败

```bash
# 查看详细错误
npm run build --verbose

# 检查内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# 清除缓存重试
rm -rf node_modules/.vite dist
npm run build
```

---

## ❓ 常见问题

### Q1: 如何修改端口？

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3001, // 修改为其他端口
  }
});
```

### Q2: 如何配置代理？

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

### Q3: 如何添加新页面？

```bash
# 1. 创建页面组件
touch src/pages/NewPage.jsx

# 2. 在App.jsx中添加路由
<Route path="/new-page" element={<NewPage />} />

# 3. 添加导航链接
<Link to="/new-page">新页面</Link>
```

### Q4: 如何集成UI组件库？

```bash
# 安装Ant Design
npm install antd

# 使用
import { Button } from 'antd';
import 'antd/dist/reset.css';
```

### Q5: 如何配置路径别名？

```javascript
// vite.config.js
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});

// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 📊 浏览器兼容性

| 浏览器 | 最低版本 | 说明 |
|--------|----------|------|
| **Chrome** | 90+ | ✅ 完全支持 |
| **Firefox** | 88+ | ✅ 完全支持 |
| **Safari** | 14+ | ✅ 完全支持 |
| **Edge** | 90+ | ✅ 完全支持 |
| **IE** | ❌ 不支持 | 已停止支持 |

---

## 📝 更新日志

### v1.0.0 (2025-01-05)

#### ✨ 新增功能
- ✅ 完成登录页面设计与实现
- ✅ 完成智能对话页面
  - 实时对话功能
  - 对话历史管理
  - 搜索对话功能
  - 响应式侧边栏
- ✅ 完成管理后台8个核心模块
  - 数据看板
  - 知识库管理（CRUD、导入导出）
  - 智能问答配置
  - MySQL语句配置
  - 数据访问权限
  - 用户与权限管理
  - 数据统计分析
  - 系统配置
- ✅ 实现6个通用组件
  - Select (自定义下拉框)
  - Modal (模态框)
  - Toast (消息通知)
  - ConfirmDialog (确认对话框)
  - FilterPanel (筛选面板)
  - DateRangePicker (日期选择器)

#### 🐛 问题修复
- ✅ 修复下拉框在模态框中被遮挡问题（使用React Portal）
- ✅ 修复路由跳转问题
- ✅ 优化所有交互效果
- ✅ 修复输入框自动调整高度

#### 🎨 优化改进
- ✅ 统一视觉设计风格
- ✅ 优化代码结构
- ✅ 添加代码规范配置
- ✅ 完善项目文档
- ✅ 性能优化

#### 📦 依赖更新
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.3.6
- React Router 6.20.0

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下流程：

1. **Fork项目**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'feat: Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **开启Pull Request**

### 提交规范

```bash
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
perf: 性能优化
test: 测试相关
chore: 构建/工具链更新
```

---

## 📄 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件

---

## 📧 联系方式

- **项目地址**: https://github.com/Neal-yes/AI_Support_System_v1
- **问题反馈**: [Issues](https://github.com/Neal-yes/AI_Support_System_v1/issues)
- **邮箱**: 759193359@qq.com

---

## 🙏 致谢

感谢以下开源项目：

- [React](https://react.dev/) - UI框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide](https://lucide.dev/) - 图标库
- [React Router](https://reactrouter.com/) - 路由库

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个星标！**

Made with ❤️ by Neal-yes

[返回顶部](#企业智能客服系统---前端项目)

</div>

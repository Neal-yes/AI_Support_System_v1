# 前端项目说明

## 技术栈

- **框架**: React 18
- **构建工具**: Vite 5
- **样式**: Tailwind CSS 3
- **路由**: React Router 6
- **图标**: Lucide React
- **开发语言**: JavaScript (JSX)

## 项目结构

```
frontend/
├── src/
│   ├── components/              # 通用组件
│   │   ├── Select.jsx           # 自定义下拉选择器（Portal实现）
│   │   ├── Modal.jsx            # 模态框
│   │   ├── Toast.jsx            # 消息通知
│   │   ├── ConfirmDialog.jsx    # 确认对话框
│   │   ├── FilterPanel.jsx      # 筛选面板
│   │   └── DateRangePicker.jsx  # 日期范围选择器
│   │
│   ├── pages/                   # 页面组件
│   │   ├── Login.jsx            # 登录页面
│   │   ├── Chat.jsx             # 对话页面
│   │   ├── Admin.jsx            # 管理后台主页
│   │   │
│   │   └── admin/               # 管理后台子页面
│   │       ├── Dashboard.jsx              # 数据看板
│   │       ├── KnowledgeBase.jsx          # 知识库管理
│   │       ├── IntelligentConfig.jsx      # 智能问答配置
│   │       ├── MySQLConfig.jsx            # MySQL语句配置
│   │       ├── DataPermission.jsx         # 数据访问权限
│   │       ├── UserManagement.jsx         # 用户与权限管理
│   │       ├── DataAnalytics.jsx          # 数据统计分析
│   │       └── SystemConfig.jsx           # 系统配置
│   │
│   ├── App.jsx                  # 根组件（路由配置）
│   ├── main.jsx                 # 应用入口
│   └── index.css                # 全局样式
│
├── public/                      # 静态资源
├── index.html                   # HTML模板
├── vite.config.js               # Vite配置
├── tailwind.config.js           # Tailwind配置
├── postcss.config.js            # PostCSS配置
├── jsconfig.json                # JavaScript配置
├── .eslintrc.json               # ESLint配置
├── .prettierrc                  # Prettier配置
├── .editorconfig                # 编辑器配置
├── .env.example                 # 环境变量示例
└── package.json                 # 项目依赖

```

## 快速开始

### 1. 安装依赖
```bash
cd frontend
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入实际配置
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问: http://localhost:3000

### 4. 构建生产版本
```bash
npm run build
```

## 可用脚本

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览生产构建
npm run lint       # 代码检查
npm run format     # 代码格式化
```

## 核心功能

### 1. 登录模块
- 账号密码登录
- 表单验证
- 登录状态管理

### 2. 对话模块
- 实时对话界面
- 对话历史管理
- 搜索对话功能
- 新建/删除对话
- 自动滚动到底部

### 3. 管理后台
- 数据看板
- 知识库管理（CRUD、导入导出）
- 智能问答配置
- MySQL语句配置
- 数据权限管理
- 用户权限管理
- 数据统计分析
- 系统配置

## 关键技术实现

### 1. React Portal
用于实现不受父容器overflow限制的下拉框：
```javascript
// components/Select.jsx
ReactDOM.createPortal(dropdown, document.body)
```

### 2. 自定义滚动条
```css
/* index.css */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
```

### 3. 路由配置
```javascript
// App.jsx
<Route path="/login" element={<Login />} />
<Route path="/chat" element={<Chat />} />
<Route path="/admin/*" element={<Admin />} />
```

### 4. 状态管理
使用React Hooks进行本地状态管理：
- useState - 组件状态
- useEffect - 副作用处理
- useRef - DOM引用
- useNavigate - 路由导航

## 组件设计规范

### 1. 命名规范
- 组件文件：PascalCase（如 `Select.jsx`）
- 函数/变量：camelCase（如 `handleClick`）

### 2. 组件结构
```javascript
// 1. 导入
import React, { useState } from 'react';

// 2. 组件定义
function ComponentName({ prop1, prop2 }) {
  // 3. 状态定义
  const [state, setState] = useState();
  
  // 4. 事件处理
  const handleEvent = () => {};
  
  // 5. 渲染
  return <div>...</div>;
}

// 6. 导出
export default ComponentName;
```

### 3. 样式规范
- 使用 Tailwind CSS 工具类
- 避免内联样式
- 复杂样式使用 `@apply` 指令

## API 接口对接

前端已预留接口对接位置，后端开发完成后需要：

1. 在 `.env` 中配置API地址：
```
VITE_API_BASE_URL=http://localhost:8080/api
```

2. 创建 `src/utils/request.js` 封装请求：
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function request(url, options) {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
}
```

3. 在组件中调用：
```javascript
import { request } from '@/utils/request';

const data = await request('/chat/message', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' }),
});
```

## 开发建议

1. **组件复用**: 优先使用 `components/` 中的通用组件
2. **代码规范**: 保存时自动格式化（需安装VSCode扩展）
3. **状态管理**: 简单状态用useState，复杂状态可引入Zustand
4. **错误处理**: 使用Toast组件显示错误信息
5. **性能优化**: 大列表使用虚拟滚动，避免不必要的重渲染

## 浏览器兼容

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 问题排查

### 端口被占用
```bash
# 修改端口
# vite.config.js
server: { port: 3001 }
```

### 样式不生效
```bash
# 清除缓存重新构建
rm -rf node_modules/.vite
npm run dev
```

### 路由404
检查 `vite.config.js` 是否配置了 `base` 路径

## 贡献指南

1. 创建功能分支
2. 遵循代码规范
3. 添加必要注释
4. 提交前进行测试
5. 发起Pull Request

## 更新日志

### v1.0.0 (2025-01-05)
- ✅ 完成登录页面
- ✅ 完成对话页面
- ✅ 完成管理后台全部8个模块
- ✅ 统一自定义组件设计
- ✅ 修复下拉框遮挡问题（Portal实现）
- ✅ 项目结构规范化


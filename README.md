# 企业智能客服系统 (AI Support System)

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**一个功能完整的企业级智能客服系统，支持多轮对话、知识库管理、数据权限控制等功能**

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [项目结构](#-项目结构) • [技术栈](#-技术栈) • [开发指南](#-开发指南)

</div>

---

## 📋 目录

- [项目简介](#-项目简介)
- [功能特性](#-功能特性)
- [项目结构](#-项目结构)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [开发指南](#-开发指南)
- [API文档](#-api文档)
- [部署说明](#-部署说明)
- [常见问题](#-常见问题)
- [更新日志](#-更新日志)

---

## 📖 项目简介

企业智能客服系统是一个为企业内部打造的全栈智能问答平台，集成了自然语言处理、知识库管理、数据权限控制等功能。系统采用前后端分离架构，支持部门级数据隔离，确保数据安全。

### 核心特点

- 🎯 **智能问答**: 基于大模型的自然语言理解，支持多轮对话
- 📚 **知识库管理**: 支持多格式文档导入（Word、PPT、MD等）
- 🔐 **权限控制**: 部门级数据隔离，防止跨部门数据泄露
- 🗄️ **数据查询**: MySQL语句配置，安全的数据库访问中间层
- 📊 **数据统计**: 完善的数据分析和报表功能
- 🎨 **现代UI**: 优雅的用户界面，流畅的交互体验
- 🔧 **配置化**: 高度可配置的系统参数和业务规则

---

## ✨ 功能特性

### 1. 前台功能

#### 登录认证
- ✅ 账号密码登录
- ✅ 表单验证
- ✅ 登录状态管理
- ✅ 自动跳转

#### 智能对话
- ✅ 实时对话界面
- ✅ 对话历史管理
- ✅ 搜索对话功能
- ✅ 新建/删除对话
- ✅ Markdown渲染
- ✅ 自动滚动

### 2. 管理后台

#### 📊 数据看板
- 核心指标展示（查询量、响应时间、解决率）
- 最近活动记录
- 快速操作入口
- 系统告警通知

#### 📚 知识库管理
- 知识条目CRUD
- 富文本编辑器
- 多格式导入（Word、PPT、MD、Excel、CSV）
- 批量导出
- 知识分类管理
- 版本历史
- 知识预览

#### 🧠 智能配置
- 意图管理
- 同义词配置
- 问答规则设置
- 优先级配置
- 测试功能

#### 🗄️ MySQL配置
- SQL语句管理
- 参数化配置
- 语句测试
- 执行日志
- 权限绑定

#### 🔐 数据权限管理
- 部门信息管理
- SQL语句权限绑定
- 行级权限控制
- 权限审计日志

#### 👥 用户与权限管理
- 管理员账号管理
- 角色权限配置
- 操作日志记录
- 密码重置

#### 📈 数据统计分析
- 核心指标看板
- 动态时间筛选（今日、本周、本月、自定义）
- 未识别问题TOP10
- SQL失败记录
- 部门查询统计
- 报表导出

#### ⚙️ 系统配置
- 基础信息设置
- 接口配置（企业微信、钉钉）
- 通知规则配置
- 系统日志管理

---

## 📂 项目结构

```
AI_Support_System_v1/
│
├── 📁 frontend/                    # 前端项目
│   ├── src/
│   │   ├── components/             # 通用组件
│   │   │   ├── Select.jsx          # 自定义下拉选择器
│   │   │   ├── Modal.jsx           # 模态框
│   │   │   ├── Toast.jsx           # 消息通知
│   │   │   ├── ConfirmDialog.jsx   # 确认对话框
│   │   │   ├── FilterPanel.jsx     # 筛选面板
│   │   │   └── DateRangePicker.jsx # 日期选择器
│   │   │
│   │   ├── pages/                  # 页面组件
│   │   │   ├── Login.jsx           # 登录页
│   │   │   ├── Chat.jsx            # 对话页
│   │   │   ├── Admin.jsx           # 后台主页
│   │   │   └── admin/              # 后台子页面
│   │   │       ├── Dashboard.jsx
│   │   │       ├── KnowledgeBase.jsx
│   │   │       ├── IntelligentConfig.jsx
│   │   │       ├── MySQLConfig.jsx
│   │   │       ├── DataPermission.jsx
│   │   │       ├── UserManagement.jsx
│   │   │       ├── DataAnalytics.jsx
│   │   │       └── SystemConfig.jsx
│   │   │
│   │   ├── App.jsx                 # 根组件
│   │   ├── main.jsx                # 应用入口
│   │   └── index.css               # 全局样式
│   │
│   ├── public/                     # 静态资源
│   ├── index.html                  # HTML模板
│   ├── vite.config.js              # Vite配置
│   ├── tailwind.config.js          # Tailwind配置
│   ├── package.json                # 依赖配置
│   └── README.md                   # 前端说明
│
├── 📁 backend/                     # 后端项目（待开发）
│   ├── README.md                   # 后端说明
│   └── .gitkeep                    # 目录占位
│
├── package.json                    # 根目录脚本
├── .gitignore                      # Git忽略配置
└── README.md                       # 项目总说明（本文件）
```

---

## 🛠️ 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.3.1 | UI框架 |
| Vite | 5.4.20 | 构建工具 |
| React Router | 7.1.3 | 路由管理 |
| Tailwind CSS | 3.4.17 | 样式框架 |
| Lucide React | 0.469.0 | 图标库 |
| ESLint | 9.17.0 | 代码检查 |
| Prettier | 3.4.2 | 代码格式化 |

### 后端（待开发）

可选技术栈：

**方案1: Node.js**
- Express / Koa
- MySQL2 / Sequelize
- JWT
- Joi (数据验证)

**方案2: Python**
- Flask / FastAPI
- PyMySQL / SQLAlchemy
- JWT
- Pydantic (数据验证)

**方案3: Java**
- Spring Boot
- MyBatis
- Spring Security
- Hibernate Validator

---

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd AI_Support_System_v1

# 安装前端依赖
cd frontend
npm install

# 如果需要开发后端
cd ../backend
npm install  # 或 pip install -r requirements.txt（Python）
```

### 启动开发服务器

```bash
# 终端1 - 启动前端
cd frontend
npm run dev

# 终端2 - 启动后端（后端开发完成后）
cd backend
npm run dev  # 或 python app.py（Python）
```

### 访问应用

- **前端地址**: http://localhost:3000
- **后端地址**: http://localhost:8080（后端开发完成后）
- **默认账号**: admin / admin123（前端演示数据）

---

## 💻 开发指南

### 前端开发

```bash
cd frontend

# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 代码格式化
npm run format

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

详见 [前端开发文档](./frontend/README.md)

### 后端开发

详见 [后端开发文档](./backend/README.md)

### 环境变量配置

#### 前端 (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=企业智能客服系统
```

#### 后端 (`backend/.env`)
```env
PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_support_system
JWT_SECRET=your_secret_key
```

### 代码规范

项目配置了完整的代码规范工具：

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **EditorConfig**: 编辑器配置统一

保存文件时会自动格式化代码。

### Git提交规范

```bash
# 功能开发
git commit -m "feat: 添加XXX功能"

# Bug修复
git commit -m "fix: 修复XXX问题"

# 文档更新
git commit -m "docs: 更新XXX文档"

# 样式调整
git commit -m "style: 调整XXX样式"

# 重构代码
git commit -m "refactor: 重构XXX模块"
```

---

## 📡 API接口规划

后端开发时需要实现以下接口（详见 `backend/README.md`）：

### 核心模块

| 模块 | 接口示例 | 说明 |
|------|----------|------|
| **认证** | `POST /api/auth/login` | 用户登录、登出、验证 |
| **对话** | `POST /api/chat/message` | 发送消息、获取历史 |
| **知识库** | `GET /api/knowledge/list` | 知识CRUD、导入导出 |
| **智能配置** | `GET /api/intelligent/intents` | 意图管理、规则配置 |
| **MySQL配置** | `GET /api/mysql/statements` | SQL语句管理、测试 |
| **数据权限** | `GET /api/permission/departments` | 权限绑定、审计 |
| **用户管理** | `GET /api/users/list` | 用户CRUD、角色管理 |
| **数据统计** | `GET /api/analytics/dashboard` | 数据看板、报表 |
| **系统配置** | `GET /api/system/config` | 系统参数配置 |

详细接口文档见 [后端说明](./backend/README.md)

---

## 🌐 部署说明

### 前端部署

```bash
cd frontend

# 构建生产版本
npm run build

# 生成的文件在 dist/ 目录
# 部署到 Nginx/Apache/CDN
```

#### Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 后端部署

详见 [后端部署文档](./backend/README.md)

### Docker部署（可选）

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d
```

> 注：Docker配置文件待后端完成后创建

---

## ❓ 常见问题

### 1. 端口被占用

**问题**: `Port 3000 is already in use`

**解决**:
```bash
# 方法1: 修改端口
# frontend/vite.config.js
server: { port: 3001 }

# 方法2: 杀死占用进程
lsof -ti:3000 | xargs kill -9
```

### 2. 样式不生效

**问题**: Tailwind CSS样式不显示

**解决**:
```bash
# 清除缓存
rm -rf node_modules/.vite
npm run dev
```

### 3. 路由404

**问题**: 刷新页面出现404

**解决**: 配置服务器支持HTML5 History模式

### 4. 跨域问题

**解决**: 在 `vite.config.js` 配置代理
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

更多问题见 [FAQ文档](./docs/FAQ.md)（待创建）

---

## 📝 更新日志

### v1.0.0 (2025-01-05)

#### ✨ 新增功能
- ✅ 完成登录页面设计与实现
- ✅ 完成智能对话页面（搜索、删除、历史记录）
- ✅ 完成管理后台8个核心模块
  - 数据看板
  - 知识库管理
  - 智能配置
  - MySQL配置
  - 数据权限管理
  - 用户管理
  - 数据统计
  - 系统配置
- ✅ 实现所有交互功能（模态框、表单、筛选等）
- ✅ 统一自定义组件设计（下拉框、通知等）

#### 🐛 问题修复
- ✅ 修复下拉框在模态框中被遮挡问题（React Portal实现）
- ✅ 修复路由跳转问题
- ✅ 优化所有交互效果

#### 🎨 优化改进
- ✅ 项目结构规范化（前后端分离）
- ✅ 代码规范工具配置（ESLint、Prettier）
- ✅ 添加完整的配置文件
- ✅ 优化UI交互体验
- ✅ 统一视觉设计风格

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下流程：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献者

感谢所有贡献者的付出！

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📧 联系方式

- **项目维护**: Your Team
- **Email**: your-email@example.com
- **官网**: https://your-website.com

---

## 🙏 致谢

感谢以下开源项目：

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个星标！**

Made with ❤️ by Your Team

</div>

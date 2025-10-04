# 企业智能客服系统 (AI Support System)

<div align="center">

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
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
├── 📁 backend/                     # 后端项目
│   ├── openapi.yaml                # API接口规范（48个接口）
│   ├── 技术方案.md                  # 后端技术方案
│   └── .gitkeep                    # 目录占位
│
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

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| Python | 3.10+ | 编程语言 |
| FastAPI | 0.115+ | Web框架 |
| PostgreSQL | 15+ | 关系型数据库 |
| Redis | 7+ | 缓存数据库 |
| Qdrant | 1.11+ | 向量数据库 |
| OpenSearch | 2.13+ | 搜索引擎（BM25） |
| Ollama | latest | 大模型服务（qwen2.5:14b） |
| Haystack | 2.x | RAG框架 |
| Celery | 5+ | 异步任务队列 |

**AI技术栈**:
- 🤖 **Embedding模型**: BAAI/bge-m3（1024维）
- 🔍 **Reranker模型**: BAAI/bge-reranker-large
- 💬 **大模型**: Qwen2.5 14B Instruct
- 📚 **RAG策略**: Hybrid Retrieval（BM25 + Vector）+ Cross-Encoder Reranking

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

# 安装后端依赖（后端开发时）
cd ../backend
pip install -r requirements.txt  # Python环境
```

### 启动开发服务器

```bash
# 终端1 - 启动前端
cd frontend
npm run dev

# 终端2 - 启动后端（后端开发时）
cd backend
uvicorn main:app --reload --port 8080
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

```bash
cd backend

# 启动开发服务器
uvicorn main:app --reload --port 8080

# 运行测试
pytest

# 代码检查
flake8 .

# 类型检查
mypy .
```

详见：
- [API接口规范](./backend/openapi.yaml) - 48个接口定义
- [后端技术方案](./backend/技术方案.md) - 完整技术方案

### 环境变量配置

#### 前端 (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=企业智能客服系统
```

#### 后端 (`backend/.env`)
```env
# 应用配置
APP_ENV=development
API_PORT=8080

# 数据库
DATABASE_URL=postgresql://ai_user:password@localhost:5432/ai_support_system
REDIS_URL=redis://localhost:6379/0

# 向量库和搜索
QDRANT_URL=http://localhost:6333
OPENSEARCH_URL=http://localhost:9200

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:14b-instruct

# Embedding模型
EMBEDDING_MODEL_NAME=BAAI/bge-m3
EMBEDDING_DEVICE=cpu

# JWT
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=120
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

## 📡 API接口文档

后端API采用OpenAPI 3.0.3规范定义，共**48个接口**，覆盖9大功能模块。

### 核心模块

| 模块 | 接口数 | 接口示例 | 说明 |
|------|--------|----------|------|
| **认证** | 4 | `POST /api/auth/login` | 用户登录、登出、Token验证/刷新 |
| **对话** | 6 | `POST /api/chat/message` | 发送消息、获取历史、用户反馈 |
| **知识库** | 9 | `GET /api/knowledge/list` | 知识CRUD、导入导出、预览、重建索引 |
| **智能配置** | 7 | `GET /api/intelligent/intents` | 意图管理、规则配置、测试 |
| **MySQL配置** | 8 | `GET /api/mysql/statements` | SQL语句管理、测试、执行、日志 |
| **数据权限** | 7 | `GET /api/permission/departments` | 部门管理、权限绑定、审计日志 |
| **用户管理** | 12 | `GET /api/users/admins` | 用户CRUD、角色管理、登录日志 |
| **数据统计** | 6 | `GET /api/analytics/dashboard` | 数据看板、报表导出 |
| **系统配置** | 10 | `GET /api/system/config` | 系统配置、通知规则、日志、监控 |

### 数据模型

定义了30+数据模型，包括：
- 核心业务：User, Role, Department, Conversation, Message, Knowledge
- 智能配置：Intent, Rule, SQLStatement, Permission
- 统计分析：Metrics, Dashboard, AuditLog, LoginLog

详细接口文档见 [OpenAPI规范](./backend/openapi.yaml)

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

#### 方式1: Docker Compose（推荐）

```bash
cd backend

# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

包含服务：
- PostgreSQL（数据库）
- Redis（缓存）
- Qdrant（向量库）
- OpenSearch（搜索引擎）
- Ollama（大模型）
- FastAPI（应用服务）
- Nginx（反向代理）

#### 方式2: 手动部署

```bash
# 安装依赖
pip install -r requirements.txt

# 初始化数据库
alembic upgrade head

# 启动服务
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
```

详见 [后端技术方案](./backend/技术方案.md)

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

### v1.1.0 (2025-01-05)

#### 📚 后端文档完成
- ✅ 完成OpenAPI 3.0.3规范（48个接口定义）
- ✅ 完成后端技术方案文档（1,162行）
  - 核心技术栈确定（Python + FastAPI + Haystack）
  - RAG架构设计（混合检索 + 重排序）
  - 完整数据库设计（SQL Schema）
  - Docker部署方案
  - 监控和安全方案
- ✅ 前端README文档完善（1,942行）
  - 详细架构说明
  - 核心功能解析
  - 多种部署方案
  - 性能优化指南
- ✅ 前后端接口100%对齐验证通过

#### 🔧 技术栈确定
- **后端框架**: Python 3.10 + FastAPI
- **数据库**: PostgreSQL + Redis
- **向量库**: Qdrant (HNSW)
- **搜索引擎**: OpenSearch (BM25)
- **大模型**: Ollama (Qwen2.5 14B)
- **RAG框架**: Haystack 2
- **Embedding**: bge-m3 (1024维)

### v1.0.0 (2025-01-04)

#### ✨ 前端功能完成
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
- ✅ 统一自定义组件设计（Select、Modal、Toast等）

#### 🐛 问题修复
- ✅ 修复下拉框在模态框中被遮挡（React Portal）
- ✅ 修复路由跳转问题
- ✅ 优化所有交互效果

#### 🎨 项目规范化
- ✅ 项目结构规范化（前后端分离）
- ✅ 代码规范工具配置（ESLint、Prettier）
- ✅ 添加完整的配置文件
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

# 后端服务说明

## 技术栈准备

后端可以选择以下技术栈：

### 方案1：Node.js + Express
```bash
cd backend
npm init -y
npm install express cors mysql2 dotenv
```

### 方案2：Python + Flask
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-cors pymysql python-dotenv
```

### 方案3：Java + Spring Boot
```bash
# 使用 Spring Initializr 创建项目
# https://start.spring.io/
```

## 目录结构建议

```
backend/
├── src/
│   ├── controllers/    # 控制器
│   ├── models/         # 数据模型
│   ├── routes/         # 路由
│   ├── services/       # 业务逻辑
│   ├── middleware/     # 中间件
│   └── utils/          # 工具函数
├── config/             # 配置文件
├── tests/              # 测试文件
└── package.json        # 依赖管理
```

## API 接口规划

### 1. 认证模块
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/verify` - 验证token

### 2. 对话模块
- `POST /api/chat/message` - 发送消息
- `GET /api/chat/conversations` - 获取对话列表
- `DELETE /api/chat/conversation/:id` - 删除对话

### 3. 知识库管理
- `GET /api/knowledge/list` - 获取知识列表
- `POST /api/knowledge/add` - 新增知识
- `PUT /api/knowledge/update/:id` - 更新知识
- `DELETE /api/knowledge/delete/:id` - 删除知识

### 4. 智能配置
- `GET /api/intelligent/intents` - 获取意图列表
- `POST /api/intelligent/intent` - 新增意图
- `PUT /api/intelligent/intent/:id` - 更新意图

### 5. MySQL配置
- `GET /api/mysql/statements` - 获取SQL语句列表
- `POST /api/mysql/statement` - 新增SQL语句
- `POST /api/mysql/test` - 测试SQL语句

### 6. 数据权限
- `GET /api/permission/departments` - 获取部门列表
- `POST /api/permission/bind` - 绑定权限

### 7. 用户管理
- `GET /api/users/list` - 获取用户列表
- `POST /api/users/add` - 新增用户
- `PUT /api/users/update/:id` - 更新用户

### 8. 数据统计
- `GET /api/analytics/dashboard` - 获取数据看板
- `GET /api/analytics/reports` - 获取报表数据

### 9. 系统配置
- `GET /api/system/config` - 获取系统配置
- `PUT /api/system/config` - 更新系统配置

## 数据库设计

详见数据库设计文档（待创建）

## 环境变量

创建 `.env` 文件：
```
PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_support_system
JWT_SECRET=your_secret_key
```

## 开发指南

1. 安装依赖
2. 配置环境变量
3. 初始化数据库
4. 启动开发服务器
5. 测试API接口

## 注意事项

- 所有接口需要统一的错误处理
- 需要实现请求日志记录
- 需要实现SQL注入防护
- 需要实现跨部门数据隔离


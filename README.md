# ASOUL-DATA-REPORT-2021

ASOUL年度数据报告2021 前端仓库

## 开发

### 全局安装 `pnpm`

```sh
npm i -g pnpm
```

### 安装依赖

```
pnpm i
```

### 配置环境变量

复制 `.env.example` 为`.env`, 并按需修改其中配置

```
cp .env.example .env
```

### 启动开发服务器

```
pnpm dev
```

### 编辑器配置

推荐将 `ESLint` 作为默认 `formatter`

VS Code 配置已在 `.vscode/settings.json` 中配置好, 只需安装 `ESLint` 插件即可

## 部署

### 构建

```
pnpm build
```

### 预览构建的版本

```
pnpm preview
```

## Commit 规范

随意, 尽量拆分成一个个小的 commit，不要混在一块

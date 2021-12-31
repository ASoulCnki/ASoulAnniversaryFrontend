# ASOUL-DATA-REPORT-2021

ASOUL 年度数据报告 2021 前端仓库

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

# test 环境
pnpm build:test

# stage 环境
pnpm build:stage

# production 环境
pnpm build:production

```

### Docker 镜像构建

```

docker build -t luooooob/asoul-data-report-2021:0.0.0-test -t luooooob/asoul-data-report-2021:test --build-arg MODE=test .

docker build -t luooooob/asoul-data-report-2021:0.0.0-stage -t luooooob/asoul-data-report-2021:stage --build-arg MODE=stage .

docker build -t luooooob/asoul-data-report-2021:0.0.0-production -t luooooob/asoul-data-report-2021:production --build-arg MODE=production .
```

### 预览构建的版本

```
pnpm preview
```

### 杂项

setup msw

```
pnpx msw init public/ --save
```

## Commit 规范

随意, 尽量拆分成一个个小的 commit，不要混在一块

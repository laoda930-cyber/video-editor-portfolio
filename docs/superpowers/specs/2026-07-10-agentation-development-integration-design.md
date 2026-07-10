# Agentation 工具栏与 MCP 接入设计

## 目标

在作品集 React/Vite 项目的开发服务器中启用 Agentation 标注工具栏，并让 Codex 通过 MCP 直接读取、回复和解决标注，同时确保生产构建不包含可见工具栏，并保持现有作品集功能不变。

## 范围

- 在项目中添加 `agentation` 开发依赖。
- 在 React 应用入口层挂载 `Agentation`。
- 使用 Vite 的 `import.meta.env.DEV` 将工具栏限制在开发环境。
- 添加自动化测试，验证开发环境接入逻辑。
- 保留已安装的全局 `agentation-mcp@1.2.0`，不重复下载。
- 将 Codex 中现有但不可靠的 `npx -y agentation-mcp server` 启动配置改为直接调用本地 `dist/cli.js`。
- 验证 MCP 服务、HTTP 健康端点和 Codex 配置。
- 运行现有测试和生产构建。

不修改独立原型 `hero-first-screen.html`，不重构现有组件，也不处理工作区中已有的未提交修改。

## 实现设计

`src/App.jsx` 导入 `Agentation`，并在应用最外层片段末尾通过 `import.meta.env.DEV && <Agentation />` 条件渲染。这样 `npm run dev` 会显示右下角工具栏，而 `npm run build` 会通过 Vite 的环境常量消除生产环境中的挂载分支。

依赖以开发依赖方式记录在 `package.json` 和 `package-lock.json` 中，因为它只服务本地设计反馈流程。

MCP 使用本机已经安装的 CLI 文件：`C:\Users\李旭浩\AppData\Roaming\npm\node_modules\agentation-mcp\dist\cli.js`。Codex 以 `node <cli-path> server` 启动它；服务通过 stdio 暴露 MCP 工具，并在本机 `4747` 端口接收网页工具栏的标注。标注默认持久化到 `C:\Users\李旭浩\.agentation\store.db`，不会自动生成 Markdown 文件。

## 测试与验证

先添加一条会失败的测试，证明当前应用尚未挂载 Agentation；再实施最小代码使测试通过。测试将替代 `agentation` 组件为可识别的测试元素，避免测试其第三方内部实现。

完成后运行：

- `npm test -- --run`
- `npm run build`
- `node <agentation-cli-path> doctor`
- `codex mcp list`
- 启动服务后检查 `http://localhost:4747/health`

成功标准：新增测试通过、原有测试没有新增失败、生产构建成功、构建产物中不存在 Agentation 的可见挂载标记、MCP 自检通过、HTTP 健康端点可用，而且 Codex 配置不依赖联网执行 `npx`。

## 风险控制

- 保留当前所有未提交文件与修改。
- 修改仅限 Agentation 依赖、接入点和对应测试。
- Codex 全局配置仅替换名为 `agentation` 的 MCP 条目，不改动其他 MCP 服务。
- 如果现有测试在改动前已失败，记录基线并区分既有问题与本次回归。

# Agentation 开发环境接入设计

## 目标

在作品集 React/Vite 项目的开发服务器中启用 Agentation 标注工具栏，同时确保生产构建不包含可见工具栏，并保持现有作品集功能不变。

## 范围

- 在项目中添加 `agentation` 开发依赖。
- 在 React 应用入口层挂载 `Agentation`。
- 使用 Vite 的 `import.meta.env.DEV` 将工具栏限制在开发环境。
- 添加自动化测试，验证开发环境接入逻辑。
- 运行现有测试和生产构建。

不修改独立原型 `hero-first-screen.html`，不配置 MCP 服务端，不重构现有组件，也不处理工作区中已有的未提交修改。

## 实现设计

`src/App.jsx` 导入 `Agentation`，并在应用最外层片段末尾通过 `import.meta.env.DEV && <Agentation />` 条件渲染。这样 `npm run dev` 会显示右下角工具栏，而 `npm run build` 会通过 Vite 的环境常量消除生产环境中的挂载分支。

依赖以开发依赖方式记录在 `package.json` 和 `package-lock.json` 中，因为它只服务本地设计反馈流程。

## 测试与验证

先添加一条会失败的测试，证明当前应用尚未挂载 Agentation；再实施最小代码使测试通过。测试将替代 `agentation` 组件为可识别的测试元素，避免测试其第三方内部实现。

完成后运行：

- `npm test -- --run`
- `npm run build`

成功标准：新增测试通过、原有测试没有新增失败、生产构建成功，并且构建产物中不存在 Agentation 的可见挂载标记。

## 风险控制

- 保留当前所有未提交文件与修改。
- 修改仅限 Agentation 依赖、接入点和对应测试。
- 如果现有测试在改动前已失败，记录基线并区分既有问题与本次回归。

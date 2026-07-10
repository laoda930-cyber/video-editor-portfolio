# Agentation Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable the Agentation toolbar only during Vite development and connect the installed Agentation MCP server to Codex through a reliable local command.

**Architecture:** The React application conditionally renders the third-party `Agentation` component behind Vite's `import.meta.env.DEV` flag. Codex launches the already-installed MCP CLI directly with Node instead of using `npx`, while the CLI persists annotations in its default SQLite store and exposes its HTTP receiver on port 4747.

**Tech Stack:** React, Vite, Vitest, Testing Library, Agentation 3.0.2, Agentation MCP 1.2.0, Codex CLI

## Global Constraints

- Do not modify `hero-first-screen.html`.
- Preserve all pre-existing uncommitted files and edits.
- The toolbar must render in development and remain absent from the production build.
- Reuse global `agentation-mcp@1.2.0`; do not download a second MCP copy.
- Replace only the Codex MCP entry named `agentation`; leave every other MCP entry unchanged.

---

### Task 1: Record the Existing Test Baseline and Install the Toolbar Package

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: Existing npm and Vitest scripts from `package.json`.
- Produces: The `Agentation` React component exported by package `agentation`.

- [ ] **Step 1: Record the pre-change baseline**

Run:

```powershell
npm test -- --run
npm run build
```

Expected: Record each exit code and any existing failure before changing dependencies. Do not fix unrelated failures.

- [ ] **Step 2: Install the development-only toolbar dependency**

Run:

```powershell
npm install --save-dev agentation@3.0.2
```

Expected: `package.json` contains `"agentation": "^3.0.2"` under `devDependencies`, and `package-lock.json` records the resolved package.

- [ ] **Step 3: Verify the installed export**

Run:

```powershell
node -e "import('agentation').then(m => { if (typeof m.Agentation !== 'function') process.exit(1); console.log('Agentation export OK') })"
```

Expected: exit code 0 and `Agentation export OK`.

- [ ] **Step 4: Commit the dependency change**

```powershell
git add -- package.json package-lock.json
git commit -m "build: add Agentation toolbar dependency"
```

### Task 2: Add the Development-Only React Integration with TDD

**Files:**
- Create: `src/AgentationIntegration.test.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Agentation` named export from package `agentation` and Vite boolean `import.meta.env.DEV`.
- Produces: One Agentation toolbar mounted at the application root during development.

- [ ] **Step 1: Write the failing integration test**

Create `src/AgentationIntegration.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('agentation', () => ({
  Agentation: () => <div data-testid="agentation-toolbar" />,
}))

describe('Agentation development integration', () => {
  it('mounts the Agentation toolbar in the Vite development environment', () => {
    render(<App />)
    expect(screen.getByTestId('agentation-toolbar')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm test -- --run src/AgentationIntegration.test.jsx
```

Expected: FAIL because `agentation-toolbar` is not present. If it errors for an unrelated pre-existing syntax problem, record that as a baseline blocker before touching unrelated code.

- [ ] **Step 3: Add the minimal production code**

In `src/App.jsx`, add:

```jsx
import { Agentation } from 'agentation'
```

At the end of the returned fragment, immediately before `</>`, add:

```jsx
{import.meta.env.DEV && <Agentation />}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
npm test -- --run src/AgentationIntegration.test.jsx
```

Expected: PASS with one passing test.

- [ ] **Step 5: Run all tests and build**

Run:

```powershell
npm test -- --run
npm run build
```

Expected: No new test failures relative to Task 1, and the production build exits 0.

- [ ] **Step 6: Confirm production output has no Agentation UI marker**

Run:

```powershell
rg -i "agentation-toolbar|data-agentation" dist
```

Expected: no matches. A no-match exit code from `rg` is expected.

- [ ] **Step 7: Commit the React integration**

```powershell
git add -- src/App.jsx src/AgentationIntegration.test.jsx
git commit -m "feat: enable Agentation during development"
```

### Task 3: Repair and Verify the Codex MCP Configuration

**Files:**
- Modify: `C:\Users\李旭浩\.codex\config.toml` indirectly through `codex mcp` commands
- Verify: `C:\Users\李旭浩\.agentation\store.db`

**Interfaces:**
- Consumes: `C:\Program Files\nodejs\node.exe` and `C:\Users\李旭浩\AppData\Roaming\npm\node_modules\agentation-mcp\dist\cli.js`.
- Produces: Codex MCP server entry `agentation`, stdio MCP tools, and HTTP receiver `http://127.0.0.1:4747`.

- [ ] **Step 1: Verify the local CLI before changing Codex**

Run:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Users\李旭浩\AppData\Roaming\npm\node_modules\agentation-mcp\dist\cli.js' doctor
```

Expected: Node.js check passes. The server may be reported as not running at this step.

- [ ] **Step 2: Replace only the Agentation MCP entry**

Run:

```powershell
codex mcp remove agentation
codex mcp add agentation -- 'C:\Program Files\nodejs\node.exe' 'C:\Users\李旭浩\AppData\Roaming\npm\node_modules\agentation-mcp\dist\cli.js' server
```

Expected: removal and addition both succeed.

- [ ] **Step 3: Verify the stored Codex command**

Run:

```powershell
codex mcp list
```

Expected: enabled entry `agentation` uses `C:\Program Files\nodejs\node.exe` and the local CLI path; all other prior entries remain listed.

- [ ] **Step 4: Start a temporary server and verify HTTP health**

Run the server hidden, then query it:

```powershell
$process = Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList @('C:\Users\李旭浩\AppData\Roaming\npm\node_modules\agentation-mcp\dist\cli.js', 'server') -WindowStyle Hidden -PassThru
try {
  Start-Sleep -Seconds 2
  Invoke-RestMethod 'http://127.0.0.1:4747/health'
} finally {
  Stop-Process -Id $process.Id -ErrorAction SilentlyContinue
}
```

Expected: the health request returns a successful response; the temporary process is then stopped.

- [ ] **Step 5: Verify persistent storage location**

Run:

```powershell
Get-Item -LiteralPath 'C:\Users\李旭浩\.agentation\store.db'
```

Expected: the SQLite database exists after server startup.

- [ ] **Step 6: Restart Codex before the first live annotation session**

Expected: a new Codex task exposes Agentation MCP tools such as `agentation_get_all_pending` and `agentation_resolve`. The current task cannot dynamically acquire newly configured MCP tools without a restart.

### Task 4: Final Regression Verification

**Files:**
- Verify only; do not modify unrelated files.

**Interfaces:**
- Consumes: Deliverables from Tasks 1-3.
- Produces: Fresh evidence for handoff.

- [ ] **Step 1: Run the complete project verification**

```powershell
npm test -- --run
npm run build
```

Expected: results match or improve on the recorded baseline, with no Agentation regression and a successful production build.

- [ ] **Step 2: Confirm the intended diff and preserve user changes**

```powershell
git status --short
git diff --check
git log -4 --oneline
```

Expected: pre-existing changes to `hero-first-screen.html`, `home-nav-button-prototype/`, `src/HeroFirstScreen.test.jsx`, and `src/HomeNavButtonPrototype.test.jsx` remain untouched; Agentation commits are visible.

- [ ] **Step 3: Report the operating workflow**

Document for the user:

```text
1. Run npm run dev in D:\作品集网页.
2. Open the local Vite URL and use the bottom-right Agentation toolbar.
3. Restart Codex once after MCP configuration.
4. In a new task, ask Codex to read or watch Agentation annotations.
5. Annotations persist in C:\Users\李旭浩\.agentation\store.db, not Markdown files.
```

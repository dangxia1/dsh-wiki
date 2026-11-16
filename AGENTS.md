# wiki/AGENTS.md · 跑者生理学 Wiki

> 这个目录是**阅读层**：把 `../文章系列/` 的成稿和概念词条做成可导航、可搜索、带交互图表的站点。
> 写作流程仍在 `../文章系列/AGENTS.md`，知识库引用来源在 `../知识库/`，训练数据不进本目录。

---

## 1. 目录结构

```
wiki/
├─ serve.cmd        双击启动（设好环境变量 → vitepress dev → 打开浏览器）
├─ package.json     scripts: dev / build / preview
├─ docs/
│   ├─ index.md             首页
│   ├─ articles/            文章（跑者生理学系列 wiki 版）+ index.md 目录
│   ├─ concepts/            概念词条 + index.md 索引
│   ├─ public/img/          配图（从文章系列复制，不引用外部路径）
│   └─ .vitepress/
│       ├─ config.ts        中文 UI、CJK 本地搜索、Mermaid、MathJax、侧边栏
│       └─ theme/           EChart.vue 全局组件（ECharts 封装）+ style.css
├─ node_modules/            可随时删，npm install 重建
└─ .cache/ .home/ .tmp/     npm 假 home / 缓存 / 临时目录（同 app/ 的做法，可随时删）
```

## 2. 启动与构建

- **日常看**：双击 `serve.cmd`（或运行 `cmd /c serve.cmd`），浏览器自动打开 `http://localhost:5173`，改文件热更新。
- **命令行**（每个新终端都要设环境变量，原因同 `app/AGENTS.md` §4——默认 npm 位置写不进去）：

  ```bash
  cd wiki
  export npm_config_cache="$(pwd)/.cache/npm-cache"
  export HOME="$(pwd)/.home" USERPROFILE="$(pwd)/.home"
  export TEMP="$(pwd)/.tmp" TMP="$(pwd)/.tmp"
  npm run dev       # 开发预览 :5173
  npm run build     # 静态构建到 docs/.vitepress/dist（验证 SSR 是否报错）
  npm run preview   # 预览构建产物
  ```

## 3. 加一篇文章

1. 前提：`文章系列/` 中该篇已**成稿并通过事实核查**（02-公众号稿完成）。
2. 在 `docs/articles/` 新建 `NN-标题.md`（NN 为系列编号），以成稿为底整理 wiki 版：
   - 概念首次出现处链接到词条：`[乳酸阈值](/concepts/乳酸阈值)`；
   - 配图从 `文章系列/…/image/` **复制**到 `docs/public/img/`，用 `/img/文件名.jpg` 引用；
   - 需要可视化时优先加 Mermaid 示意图或 EChart 图表（见 §5）；
   - 文末加"相关词条"和来源说明。
3. 更新 `docs/articles/index.md` 的表格和 `config.ts` 的侧边栏。

## 4. 加一个词条

模板（定义 → 要点 → 出处 → 相关）：

```markdown
---
title: 词条名
---

# 词条名

## 定义
一句话说清是什么。

## 要点
分小标题列关键事实，每条都要有出处。

## 出处
- 《高水平运动训练的生理学基础》第 X 章（具体小节/图表）

## 相关
- 词条：[…](/concepts/…)
- 文章：[…](/articles/…)
```

规则：

- **所有生理学内容必须先读 `../知识库/` 对应章节，标注书名 + 章**；不凭记忆生成（沿用 `../文章系列/AGENTS.md` 的写作规范与禁忌）。
- 优先复用 `文章系列/…/01-大纲_素材与核查_初稿.md` 里已核实并带出处的素材。
- 新词条同时更新 `docs/concepts/index.md`（含分组）和 `config.ts` 侧边栏。
- 文件名用中文概念名，URL 自动是 `/concepts/中文名`。

## 5. 图表写法

- **ECharts 交互图**：页面内 `<script setup>` 定义 option，`<EChart :option="xxx" height="380px" />`（全局组件，SSR 安全，本地打包不依赖 CDN）。数据必须来自知识库已核实内容，约值/示意要加说明（tip 容器）。
- **Mermaid 示意图**：直接写 ```mermaid 代码块（`vitepress-plugin-mermaid`，见 `config.ts`）。
- **数学公式**：`$...$` 行内、`$$...$$$$` 独立行（markdown-it-mathjax3）。
- **Vue 小工具**（如储备心率计算器）：直接在 md 里写 `<script setup>` + `<ClientOnly>`，参考 `docs/concepts/储备心率.md`。

## 6. 搜索

本地搜索已配 CJK 分词（单字 + 二元组，见 `config.ts` 的 `tokenizeCJK`）。新增页面无需配置；如搜不到中文词，先检查这里。

## 7. 禁忌

- 不放运动员训练数据（那些在 `../训练日志/`）。
- 不引入外网 CDN 资源——图表库全部本地打包。
- `node_modules/`、`.cache/`、`.home/`、`.tmp/` 不进 git，删了能重建。

## 8. 已知的坑（都踩过，别再踩）

| 坑 | 现象 | 解法 |
|---|---|---|
| mermaid 升到 11 | dev 模式白屏：`fastdom does not provide an export named 'default'`（mermaid 11 的 CJS 依赖在 dev 下不预打包） | **mermaid 锁死 10.9.3**（package.json 里是 exact 版本），不要 `npm update mermaid` |
| 停掉 dev server 后端口不释放 | 再启动跑到 5174/5175 | `netstat -ano \| grep :5173` 找 PID，`taskkill //F //PID <pid>` 后再启动 |
| EChart 组件里包 `<ClientOnly>` | onMounted 时 ref 还没挂上，图表空白（canvas 0 个） | 组件内不要 ClientOnly；`onMounted` 本来就只在客户端执行，天然 SSR 安全（已改好，照抄现有 EChart.vue 即可） |
| vitepress 依赖 `debug` 包偶发缺失 | dev 启动报 `Failed to resolve dependency: debug` | `npm install debug` 补装并重启 dev server |

## 9. GitHub 与部署（2026-11-16 起）

- 仓库：`dangxia1/dsh-wiki`（**公开**），git 仓库根就是本目录 `wiki/`，主分支 `main`。
- **推送即部署**：push 到 `main` 后 GitHub Actions（`.github/workflows/deploy.yml`）自动 `npm ci + build` 并发布到
  <https://dangxia1.github.io/dsh-wiki/>。
- **base 路径**：`config.ts` 里 `base: '/dsh-wiki/'`（仓库名）。改名仓库必须同步改 base；本机 dev 地址也因此是 `http://localhost:5173/dsh-wiki/`。
- 提交约定：中文短句说明改了什么（如"新增乳酸阈值词条"）；`node_modules/.cache/.home/.tmp/dist` 已被 `.gitignore` 挡住。
- 常用命令（在 wiki/ 下）：
  ```bash
  git add -A && git commit -m "说明"
  git push            # 推完约 1-2 分钟后线上更新
  gh run watch        # 盯 Actions 部署进度（需要 gh CLI）
  ```
- 版权注意：词条内容摘录/转述《高水平运动训练的生理学基础》等书并标注出处；仓库公开意味着这些内容对所有人可见，教练已知情并确认。

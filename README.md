# 跑者生理学 Wiki

面向跑者的运动生理学知识库：系列文章 + 概念词条互链，配 Mermaid 示意图、ECharts 交互图表和 Karvonen 心率计算器。

**线上地址**：<https://dangxia1.github.io/dsh-wiki/>

## 内容

- **文章**：跑者生理学系列（公众号稿的 wiki 阅读版）
- **词条**：供能系统、最大摄氧量（VO₂max）、乳酸阈值、储备心率（Karvonen）、周期化……
  每条标注知识库出处（书名 + 章节），主要参考《高水平运动训练的生理学基础》（MacDougall & Sale 主编，科学出版社 2020）。

## 本机运行

```bash
npm install
npm run dev     # http://localhost:5173/dsh-wiki/
npm run build   # 产物在 docs/.vitepress/dist/
```

Windows 下也可直接双击 `serve.cmd`（自动处理 npm 缓存重定向）。

## 技术栈

VitePress · Mermaid（锁 10.9.3，勿升级）· ECharts · markdown-it-mathjax3

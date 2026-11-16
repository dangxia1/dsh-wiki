import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import mathjax3 from 'markdown-it-mathjax3'

// 中文分词：英文按词、中文按单字 + 二元组（bigram），
// 这样搜「乳酸」「周期化」「供能」都能命中
function tokenizeCJK(text: string): string[] {
  const tokens: string[] = []
  const parts = text.toLowerCase().split(/([\u4e00-\u9fff]+)/)
  for (const part of parts) {
    if (!part) continue
    if (/[\u4e00-\u9fff]/.test(part)) {
      for (let i = 0; i < part.length; i++) {
        tokens.push(part[i])
        if (i + 1 < part.length) tokens.push(part.slice(i, i + 2))
      }
    } else {
      for (const w of part.split(/[^\p{L}\p{N}]+/)) if (w) tokens.push(w)
    }
  }
  return tokens
}

export default withMermaid({
  lang: 'zh-CN',
  title: '跑者生理学 Wiki',
  description: '运动生理学文章与概念词条（本机自用）',
  // GitHub Pages 部署在 https://dangxia1.github.io/dsh-wiki/ 子路径下，
  // base 必须是仓库名；本机 dev 地址也随之变为 /dsh-wiki/
  base: '/dsh-wiki/',
  ignoreDeadLinks: false,

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/articles/' },
      { text: '词条', link: '/concepts/' },
    ],

    sidebar: {
      '/articles/': [
        {
          text: '跑者生理学系列',
          items: [
            { text: '系列目录', link: '/articles/' },
            {
              text: '01 中长跑周期化训练的生理学原理',
              link: '/articles/01-周期化训练的生理学原理',
            },
          ],
        },
      ],
      '/concepts/': [
        {
          text: '代谢与供能',
          items: [{ text: '供能系统', link: '/concepts/供能系统' }],
        },
        {
          text: '心肺与指标',
          items: [
            { text: '最大摄氧量', link: '/concepts/最大摄氧量' },
            { text: '乳酸阈值', link: '/concepts/乳酸阈值' },
            { text: '储备心率', link: '/concepts/储备心率' },
          ],
        },
        {
          text: '训练安排',
          items: [{ text: '周期化', link: '/concepts/周期化' }],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: tokenizeCJK,
          },
          searchOptions: {
            tokenize: tokenizeCJK,
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
  },

  mermaid: {
    startOnLoad: false,
    theme: 'default',
  },
})

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import EChart from './components/EChart.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EChart', EChart)
  },
} satisfies Theme

const nav = require("./nav.js");

module.exports = {
  title: '自旋向上',
  description: '',
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ],
    [
      "vuepress-plugin-auto-sidebar",
      {
        sort: {
          mode: "asc",
          readmeFirst: true,
          readmeFirstForce: false
        },
        title: {
          mode: "titlecase",
          map: {}
        },
        sidebarDepth: 10,
        collapse: {
          open: false,
          collapseList: [],
          uncollapseList: []
        },
        ignore: [],
        removeEmptyGroup: false,
        git: {
          trackStatus: 'all'
        }
      }
    ],
    ['feed',
      {
        canonical_base: 'http://snailrend.github.io',
      }
    ],
  ],
  themeConfig: {
    nav,
    lastUpdated: '更新于',
    sidebar: 'auto',
    displayAllHeaders: false,
    smoothScroll: true
  },
  locales: {
    '/': {
      // 将会被设置为 <html> 的 lang 属性
      lang: 'zh-CN',
    }
  },
}

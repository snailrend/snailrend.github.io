const nav = require("./nav.js");
module.exports = {
  theme: 'reco',
  title: 'Snailrend',
  description: '',
  plugins: {
    "vuepress-plugin-auto-sidebar": {
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
  },
  themeConfig: {
    nav: [
      ...nav,
      { text: '时间线', link: '/timeline/', icon: 'reco-date' }
    ],
    lastUpdated: '更新于',
    subSidebar:'auto',
    displayAllHeaders: false,
    smoothScroll: true
  } 
}

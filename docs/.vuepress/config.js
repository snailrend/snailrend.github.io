const nav = require("./nav.js");
module.exports = {
  theme: 'reco',
  title: 'Snailrend',
  description: '',
  plugins:['vuepress-plugin-auto-sidebar'],
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

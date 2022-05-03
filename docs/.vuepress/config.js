const nav = require("./nav.js");

module.exports = {
  title: 'Snailrend',
  description: '',
  plugins: [
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
    },
	['feed',
    {
        canonical_base: 'http://snailrend.github.io',
    }],

	  ],
  themeConfig: {
    nav: [...nav],
    lastUpdated: '更新于',
    sidebar:'auto',
    displayAllHeaders: false,
    smoothScroll: true
  } 
}

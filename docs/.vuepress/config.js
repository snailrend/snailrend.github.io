const nav = require("./nav.js");
const rss = require("./rss.js");

module.exports = {
  //theme: 'reco',
  title: 'Snailrend',
  description: '',
  plugins: [
    "vuepress-plugin-auto-sidebar", 
	'vuepress-plugin-rss',
	rss,
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
      },
	  base_url: '/', // required
      site_url: 'https://snailrend.github.io', // required
      // filter some post
      filter: (frontmatter) => { return true },
      // How much articles
      count: 20
    }
  ],
  themeConfig: {
    nav: [...nav],
    lastUpdated: '更新于',
    sidebar:'auto',
    displayAllHeaders: false,
    smoothScroll: true
  } 
}

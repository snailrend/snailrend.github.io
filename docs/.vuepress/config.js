const nav = require("./nav.js");

module.exports = {
  theme: '@vuepress/theme-blog',
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
	[require("./rss.js"),{

	  base_url: '/', // required
      site_url: 'https://snailrend.github.io', // required
      // filter some post
      filter: (frontmatter) => { return true },
      // How much articles
      count: 20}],
	  require("./readme-catalogue-generate.js")
  ],
  themeConfig: {
    nav: [...nav],
    lastUpdated: '更新于',
    sidebar:'auto',
    displayAllHeaders: false,
    smoothScroll: true
  } 
}

const path = require('path')
const RSS = require('rss')
const chalk = require('chalk')
const fs = require('fs-extra')
const moment = require('moment')

module.exports = (pluginOptions, ctx) => {
	 
	 let pages, sourceDir;
	 let filter = () => true, count = 20
	 let siteData = {};
  return {
    name: 'rss',
    
	ready(){
      pages = ctx.pages;
	  sourceDir = ctx.sourceDir;
      filter = pluginOptions.filter || filter;
	  count = pluginOptions.count || count;
	  siteData = require(path.resolve(sourceDir, '.vuepress/config.js'))

	},
    generated () {
      const feed = new RSS({
        title: siteData.title,
        description: siteData.description,
        feed_url: `${pluginOptions.site_url}/rss.xml`,
        site_url: `${pluginOptions.site_url}`,
        copyright: `${pluginOptions.copyright ? pluginOptions.copyright : 'snailrend 2022'}`,
        language: 'zh',
      })

      pages
        //.filter(page => String(page.frontmatter.type).toLowerCase() === 'post')
        .filter(page => filter(page.frontmatter))
        .map(page => ({...page, date: new Date(page.frontmatter.date || '')}))
        .sort((a, b) => moment(b.createTime).toDate() - moment(a.createTime).toDate())
        .map(page => {
			return {
          title: page.title,
          description: page.title,
          url: `${pluginOptions.site_url}${page.path}`,
          date: moment(page.createTime).toDate(),
        }})
        .slice(0, count)
        .forEach(page => feed.item(page))

      fs.writeFile(
        path.resolve(ctx.outDir, 'rss.xml'),
        feed.xml()
      );
      console.log(chalk.green.bold('RSS has been generated!'))
    }
  }
}

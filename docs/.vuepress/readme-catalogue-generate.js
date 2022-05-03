const moment = require('moment')

module.exports = (pluginOptions, ctx) => {
	 
	 let pages;
  return {
    name: 'readme-catalogue-generate',
    
	ready(){
      pages = ctx.pages;
	},
    extendPageData($page) {
		$page._content = `${$page._content}\n- aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
		console.log($page._content);
		
    }
  }
}

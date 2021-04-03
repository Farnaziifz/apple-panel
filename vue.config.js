module.exports = {
  chainWebpack: config => {
	if(process.env.NODE_ENV === 'production') {
		config.plugin('optimize-css').tap(([options]) => {
		  options.cssnanoOptions.preset[1].svgo = false
		  return [options]
		})
	}
  },
}
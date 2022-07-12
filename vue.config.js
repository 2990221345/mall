module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  publicPath:'',
  outputDir:'docs',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap:false,  //去掉打包的时候生成的map文件
  // chainWebpack:(config)=>{
  //   config.plugins.delete('prefetch');
  // }
}
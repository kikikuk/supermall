module.exports = {
    configureWebpack:{
        resolve:{
            extensions:[],
            //配置别名
            alias:{
                // '@':'src',   这个别名已经默认配置了
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}
module.export = {
    configureWebpack:{
        resolve:{
            extensions:[],
            //配置别名
            alias:{
                // '@':'src',   这个别名已经默认配置了
                'assets':'src/assets',
                'common':'src/common',
                'components':'src/components',
                'network':'src/network',
                'views':'src/views'
            }
        }
    }
}
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'huoniao',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: 'rgb(255, 60, 0)'
  },
  css:[
    {src: 'iview/dist/styles/iview.css'} ,
    {src:'~/assets/css/main.css', lang: 'scss'}//公共样式
  ],
  router: {
    base: '/huoniao/'
    // base: '/'
  },
  plugins: [
    {src: '~/plugins/iview.js',ssr: true}
    ,{src:'~/plugins/axios.js'}
    ,{src: '~/plugins/vue-picture-preview.js',ssr: false}
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {//axios配置
    baseURL: 'http://192.168.0.222/b/huoniao_front/',//服务端url
    browserBaseURL: '/huoniao/' //客户端url
  },
  proxy: [//跨域配置 只针对axios的客户端访问
    [
      '/huoniao/api',
      {
        // target: 'http://localhost:8080/'
        target: 'http://192.168.0.222'
        , pathRewrite: {'^/huoniao/api': '/b/huoniao_front/api'}
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    // 默认true，只有build才会提取
    extractCSS: { allChunks: false }
    /*
    ** Run ESLint on save
    */
    ,vendor: ['axios'] //防止重复打包
    ,extend (config, { isDev, isClient }) {
      // if (!isDev) {
      //   config.output.publicPath = './_nuxt/';
      // }
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    loaders:[
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 1000, // 1 KO
      //     name: 'fonts/[name].[hash:7].[ext]'
      //   }
      // }
    ]
  },
  //环境变量
  env:{
    // 图片访问地址
    // imgUrl: 'http://localhost:8080/'
    imgUrl: 'http://192.168.0.222/b/huoniao_front'
  }
}


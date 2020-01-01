import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './home',
            },
            {
              path: '/order',
              icon: 'table',
              name: 'order',
              routes: [
                {
                  name: 'all',
                  icon: 'smile',
                  path: '/order/all',
                  component: './order/all',
                },
                {
                  path: '/order/all/order_detail/:id',
                  component: './order/all/order_detail',
                },
                {
                  name: 'draft',
                  icon: 'smile',
                  path: '/order/draft',
                  component: './order/draft',
                },
                {
                  path: '/order/draft/draft_detail/:id',
                  component: './order/draft/draft_detail',
                },
                {
                  path: '/order/draft/create',
                  component: './order/draft/create',
                },
                {
                  name: 'abandoned',
                  icon: 'smile',
                  path: '/order/abandoned',
                  component: './order/abandoned',
                },
              ],
            },
            {
              name: 'customer',
              icon: 'smile',
              path: '/customer',
              component: './customer',
            },
            {
              path: '/customer/new',
              component: './customer/new',
            },
            {
              path: '/customer/customer_detail/:id',
              component: './customer/customer_detail',
            },
            {
              name: 'products',
              icon: 'profile',
              path: '/products',
              routes: [
                {
                  name: 'all-products',
                  icon: 'smile',
                  path: '/products/allProducts',
                  component: './products/allProducts',
                },
                {
                  path: '/products/allProduct/:id',
                  component: './products/addProduct',
                },
                {
                  path: '/products/revisedProducts/:id',
                  component: './products/revisedProducts',
                },
                {
                  path: '/products/revised/:id',
                  component: './products/revisedProduct',
                },
                
              ],
            },
            {
              path: '/',
              redirect: '/dashboard',
              authority: ['admin', 'user'],
            },
           
            
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  publicPath: '/shopify-admin/',
  proxy: {
    '/admin/api/2019-10/': {
      target: 'https://xuzyy.myshopify.com/',
      changeOrigin: true,
    },
  },
  history: 'hash',
};

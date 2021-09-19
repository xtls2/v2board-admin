import { defineConfig } from 'umi'
import chainWebpack from './webpack'

const isProduction = process.env.NODE_ENV === 'production'
console.log('isProduction:', isProduction)
export default defineConfig({
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  targets: {
    ie: 11,
  },
  title: false,
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  manifest: {
    basePath: '/',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  chainWebpack: isProduction ? chainWebpack : undefined,
  chunks: isProduction ? ['vendors', 'compoments', 'umi'] : undefined,
})

import * as path from 'path'

const chainWebpack: any = (config: any, { webpack }: any) => {
  config.optimization.splitChunks({
    chunks: 'all',
    automaticNameDelimiter: '.',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 10,
    maxInitialRequests: 5,
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks: 'all',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
      compoments: {
        name: 'compoments',
        chunks: 'all',
        test: /[\\/]src[\\/]/,
        priority: -11,
      },
    },
  })
}

export default chainWebpack

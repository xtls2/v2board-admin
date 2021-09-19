import { defineConfig } from 'umi'

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/monitor': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  mock: {},
})

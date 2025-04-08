import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import path from 'path'
import fs from 'fs-extra'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isGithub = mode === 'github'
  const outDir = isGithub ? 'docs' : 'dist'

  // 在构建完成后复制 Cesium 资源
  if (command === 'build') {
    const cesiumSource = 'node_modules/cesium/Build/Cesium'
    const cesiumDest = `${outDir}/cesium`
    if (!fs.existsSync(cesiumDest)) {
      fs.copySync(cesiumSource, cesiumDest)
    }
  }

  return {
    base: isGithub ? './' : env.VITE_BASE_URL,
    plugins: [
      vue(),
      cesium()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'public': path.resolve(__dirname, 'public')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/less/var.less')}";`
        }
      }
    },
    optimizeDeps: {
      include: ['cesium']
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir,
      sourcemap: command === 'serve',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
}) 
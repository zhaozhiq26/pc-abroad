import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import viteImagemin from 'vite-plugin-imagemin'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
const Timestamp = new Date().getTime()
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    base: VITE_APP_ENV === 'production' ? '/' : './',
    plugins: [
      vue(),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          AntDesignVueResolver({ importStyle: false })
        ]
      }),
      Components({
        dirs: ['src/components'],
        dts: 'src/components.d.ts',
        extensions: ['vue'],
        deep: true,
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          AntDesignVueResolver({ importStyle: false })
        ]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // 图片压缩
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7, // 设置GIF图片的优化等级为7
          interlaced: false // 不启用交错扫描
        },
        optipng: {
          optimizationLevel: 7 // 设置PNG图片的优化等级为7
        },
        mozjpeg: {
          quality: 20 // 设置JPEG图片的质量为20
        },
        pngquant: {
          quality: [0.8, 0.9], // 设置PNG图片的质量范围为0.8到0.9之间
          speed: 4 // 设置PNG图片的优化速度为4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox' // 启用移除SVG视图框的插件
            },
            {
              name: 'removeEmptyAttrs',
              active: false // 不启用移除空属性的插件
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src')
      },
      extensions: [
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    server: {
      port: 81,
      host: '0.0.0.0',
      open: false,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy http://39.108.187.100:8080/
        '/dev-api': {
          target: 'http://39.108.187.100:8080/',
          // target: 'http://192.168.50.47:8080',
          // target: 'http://1e0fy7d1.dongtaiyuming.net',
          changeOrigin: true,
          // rewrite: p => p.replace(/^\/dev-api/, '')
          rewrite: path => path.replace(/^\/dev-api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/style/element-theme.scss" as *;`
        }
      }
    },
    //  生产环境
    build: {
      minify: 'terser',
      //指定输出路径
      assetsDir: './assets',
      // 指定输出文件路径
      outDir: 'dist',
      sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
      // 代码压缩配置
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        warnings: false,
        output: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: `static/js/[name].[hash]${Timestamp}.js`,
          entryFileNames: `static/js/[name].[hash]${Timestamp}.js`,
          assetFileNames: `static/[ext]/[name].[hash]${Timestamp}.[ext]`
        }
      }
    }
  }
})

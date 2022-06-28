import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// import Components from 'unplugin-vue-components/vite' //是由 Vue官方人员开发的一款自动引入插件，可以省去比如 UI 库的大量 import 语句
// import AutoImport from 'unplugin-auto-import/vite' //自动导入composition api 和 生成全局typescript说明
import viteCompression from 'vite-plugin-compression'//gzip静态资源压缩
// import { ElementPlusResolver,} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    host: '0.0.0.0',
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  },
  plugins: [
    vue(),
    // AutoImport ({
    //   imports: ["vue", "vue-router",'vuex'], // 自动导入vue和vue-router,vuex相关函数,不再需要再页面中通过 import { defineComponent, reactive, toRefs, onMounted, onActivated } from 'vue' 形式引入
    //   dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    // }),
    // Components({
    //   dts: true,// 全局声明
    //   dirs: ['src/components'], // 按需加载的文件夹
    //   resolvers: [ElementPlusResolver()],
    // }),
    viteCompression({ //gzip压缩
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }), 
  ],
  build: {
    // chunkSizeWarningLimit:1500, //设置警告文件最大值
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, //清除console
        drop_debugger: true, //清除debug
      },
    },
  },
})

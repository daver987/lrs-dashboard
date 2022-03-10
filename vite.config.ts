import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import PurgeIcons from 'vite-plugin-purge-icons'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    Components({
      dts: true,
      resolvers: [QuasarResolver(), IconsResolver()],
    }),
    AutoImport({
      // targets to transform
      include: [/\.[tj]s?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
    }),
    vue({
      reactivityTransform: true,
      template: { transformAssetUrls },
    }),
    Icons({ compiler: 'vue3' }),
    PurgeIcons({
      content: ['**/*.html', '**/*.js', '**/*.ts', '**/*.vue'],
    }),
    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'src/quasar-variables.sass',
    }),
    Unocss({
      presets: [presetAttributify(), presetUno(), presetIcons()],
      theme: {
        colors: {
          primary: '#BB880C',
        },
      },
    }),
  ],
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

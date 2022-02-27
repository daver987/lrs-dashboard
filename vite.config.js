import { fileURLToPath, URL } from 'url'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Components from 'unplugin-vue-components/vite'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [QuasarResolver()],
    }),
    vue({
      template: { transformAssetUrls },
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

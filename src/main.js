import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'

import '@purge-icons/generated'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import 'uno.css'
import '@unocss/reset/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)

  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here

    config: {
      // css: [
      //   'app.sass',
      //   '~quasar-ui-qcalendar/src/css/calendar-month.sass'
      // ],
      //
      // build: {
      //   transpile: true,
      //   transpileDependencies: [
      //     /quasar-ui-qcalendar[\\/]src/
      //   ]
      // },
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      // notify: {...}, // default set of options for Notify Quasar plugin
      // loading: {...}, // default set of options for Loading Quasar plugin
      // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    },
  })

// app.component('QCalendarMonth', QCalendarMonth.QCalendarMonth)

app.mount('#app')

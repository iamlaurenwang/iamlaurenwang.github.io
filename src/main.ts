import { createApp } from 'vue'
import { initAnalytics } from '@/composables/useAnalytics'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'

// Must run before app.use(router), which triggers the first navigation.
initAnalytics()

const app = createApp(App)

app.use(router)

app.mount('#app')

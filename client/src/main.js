import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '4384493045-0ta09m4r8kjvurmcifqfle1b018k574p.apps.googleusercontent.com'
})

app.mount('#app')
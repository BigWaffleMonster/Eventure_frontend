import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import { axios_instance } from './api/axios'
// import { useGlobalState } from './store/globalState'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// const { setAxios } = useGlobalState()
// setAxios(axios_instance)

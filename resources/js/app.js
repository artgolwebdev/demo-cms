/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. 
 */
import { createApp } from 'vue';
import { createStore } from 'vuex'
import {useToast} from 'vue-toast-notification'
import { router } from './router'
import { auth } from './store/auth.module'
import App from './components/App.vue'

// Initialize toater plugin 
window.$toast =  useToast()

// Create a new store instance with auth module 
const store = createStore(auth)

let app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')












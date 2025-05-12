import { createApp } from 'vue'
import App from './App.vue'

// Importez la police (via Google Fonts)
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Tektur:wght@400;700&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

createApp(App).mount('#app')
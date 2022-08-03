import { createApp } from 'vue'
import App from './App.vue'
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App)
for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName])
}
app.mount('#app')

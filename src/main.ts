import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from './stores'
import '@/assets/icons/iconfont.css'
import '@/assets/font/myFont.css'
import SvgIcon from '@/components/SvgIcon/index.vue'
// import elementIcons from '@/components/SvgIcon/svgicon'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
// app.use(elementIcons)
app.component('svg-icon', SvgIcon)
app.use(router)
app.use(pinia)
app.mount('#app')

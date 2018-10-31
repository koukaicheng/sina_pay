import tsHeader from './module/header/Header.vue'
import Page from './module/page/Page.vue'
import dsFooter from './module/footer/Footer.vue'
import Sbutton from './module/load-button/LoadButton'
import Delval from './module/delval/Delval'
import Toast from './module/toast'
import Modal from './module/modalKKC'
import { Popup } from 'mint-ui'

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(Page.name, Page)
  Vue.component(dsFooter.name, dsFooter)
  Vue.component(tsHeader.name, tsHeader)
  Vue.component(Sbutton.name, Sbutton)
  Vue.component(Popup.name, Popup)
  Vue.component(Delval.name, Delval)
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$modal = Vue.prototype.$modal = Modal
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

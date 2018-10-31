<template>
  <div>
    <ts-header title="开户协议" back></ts-header>
    <page>
      <div class="wrap">
        <!--<iframe id="test" src=""></iframe>-->
        <!--->
        <canvas v-for="(item,index) in pages" v-show="index!==0" :id="'the-canvas'+index" :key="index"></canvas>
      </div>
    </page>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'

let Base64 = require('js-base64').Base64
import Indicator from '../../components/module/indicator'

export default {
  name: 'openAccount',
  data () {
    return {
      nextPath: 'http://jr.sina.cn.s3.sinaapp.com/2018517/1806292945/984abbfede3d15d6b6a61dee269d036f.pdf',
      pdfDoc: null,
      pages: 0
    }
  },
  created () {
    // this.$api.getAgreement().then((res) => {
    //   console.log(res)
    //   // this.nextPath = res.data[1]
    // })
  },
  mounted () {
    // let url = Base64.decode(this.nextPath)
    this.loadFile(this.nextPath)
    Indicator.open({spinnerType: 'loading'})
  },
  methods: {
    loadFile (url) {
      let _this = this
      PDFJS.getDocument(url).then((pdf) => {
        this.pdfDoc = pdf
        this.pages = _this.pdfDoc.numPages
        this.$nextTick(() => {
          this.renderPage(1)
        }, 200)
      })
    },
    renderPage (num) {
      this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')

        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = '100vh'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (this.pages > num) {
          this.renderPage(num + 1)
          Indicator.close()
        }
      })
    },
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
#test {
  width: 100%;
  height: calc(100vh - 44px);
}
</style>

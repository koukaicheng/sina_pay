<template>
  <div>
    <ts-header title="投资人权益须知" back></ts-header>
    <page>
      <div class="wrap">
        <pdf
          src="http://jr.sina.cn.s3.sinaapp.com/2018517/1806292945/984abbfede3d15d6b6a61dee269d036f.pdf"
          @page-loaded="kkc"></pdf>
      </div>
    </page>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'interests',
  data () {
    return {}
  },
  created () {
    this.$api.getAgreement().then((res) => {
      console.log(res)
      // this.nextPath = res.data[1]
    })
  },
  mounted () {},
  methods: {
    kkc () {

    }
  },
  components: {pdf},
  computed: {}
}
</script>

<style lang="scss" scoped>

</style>

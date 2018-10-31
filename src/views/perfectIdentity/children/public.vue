<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user_info']),
  },
  methods: {
    followUp (res) {
      if (res.code === 200) {
        this.$toast('填写成功')
        this.$emit('infoChange')
        setTimeout(() => {
          this.$router.goBack()
        }, 500)
      } else {
        this.isLoading = false
        this.$modal({message: res.msg, cancel: true, lock: false, theme: 'sss', rightBtn: '确定'})
      }
    }
  }
}
</script>

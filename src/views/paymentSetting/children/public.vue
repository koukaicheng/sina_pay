<script>
import NumberKeyboard from 'vant/lib/number-keyboard'
import 'vant/lib/number-keyboard/style'

export default {
  components: {
    'van-number-keyboard': NumberKeyboard
  },
  data () {
    return {
      showKeyboard: true,
      password: '',
      maxLength: 6,
    }
  },
  filters: {
    passwordText (val) {
      if (!val) {
        return ''
      }
      return '.'
    }
  },
  created () {},
  mounted () {},
  methods: {
    onInput (key) {
      this.password = (this.password + key).slice(0, 6)
    },
    onDelete () {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    focus () {
      if (this.showKeyboard) return
      this.showKeyboard = true
    }
  },
  watch: {
    password (val) {
      if (val.length === 6) {
        this.showKeyboard = false
        this.next()
      }
    },
  },

}
</script>


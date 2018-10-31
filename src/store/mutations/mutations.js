import * as types from './mutations-types'

export default {
  [types.USER_INFO] (state, info) {
    state.user_info = info
    public_methods(info, 'USER_INFO')
  },
  [types.USER_STATUS] (state, obj) {
    state.user_status = obj
    public_methods(obj, 'USER_STATUS')
  },
  [types.STEP_TOKEN] (state, token) {
    state.step_token = token
    public_methods(token, 'STEP_TOKEN')
  },
  [types.USER_ASSRT] (state, info) {
    state.user_asset = info
    public_methods(info, 'USER_ASSRT')
  },
  [types.USER_BANKCARD_INFO] (state, info) {
    state.user_bankCard_info = info
    public_methods(info, 'USER_BANKCARD_INFO')
  },
}

function public_methods (val, type) {
  if (typeof val === 'object') {
    window.localStorage.setItem(type, JSON.stringify(val))
  } else {
    window.localStorage.setItem(type, val)
  }
}

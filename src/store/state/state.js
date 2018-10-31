export default {
  user_info: JSON.parse(window.localStorage.getItem('USER_INFO')) || {},
  user_status: JSON.parse(window.localStorage.getItem('USER_STATUS')) || {},
  user_asset: JSON.parse(window.localStorage.getItem('USER_ASSRT')) || {},
  step_token: JSON.parse(window.localStorage.getItem('STEP_TOKEN')) || '',
  user_bankCard_info: JSON.parse(window.localStorage.getItem('USER_BANKCARD_INFO')) || {},
}

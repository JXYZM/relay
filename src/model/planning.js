import { message } from 'antd'

import { myPost } from '../services/method'

export default {
  namespace: 'planning',
  state: {
    boarder: [],
    uav: [],
    info: [],
  },
  effects: {
    *post_algo_profile({ payload }, sagaEffects) {
      const { call, put } = sagaEffects
      const response = yield call(myPost, payload)
      message.success(response['message'], 3)
      yield put({ type: 'Change_boarder', payload: response })
    },
    *query_from_host({ payload }, sagaEffects) {
      const { call, put } = sagaEffects
      const response = yield call(myPost, payload)
      yield put({ type: 'Change_uav', payload: response })
      console.log(response)
    },
  },
  reducers: {
    Change_boarder(state, { payload: datasets }) {
      const next_boarder = datasets['boarder']
      return {
        boarder: next_boarder,
        uav: state.uav,
        info: state.info,
      }
    },
    Change_uav(state, { payload: datasets }) {
      const next_uav = datasets['uav']
      const next_info = datasets['info']
      return {
        boarder: state.boarder,
        uav: next_uav,
        info: next_info,
      }
    },
  },
}

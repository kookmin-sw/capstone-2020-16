import { combineReducers } from 'redux'
import placementState from './placementState'

export default combineReducers({
    placementState,
    // 다른 리듀서를 만들게 되면 여기에 import
})
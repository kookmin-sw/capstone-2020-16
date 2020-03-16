import { combineReducers } from 'redux'
import placementStateReducer from './placementStateReducer'

const reducer = combineReducers({
    placementStateReducer,
    // 다른 리듀서를 만들게 되면 여기에 import
});

export default reducer;
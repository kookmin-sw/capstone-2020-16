import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import getProblemId from './getProblemId'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		getProblemId,
		...asyncReducers
	});

export default createReducer;

import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import getProblemId from './getProblemId'
import postCode from './postCode'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		getProblemId,
		postCode,
		...asyncReducers
	});

export default createReducer;

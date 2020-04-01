import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import apiTest from './apiTest'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		apiTest,
		...asyncReducers
	});

export default createReducer;

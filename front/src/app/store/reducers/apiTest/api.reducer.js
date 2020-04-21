import * as Actions from 'app/store/actions/apiTest';
import ApiFuncs from '@api/ApiFuncs';

var apiFunc = new ApiFuncs();
var version = {'version': 'v1'}

const initialState = {
	count: 0,
	next: null,
	previous: null,
	results: []
};
var get_info = {
	count: 1
}

const api = async (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_USER: {
			await apiFunc.api_userfullInfo_list(version)
			.then((result) => {
				get_info = result
				// console.log(get_info.count)
			})
			.catch((error) => {
				// console.log(error)
			})

			return {
				...state,
				count: get_info.count,
			}
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default api;

import * as Actions from 'app/store/actions/getProblemId';
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
const getId = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PROBLEMID: {
			apiFunc.api_problem_list(version)
			.then((result) => {
                get_info = result
				// console.log(get_info.count)
				return {
					...state,
					count: get_info.results[0].id,
				}
			})
			.catch((error) => {
				console.log(error)
			})

			return {
				...state,
                count: get_info.results[0].id,
			}
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default getId;
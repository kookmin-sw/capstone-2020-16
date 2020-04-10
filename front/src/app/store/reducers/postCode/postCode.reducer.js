import * as Actions from 'app/store/actions/postCode';
import ApiFuncs from '@api/ApiFuncs';

var apiFunc = new ApiFuncs();
var version = {'version': 'v1'}

const initialState = {
	author: 1,
	problem: 0,
	language: 0,
	name: null,
	code: null,
	available_game: true
};
var post_code = {
	code: null
}
const postCode = (state = initialState, action) => {
	switch (action.type) {
		case Actions.POST_CODE: {
			apiFunc.api_code_create(version)
			.then((result) => {
                post_code = result
				// console.log(get_info.count)
				return {
					...state,
					code: post_code.code,
				}
			})
			.catch((error) => {
				console.log(error)
			})

			return {
				...state,
                code: post_code.code,
			}
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default postCode;
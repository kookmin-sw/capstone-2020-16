import * as Actions from 'app/store/actions/getProblemId';
// import axios from 'axios';

const initialState = {
	count: 0,
	next: null,
	previous: null,
	results: []
};

const getId = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PROBLEMID: {
			return{
				...state,
				results: action.payload,
			}
		}
		default: 
			return {
				...state,
			};
		
		// case Actions.GET_PROBLEM: {

		// 	return{
		// 		...state,
		// 		results[0]: action.payload,
		// 	}
		// }
		// default: {
		// 	return {
		// 		...state,
		// 	};
		// };


		
	}
};

export default getId;
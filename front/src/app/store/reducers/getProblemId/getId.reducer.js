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
			// axios.get('/api/v1/problem/')
			// // apiFunc.api_problem_list(version)
			// .then((result) => {

			// 	console.log(result.data.count)
			// 	return {
			// 		...state,
			// 		count: result.data.count,
			// 	}
			// })
			// .catch((error) => {
			// 	console.log(error)
			// 	return {
			// 		...state,
			// 	}
			// })
			// console.log()
			// axios.get('/api/v1/problem/')
			// .then((result) => {
			// 	return {
			// 		...state,
			// 		count: result.data.count,
			// 	}
			// })
			// .catch((error) => {
			// 	return {
			// 		...state,
			// 	}
			// })
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
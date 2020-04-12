export const GET_PROBLEMID = '[API] GET';
export const GET_PROBLEM = '[API] GET';
// export const CLOSE_DIALOG = '[DIALOG] CLOSE';

export function getProblemId(param) {
	return {
		type: GET_PROBLEMID,
		payload: param
	};
}

export function getProblem(param) {
	return {
		type: GET_PROBLEM,
		payload: param
	};
}

// export function openDialog(options) {
// 	return {
// 		type: OPEN_DIALOG,
// 		options
// 	};
// }

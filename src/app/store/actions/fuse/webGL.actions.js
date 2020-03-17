export const NEXT = 'placementState/NEXT'
export const PREVIOUS = 'placementState/PREVIOUS'

export const next = () => ({ type: NEXT })
export const previous = () => ({ type: PREVIOUS })
// const dispatch = useDispatch();

// export function nextPlacementState() {
//     return dispatch({
//         type: NEXT
//     });
// }

// export function previousPlacementState() {
//     return dispatch({
//         type: PREVIOUS
//     });
// }
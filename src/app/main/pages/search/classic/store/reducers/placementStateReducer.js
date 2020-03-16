import * as Actions from '../actions'

const initialState = {
    chacksoo: [],
    placement: [],
    boardIdx: 0
}

const placementCounter = (state = initialState, action) => {
    switch (action.type) {
        case Actions.NEXT: {
            return {
                ...state,
                placementState: state.placementState + 1
            };
        }
        case Actions.PREVIOUS: {
            return {
                ...state,
                placementState: state.placementState - 1
            };
        }
        default: {
            return state
        }
    }
}

export default placementCounter;
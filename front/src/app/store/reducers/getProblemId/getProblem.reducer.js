import * as Actions from 'app/store/actions/getProblemId';

const intial = {
    id : 0,
    editor : 'problemEditor',
    title : 'problemTitle',
    description: 'problemDescription',
    limit_time: 'problemLimitTime',
    limit_memory: 'problemLimitMemory',
    date: 'problemDate',
    level: 'problemLevel',
    popularity: 'problemPopularity',
    icon: 'problemIcon',
    thumbnail: 'problemThumbnail',
    board_size: 'problemBoardSize',
    board_info: 'problemBoardInfo',
    rule: 'problemRule'
}

const getProblem = (state = intial, action) => {
    switch(action.type){
        case Actions.GET_PROBLEM: {
            return {
                ...state,
                id: action.payload.id,
                editor : action.payload.editor,
                title : action.payload.title,
                description: action.payload.description,
                limit_time: action.payload.limit_time,
                limit_memory: action.payload.limit_memory,
                date: action.payload.date,
                level: action.payload.level,
                popularity: action.payload.popularity,
                icon: action.payload.icon,
                thumbnail: action.payload.thumbnail,
                board_size: action.payload.board_size,
                board_info: action.payload.board_info,
                rule:action.payload.rule
            }
        }
        default:
            return {
                ...state
            };
    }
}

export default getProblem;
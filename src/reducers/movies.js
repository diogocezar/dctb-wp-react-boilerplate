export default function movies(state = [], action) {
    switch (action.type) {
        case 'GET_MOVIES':
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}
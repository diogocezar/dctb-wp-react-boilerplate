export default function musics(state = [], action) {
    switch (action.type) {
        case 'GET_MUSICS':
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}
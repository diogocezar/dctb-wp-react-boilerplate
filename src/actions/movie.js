import axios         from 'axios'
import { endpoints } from '../config'

export function loadMovies(lang = 'pt') {
    return (dispatch) => {
        return axios.get(`${endpoints['movies']}?lang=${lang}`).then((response) => {
            dispatch(getMovies(response.data));
        })
    }
}

function getMovies(movies) {
    return {
        type: 'GET_MOVIES',
        data: movies
    }
}
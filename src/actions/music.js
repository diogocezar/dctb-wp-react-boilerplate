import axios         from 'axios'
import { endpoints } from '../config'

export function loadMusics(lang = 'pt') {
    return (dispatch) => {
        return axios.get(`${endpoints['musics']}?lang=${lang}`).then((response) => {
            dispatch(getMusics(response.data));
        })
    }
}

function getMusics(musics) {
    return {
        type: 'GET_MUSICS',
        data: musics
    }
}
import axios from 'axios'

export function loadMusics(lang = 'pt') {
    const url = `http://localhost/dctb-wp-react-boilerplate/public/api/wp-json/wp/v2/musics?lang=${lang}`
    return (dispatch) => {
        return axios.get(url).then((response) => {
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
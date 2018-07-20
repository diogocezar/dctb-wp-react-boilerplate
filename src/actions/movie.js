import axios from 'axios'

export function loadMovies(lang = 'pt') {
    const url = `http://localhost/dctb-wp-react-boilerplate/public/api/wp-json/wp/v2/movies?lang=${lang}`
    return (dispatch) => {
        return axios.get(url).then((response) => {
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
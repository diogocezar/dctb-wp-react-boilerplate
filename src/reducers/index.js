import { combineReducers } from 'redux'

import movies from './movies'
import musics from './musics'

export default combineReducers({
    movies,
    musics
})
import React    from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// HashRouter

// CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/base.css'

// Pages
import Movie from './pages/Movie/Movie.js'
import Music from './pages/Music/Music.js'

// ServiceWorker
import registerServiceWorker from './service-worker/registerServiceWorker'

// Rendering
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Movie}/>
            <Route path="/musics" component={Music} />
        </Switch>
    </BrowserRouter>
    ,document.getElementById('root')
)

registerServiceWorker()
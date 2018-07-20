import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

// HashRouter

// CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/base.css'

// Pages
import Movie from './pages/Movie/Movie.js'
import Music from './pages/Music/Music.js'
import Form  from './pages/Form/Form.js'

// Store
import Store from './store'

// ServiceWorker
import registerServiceWorker from './service-worker/registerServiceWorker'

// Rendering
ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Fragment>
                <header>
                    <nav>
                        <ul>
                            <li><Link to='/' style={{ 'color': 'red' }}>Home</Link></li>
                            <li><Link to='/musics' style={{ 'color': 'red' }}>Musics</Link></li>
                            <li><Link to='/form' style={{ 'color': 'red' }}>Form</Link></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/" component={Movie} />
                    <Route path="/musics" component={Music} />
                    <Route path="/form" component={Form} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
)

registerServiceWorker()
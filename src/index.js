import React    from 'react'
import ReactDOM from 'react-dom'

// CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/base.css'

// App
import App from './pages/Home/Home.js'

// ServiceWorker
import registerServiceWorker from './service-worker/registerServiceWorker';

// Rendering
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
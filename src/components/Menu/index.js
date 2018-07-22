import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    render() {
        return (
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
            </Fragment>
        )
    }
}

export default Menu
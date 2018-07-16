import React, { Component } from 'react'

import './section.css'

class Section extends Component {
    render() {
        return (
            <section id={this.props.id} style={this.props.styleSection}>
                {this.props.children}
            </section>
        );
    }
}

export default Section
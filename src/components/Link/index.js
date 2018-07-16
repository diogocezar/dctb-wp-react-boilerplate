import React, { Component } from 'react'

class Link extends Component {
    render() {
        const attrs = {}
        attrs['href']      = this.props.href
        attrs['target']    = this.props.target === '_blank' ? '_blank' : '_self'
        attrs['rel']       = this.props.target === '_blank' ? 'noopener noreferrer' : ''
        attrs['className'] = this.props.className
        if(this.props.download != null)
            attrs['download'] = this.props.download
        return (
            <a {...attrs}>
                {this.props.children}
            </a>
        );
    }
}

export default Link
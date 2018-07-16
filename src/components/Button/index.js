import React, { Component } from 'react'
import './button.css'

class Button extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.props.onClickFunction();
    }
    render() {
        return (
            <button id={this.props.id} className={`button button-${this.props.type} ${this.props.sr}`} onClick={this.handleClick}>
                {this.props.label}
            </button>
        );
    }
}

export default Button
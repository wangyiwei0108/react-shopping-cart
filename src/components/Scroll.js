import React, { Component } from 'react'

export default class Scroll extends Component {
    render() {
        return (
            <div className="scroll">
                {this.props.children}
            </div>
        )
    }
}



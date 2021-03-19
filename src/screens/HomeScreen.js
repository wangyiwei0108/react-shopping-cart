import React, { Component } from 'react';
import Gallery from '../components/Gallery';
import Home from '../components/Home';

export default class FirstScreen extends Component {
    render() {
        return (
            <div>
                    <Gallery/>
                    <Home/>
            </div>
        )
    }
}

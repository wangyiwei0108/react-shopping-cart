import React, { Component } from 'react';
import Map from '../components/Map';
import Store from '../components/Store';

export default class FirstScreen extends Component {
    render() {
        return (
            <div className="home">
                <div className="home__store"><Store /></div>
                <div className="home__map"><Map /></div>
            </div>
        )
    }
}
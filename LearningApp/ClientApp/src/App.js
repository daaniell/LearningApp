import React, { Component } from 'react';
import { Route } from 'react-router';
import MainApp from './components/MainApp/MainApp';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Route path='/' component={MainApp} />
        );
    }
}

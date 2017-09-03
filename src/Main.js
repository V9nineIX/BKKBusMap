import React, { Component } from 'react';
import Home from './Home';
import { browserHistory, Router, Route } from 'react-router'


export default class Main  extends Component {
    render(){
        return(
            <Router history={browserHistory}>
            <Route path="/" component={Home}>
            </Route>
            </Router>
        )
    }


} //  end class


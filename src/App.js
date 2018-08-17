import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Header from './views/Header';
import RootView from './views/RootView';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Router history={history}>
            <Route exact path='/' component={RootView} />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Header from './views/Header';
import RootView from './views/RootView';
import DetailView from './views/DetailView';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Router history={history}>
            <div>
              <Route exact path='/' component={RootView} />
              <Route path='/posts/:id' component={DetailView} />
            </div>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;

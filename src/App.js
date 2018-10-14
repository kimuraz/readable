import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Header from './views/Header';
import RootView from './views/RootView';
import DetailView from './views/posts/DetailView';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Router history={history}>
            <div>
              <Switch>
                <Route exact path="/" component={RootView} />
                <Route exact path="/:category" component={RootView} />
                <Route path="/:category/:id" component={DetailView} />
              </Switch>
            </div>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;

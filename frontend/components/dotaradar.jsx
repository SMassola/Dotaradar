import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import { Router, Route, IndexRoute } from 'react-router';
import Main from './main/main';

import { Router, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/auth/steam"></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Router routes={routes} history={appHistory} />, root);
});

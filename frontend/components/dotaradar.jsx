import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import Main from './main/main';

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
  ReactDOM.render(<Router routes={routes} history={hashHistory} />, root);
});

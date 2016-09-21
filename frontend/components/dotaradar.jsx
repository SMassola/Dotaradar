import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import { Router, Route } from 'react-router';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Route path="/" component={App}>
    <Route path="/auth/steam"></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Router routes={routes} />, root);
});

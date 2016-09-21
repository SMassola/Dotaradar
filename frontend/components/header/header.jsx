import React from 'react';
import { hashHistory } from 'react-router';

const SessionStore = require('../../stores/session_store');

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: $('#user').data('source')}
  }

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this._handleUser);
  }

  componentDidUnmount() {
    this.sessionListener.remove();
  }

  _handleUser() {
    this.setState({currentUser: SessionStore.currentUser()});
  }

  render() {
    let user = this.state.currentUser
    return (
      <div className="header-container">
        { user ? <div className="user-container">
          <div className="username">Welcome, {user["nickname"]}!</div>
          <img src={user["image"]} className="avatar"></img>
          <a className="auth-button" href='/logout'>Log Out</a>
        </div> : <a className="auth-button" href='/auth/steam'>Log In</a> }
      </div>
    )
  }
}

export default Header;

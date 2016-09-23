import React from 'react';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: $('#user').data('source')}
  }

  render() {
    let user = this.state.currentUser
    return (
      <div className="header-container">
        <div className="header-title">Dota<div className="red">Radar</div></div>
        { user ? <div className="user-container">
          <div className="username">Welcome, {user["nickname"]}!</div>
          <img src={user["image"]} className="avatar"></img>
          <a className="auth-button" href='/logout'>Log Out</a>
        </div> : <div className="user-container">
          <a className="auth-button" href='/auth/steam'>Log In</a>
        </div> }
      </div>
    )
  }
}

export default Header;

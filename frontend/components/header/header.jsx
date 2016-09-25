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
        <div className="header-title">
          Dota
          <div className="red-text">Radar</div>
        </div>
        { user ? <div className="user-container">
          <div className="username">Welcome, {user["nickname"]}!</div>
          <img src={user["image"]} className="avatar"></img>
          <a className="log-out" href='/logout'>
            <img className="steam-img"src="https://res.cloudinary.com/deeucxgdi/image/upload/v1474822067/steam_cvvjxk.png"></img>
            <div className="log-out-text">Log Out</div>
          </a>
        </div> : <div className="user-container">
          <a className="log-in" href='/auth/steam'>
            <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_large_noborder.png"></img>
          </a>
        </div> }
      </div>
    )
  }
}

export default Header;

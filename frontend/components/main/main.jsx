import React from 'react';

import RadarContainer from '../radar/radar_container';
import FriendsIndex from '../user/friends_index';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: $('#user').data('source')}
  }

  _toggle() {

  }

  render() {
    let user = this.state.currentUser
    let userId = user ? user["uid"] : null
    return (
      <div className="main-container">
        <RadarContainer userId={userId} />
        <div className="accounts-container">
          <div className="main-user">
            <div className="main-user-title">You</div>
            {user ?
              <div className="main-user-info">
                <input type="checkbox" onChange={this._toggle}></input>
                <img src={user["image"]} className="index-item-avatar"></img>
                <div className="index-item-username">{user["nickname"]}</div>
              </div> : <div className="main-user-info"></div>}
          </div>
          <FriendsIndex userId={userId} user={user} />
        </div>
      </div>
    )
  }
}

export default Main;

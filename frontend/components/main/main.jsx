import React from 'react';

import RadarContainer from '../radar/radar_container';
import FriendsIndex from '../user/friends_index';
import MainUser from '../user/main_user';
import CurrentDisplay from '../display/current_display';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: $('#user').data('source')}
  }

  render() {
    let user = this.state.currentUser
    let userId = user ? user["uid"] : null
    return (
      <div className="main-container">
        <CurrentDisplay userId={userId} />
        <RadarContainer userId={userId} />
        <div className="accounts-container">
          <MainUser userId={userId} user={user}/>
          <FriendsIndex userId={userId} user={user} />
        </div>
      </div>
    )
  }
}

export default Main;

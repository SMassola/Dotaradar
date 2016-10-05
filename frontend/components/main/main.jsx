import React from 'react';

import RadarContainer from '../radar/radar_container';
import FriendsIndex from '../user/friends_index';
import MainUser from '../user/main_user';
import CurrentDisplay from '../display/current_display';
import Tabs from '../display/tabs';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: $('#user').data('source'), tab: null}
    this._handleTab = this._handleTab.bind(this);
  }

  _handleTab(tab) {
    this.setState({tab: tab})
  }

  render() {
    let user = this.state.currentUser
    let userId = user ? user["uid"] : null
    return (
      <div className="main-container">
        <div className="display-toggle">
          <Tabs userId={userId} handleTab={this._handleTab} />
          <CurrentDisplay userId={userId} tab={this.state.tab}/>
        </div>
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

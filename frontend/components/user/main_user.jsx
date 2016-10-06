import React from 'react';

import MatchActions from '../../actions/match_actions';

class MainUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: true}
    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    if (this.state.show) {
      MatchActions.removeMatches(this.props.userId);
    } else {
      MatchActions.fetchMatches(this.props.userId);
    }
    this.setState({show: !this.state.show});
  }

  render() {
    let user = this.props.user;
    let userId = this.props.userId;

    return (
      <div className="main-user">
        <div className="main-user-title">You</div>
        {user ?
          <div className="main-user-info" id={userId} onClick={this._handleToggle}>
            <img src={user["image"]} className="index-item-avatar"></img>
            <div className="index-item-username">{user["nickname"]}</div>
          </div> : ""}
      </div>
    )
  }
}

export default MainUser;

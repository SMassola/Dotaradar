import React from 'react';

import MatchActions from '../../actions/match_actions';

class MainUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: true, data: null}
    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    if (this.state.show) {
      MatchActions.removeMatches(this.props.userId)
    } else {
      if (this.state.data) {
        MatchActions.reuseMatches(this.state.data)
      } else {
        MatchActions.fetchMatches(this.props.userId);
      }
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
          <div className="main-user-info" id={userId}>
            <input type="checkbox" onChange={this._handleToggle} checked={this.state.show}></input>
            <img src={user["image"]} className="index-item-avatar"></img>
            <div className="index-item-username">{user["nickname"]}</div>
          </div> : <div className="main-user-info"></div>}
      </div>
    )
  }
}

export default MainUser;

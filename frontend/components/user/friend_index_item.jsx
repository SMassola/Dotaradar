import React from 'react';

import MatchActions from '../../actions/match_actions';

class FriendIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: false, data: null}
    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    if (this.state.show) {
      MatchActions.removeMatches(this.props.friend["steamid"])
    } else {
      if (this.state.data) {
        MatchActions.reuseMatches(this.state.data)
      } else {
        MatchActions.fetchMatches(this.props.friend["steamid"]);
      }
    }
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className="friend-index-item-container">
        <div className="friend-index-item" id={this.props.friend["steamid"]}>
          <input type="checkbox" onChange={this._handleToggle}></input>
          <img src={this.props.friend["avatar"]} className="index-item-avatar"></img>
          <div className="index-item-username">{this.props.friend["personaname"]}</div>
        </div>
      </div>
    )
  }
}

export default FriendIndexItem;

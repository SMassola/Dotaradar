import React from 'react';

import MatchActions from '../../actions/match_actions';

class FriendIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: false}
    this._handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    if (this.state.show) {
      MatchActions.removeMatches(this.props.friend["steamid"]);
    } else {
      MatchActions.fetchMatches(this.props.friend["steamid"]);
    }
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className="friend-index-item-container">
        <div className="friend-index-item" id={this.props.friend["steamid"]} onClick={this._handleToggle}>
          <img src={this.props.friend["avatar"]} className="index-item-avatar"></img>
          <div className="index-item-username">{this.props.friend["personaname"]}</div>
        </div>
      </div>
    )
  }
}

export default FriendIndexItem;

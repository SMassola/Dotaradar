import React from 'react';

class FriendIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="friend-index-item-container">
        <div className="friend-index-item">
          <input type="checkbox"></input>
          <img src={this.props.friend["avatar"]} className="index-item-avatar"></img>
          <div className="index-item-username">{this.props.friend["personaname"]}</div>
        </div>
      </div>
    )
  }
}

export default FriendIndexItem;

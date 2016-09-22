import React from 'react';
import FriendActions from '../../actions/friend_actions'
import FriendStore from '../../stores/friend_store'
import FriendIndexItem from './friend_index_item'

class FriendsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {friends: []}
    this._handleFriends = this._handleFriends.bind(this)
  }

  componentDidMount() {
    this.friendListener = FriendStore.addListener(this._handleFriends);
    if (this.props.userId) {
      FriendActions.fetchFriends(this.props.userId);
    }
  }

  componentWillUnmount() {
    this.friendListener.remove();
  }

  _handleFriends() {
    this.setState({friends: FriendStore.allFriends()})
  }

  render() {
    return (
      <div className="friends-index-container">
        <div className="friends-index-title">Friends</div>
        <div className="friends-index">
          {this.state.friends.map((friend) => {
            return(
              <FriendIndexItem friend={friend} key={friend["steamid"]}/>
            );
          })}
        </div>

      </div>
    )
  }
}

export default FriendsIndex;

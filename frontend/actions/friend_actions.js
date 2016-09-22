import FriendApiUtil from '../util/friend_api_util';
import FriendConstants from '../constants/friend_constants';
import AppDispatcher from '../dispatcher/dispatcher';

module.exports = {
  fetchFriends(userId) {
    FriendApiUtil.fetchFriends(userId, this.receiveFriends)
  },

  receiveFriends(friends) {
    AppDispatcher.dispatch({
      actionType: FriendConstants.FRIENDS_FETCHED,
      friends: friends
    })
  }
}

import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import FriendConstants from '../constants/friend_constants';
import FriendActions from '../actions/friend_actions';

const FriendStore = new Store(AppDispatcher);

let _friends = {};

FriendStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FriendConstants.FRIENDS_FETCHED:
      resetAllFriends(payload.friends)
      FriendStore.__emitChange();
      break;
  }
}

function resetAllFriends(friends) {
  _friends = {};
  let steamFriends = friends["friends"]["response"]["players"]
  steamFriends.forEach((friend) => {
    _friends[friend["steamid"]] = friend;
  })
}

FriendStore.allFriends = function() {
  return Object.keys(_friends).map(id => {
    return _friends[id];
  })
}

module.exports = FriendStore;

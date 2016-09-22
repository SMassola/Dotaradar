import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import MatchConstants from '../constants/match_constants';
import MatchActions from '../actions/match_actions';

const MatchStore = new Store(AppDispatcher);

let _matches = {};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MatchConstants.MATCHES_FETCHED:
      resetAllMatches(payload.matches)
      MatchStore.__emitChange();
      break;
  }
}

function resetAllMatches(matches) {
  console.log("hello");
  console.log(matches);
  // _matches = {};
  // let steamMatches = matches["matches"]["response"]["players"]
  // steamMatches.forEach((friend) => {
  //   _matches[friend["steamid"]] = friend;
  // })
}

MatchStore.allMatches = function() {
  return Object.keys(_matches).map(id => {
    return _matches[id];
  })
}

module.exports = MatchStore;

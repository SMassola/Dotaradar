import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import MatchConstants from '../constants/match_constants';
import MatchActions from '../actions/match_actions';

const MatchStore = new Store(AppDispatcher);

let _matchSets = {};
let _matchHeroes = {};
let _matchData = {};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MatchConstants.MATCHES_FETCHED:
    console.log(payload.matches);
      addMatchSets(payload.matches);
      addHeroes(payload.matches);
      addMatchSetsData();
      MatchStore.__emitChange();
      break;
    case MatchConstants.MATCHES_REMOVAL:
      deleteMatch(payload.userId);
      MatchStore.__emitChange();
      break;
  }
};

function deleteMatch(userId) {
  delete _matchSets[userId];
  delete _matchHeroes[userId];
  delete _matchData[userId];
}

function addMatchSets(matches) {
  _matchSets[matches["userId"]] = matches["matches"]
}

function addHeroes(matches) {
  _matchHeroes[matches["userId"]] = []
  matches["matches"].forEach((match) => {
    _matchHeroes[matches["userId"]].push(match["user"]["hero_name"]);
  })
}

function addMatchSetsData() {
  Object.keys(_matchHeroes).forEach((user) => {
    _matchData[user] = {};
    _matchHeroes[user].forEach((hero) => {
      _matchData[user][hero] = _matchData[user][hero] ? _matchData[user][hero] + 1 : 1
    })
  })
}

MatchStore.allMatchData = function() {
  return _matchData
}

module.exports = MatchStore;

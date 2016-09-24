import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import MatchConstants from '../constants/match_constants';
import MatchActions from '../actions/match_actions';

const MatchStore = new Store(AppDispatcher);

let _matchSets = {};
let _matchHeroes = {};
let _matchData = {};
let _matches = {};
let _heroes = {};
let _data = {};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MatchConstants.MATCHES_FETCHED:
      addMatchSets(payload.matches);
      addMatchSetsHeroes(payload.matches);
      addMatchSetsData();

      resetAllMatches(payload.matches);
      resetAllHeroes(payload.matches);
      calculatePercentages();
      MatchStore.__emitChange();
      break;
    case MatchConstants.MATCHES_REMOVAL:
      deleteMatch(payload.userId);
      MatchStore.__emitChange();
      break;
    case MatchConstants.MATCHES_REUSED:
      readdMatches(payload.matches);
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

function addMatchSetsHeroes(matches) {
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

function calculatePercentages() {
  _data = {};
  Object.keys(_heroes).forEach(match => {
    _data[_heroes[match]] = _data[_heroes[match]] ? _data[_heroes[match]] + 1 : 1
  })
  return _data
}

function resetAllMatches(matches) {
  _matches = {};
  let steamMatches = matches["matches"];
  steamMatches.forEach((match) => {
    _matches[match["match_id"]] = match;
  });
}

function resetAllHeroes(matches) {
  _heroes = {};
  let steamMatches = matches["matches"];
  steamMatches.forEach((match) => {
    _heroes[match["match_id"]] = match["user"]["hero_name"];
  });
}

MatchStore.allMatches = function() {
  return Object.keys(_matches).map(id => {
    return _matches[id];
  });
};

MatchStore.allHeroes = function() {
  return Object.keys(_heroes).map(match_id => {
    return _heroes[match_id];
  });
};

MatchStore.allData = function() {
  return _data
};

MatchStore.allMatchData = function() {
  return _matchData
}

module.exports = MatchStore;

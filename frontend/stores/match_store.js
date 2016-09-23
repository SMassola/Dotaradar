import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import MatchConstants from '../constants/match_constants';
import MatchActions from '../actions/match_actions';

const MatchStore = new Store(AppDispatcher);

let _matches = {};
let _heroes = {};
let _data = {};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MatchConstants.MATCHES_FETCHED:
      resetAllMatches(payload.matches);
      resetAllHeroes(payload.matches);
      calculatePercentages();
      MatchStore.__emitChange();
      break;
  }
};

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


module.exports = MatchStore;

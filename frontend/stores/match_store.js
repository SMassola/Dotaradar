import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import MatchConstants from '../constants/match_constants';
import MatchActions from '../actions/match_actions';

const MatchStore = new Store(AppDispatcher);

let _matchSets = {};
let _matchHeroes = {};
let _matchAlliedHeroes = {};
let _matchEnemyHeroes = {};
let _matchData = {};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MatchConstants.MATCHES_FETCHED:
      addMatchSets(payload.matches);
      addHeroes(payload.matches);
      addAlliedHeroes(payload.matches);
      addEnemyHeroes(payload.matches);

      addHeroData();
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
  delete _matchAlliedHeroes[userId];
  delete _matchEnemyHeroes[userId];
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

function addAlliedHeroes(matches) {
  _matchAlliedHeroes[matches["userId"]] = []
  matches["matches"].forEach((match) => {
    _matchAlliedHeroes[matches["userId"]] = _matchAlliedHeroes[matches["userId"]].concat(match["teammate"])
  })
}

function addEnemyHeroes(matches) {
  _matchEnemyHeroes[matches["userId"]] = []
  matches["matches"].forEach((match) => {
    _matchEnemyHeroes[matches["userId"]] = _matchEnemyHeroes[matches["userId"]].concat(match["enemy"])
  })
}

function addHeroData() {
  Object.keys(_matchHeroes).forEach((user) => {
    _matchData[user] = {heroes: {}, allied: {}, enemy: {}};
    _matchHeroes[user].forEach((hero) => {
      _matchData[user]["heroes"][hero] = _matchData[user]["heroes"][hero] ? _matchData[user]["heroes"][hero] + 1 : 1
    })
  })
  Object.keys(_matchAlliedHeroes).forEach((user) => {
    _matchAlliedHeroes[user].forEach((hero) => {
      _matchData[user]["allied"][hero["hero_name"]] = _matchData[user]["allied"][hero["hero_name"]] ? _matchData[user]["allied"][hero["hero_name"]] + 1 : 1
    })
  })
  Object.keys(_matchEnemyHeroes).forEach((user) => {
    _matchEnemyHeroes[user].forEach((hero) => {
      _matchData[user]["enemy"][hero["hero_name"]] = _matchData[user]["enemy"][hero["hero_name"]] ? _matchData[user]["enemy"][hero["hero_name"]] + 1 : 1
    })
  })
}

MatchStore.allMatchData = function() {
  return _matchData
}

module.exports = MatchStore;

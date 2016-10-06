import MatchApiUtil from '../util/match_api_util';
import MatchConstants from '../constants/match_constants';
import AppDispatcher from '../dispatcher/dispatcher';

module.exports = {
  fetchMatches(userId) {
    MatchApiUtil.fetchMatches(userId, this.receiveMatches)
  },

  receiveMatches(matches) {
    AppDispatcher.dispatch({
      actionType: MatchConstants.MATCHES_FETCHED,
      matches: matches
    })
  },

  removeMatches(userId) {
    AppDispatcher.dispatch({
      actionType: MatchConstants.MATCHES_REMOVAL,
      userId: userId
    })
  }
}

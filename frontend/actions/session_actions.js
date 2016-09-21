const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const SessionActions = {
  receiveCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.AUTH,
      currentUser: $('#user').data('source')
    });
  }
};

module.exports = SessionActions;

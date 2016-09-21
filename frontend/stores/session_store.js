const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const SessionStore = new Store(AppDispatcher);

let _currentUser = {};

const currentUser = function(user) {
  _currentUser = user;
};

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.AUTH:
      _currentUser(payload.currentUser);
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

module.exports = SessionStore;

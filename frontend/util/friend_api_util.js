module.exports = {
  fetchFriends(id, callback) {
    $.ajax({
      url: 'api/requests/friends',
      method: 'get',
      data: {userId: id},
      success: function(resp) {
        callback(resp);
      }
    });
  }
};

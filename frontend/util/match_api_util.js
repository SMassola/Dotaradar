module.exports = {
  fetchMatches(id, callback) {
    $.ajax({
      url: 'api/requests/matches',
      method: 'get',
      data: {userId: id},
      success: function(resp) {
        callback(resp);
      }
    });
  }
};

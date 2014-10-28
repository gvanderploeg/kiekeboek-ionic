'use strict';

angular.module('kiekeboek').service('accountService', function accountService(localStorage, logger) {

  var get = function () {
    if (localStorage.account === undefined) {
      save("", "");
    }
    return JSON.parse(localStorage.account);
  };

  var save = function(username, password) {
    var serialized = JSON.stringify({'username': username, 'password': password});
    localStorage.account = serialized;
  };

  return {
    save: function(u, p) {
      save(u, p);
      logger.log("Setting user/pass to: " + u + "/***");
    },
    get: function() {
      return get();
    }
  };
});
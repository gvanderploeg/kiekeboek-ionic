'use strict';

angular.module('kiekeboek').service('accountService', function accountService(localStorage) {

  var get = function () {
    console.log("account: " + localStorage.account);
    if (localStorage.account === undefined) {
      save("", "");
    }
    return JSON.parse(localStorage.account);
  };

  var save = function(username, password) {
    var serialized = JSON.stringify({'username': username, 'password': password});
    console.log("serialized: " + serialized);
    localStorage.account = serialized;
  };

  return {
    save: function(u, p) {
      save(u, p);
    },
    get: function() {
      return get();
    }
  };
});
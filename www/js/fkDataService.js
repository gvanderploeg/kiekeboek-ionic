'use strict';

/**
 * @ngdoc service
 * @name fkIntranetAppApp.Fkappservice
 * @description
 * # Fkappservice
 * Service in the fkIntranetAppApp.
 */
angular.module('kiekeboek').service('fkDataService', function fkDataService($http, accountService) {

    var
    hasLoggedIn = false,
      baseUrl = 'http://www.fonteinkerkhaarlem.nl/intranet/',

      logout = function() {
        return $http.get(baseUrl + 'people/logout');
      },


      login = function(callback) {
        var account = accountService.get();

        logout().then(function () {
          $http({
            method: 'POST',
            url: baseUrl + 'login',
            data: '_method=POST&data[Person][username]=' + account.username + '&data[Person][password]=' + account.password,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers) {
            // TODO: cannot actually distinct between successful and failed login :-(
            // Success does a redirect to an html page and $http gives the response to that last request.
            hasLoggedIn = true;
              if (typeof callback !== 'undefined') {
                callback();
              }
          })
            .error(function () {
              console.log("Login did not succeed.");
            });
        });
    },

    getDataRemote = function (callback) {
      $http.get(baseUrl + 'people/export.json', {cache: true})
        .success(function (response) {
          callback(response.data);
        })
        .error(function (response, status, headers, config) {
          console.log("error fetching json data: " + status + ", " + response + ", " + headers + ", " + config);
        });
    };

  return {
    getData: function (callback) {
      hasLoggedIn || login(function() {
        getDataRemote(callback);
      });
    }
  };
});
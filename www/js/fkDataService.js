'use strict';

/**
 * @ngdoc service
 * @name fkIntranetAppApp.Fkappservice
 * @description
 * # Fkappservice
 * Service in the fkIntranetAppApp.
 */
angular.module('kiekeboek').service('fkDataService', function fkDataService($http, accountService, $ionicPopup) {

    var
    hasLoggedIn = false,
      baseUrl = 'http://www.fonteinkerkhaarlem.nl/intranet/',

      logout = function() {
        return $http.get(baseUrl + 'people/logout');
      },


      login = function(callback) {
        var account = accountService.get();

        logout().then(function () {
          $ionicPopup.alert({template: 'after logout'});
          $http({
            method: 'POST',
            url: baseUrl + 'login',
            data: '_method=POST&data[Person][username]=' + account.username + '&data[Person][password]=' + account.password,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers) {
            $ionicPopup.alert({template: 'login success'});
            // TODO: cannot actually distinct between successful and failed login :-(
            // Success does a redirect to an html page and $http gives the response to that last request.
            hasLoggedIn = true;
              if (typeof callback !== 'undefined') {
                callback();
              }
          })
            .error(function () {
              $ionicPopup.alert({template: 'login error'});
              console.log("Login did not succeed.");
            });
        });
    },

    getDataRemote = function (callback) {
      $http.get(baseUrl + 'people/export.json', {cache: true})
        .success(function (response) {
          $ionicPopup.alert({template: 'getDataRemote success'});
          callback(response.data);
        })
        .error(function (response, status, headers, config) {
          $ionicPopup.alert({template: 'getDataRemote error'});
          console.log("error fetching json data: " + status + ", " + response + ", " + headers + ", " + config);
        });
    };

  return {
    // TODO: proper caching (in localstorage?)
    getData: function (callback) {
      $ionicPopup.alert({template: 'getData'});
      hasLoggedIn || login(function() {
        getDataRemote(callback);
      });
    }
  };
});
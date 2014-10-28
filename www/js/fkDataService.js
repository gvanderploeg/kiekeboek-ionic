'use strict';

/**
 * @ngdoc service
 * @name fkIntranetAppApp.Fkappservice
 * @description
 * # Fkappservice
 * Service in the fkIntranetAppApp.
 */
angular.module('kiekeboek').service('fkDataService', ['$http', 'accountService', 'logger', function fkDataService($http, accountService, logger) {

    var
    hasLoggedIn = false,
      baseUrl = 'http://www.fonteinkerkhaarlem.nl/intranet/',


      logHttpError = function (url, data, status, headers, config) {
        logger.log("error when calling " + url + ": " + (!!data ? data.substring(0, 100) : data) + ", headers: " + headers() +", " + status + ", " + config);
      },

      logout = function() {
        return $http.get(baseUrl + 'people/logout');
      },


      login = function(callback) {
        var account = accountService.get();
        logger.log("About to login with account: " + account.username);

        logout().success(function () {
          var loginUrl = baseUrl + 'login';
          $http({
            method: 'POST',
            url: loginUrl,
            data: '_method=POST&data[Person][username]=' + account.username + '&data[Person][password]=' + account.password,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers) {
            // TODO: cannot actually distinct between successful and failed login :-(
            // Success does a redirect to an html page and $http gives the response to that last request.
            hasLoggedIn = true;
            logger.log("has logged in");
              if (typeof callback !== 'undefined') {
              logger.log("calling callback: " + callback);
                callback();
              }
          }).error(function(data, status, headers, config) {
            logHttpError(loginUrl, data, status, headers, config);
          });
        }).error(function(data, status, headers, config) {
          logHttpError('logout', data, status, headers, config);
        });
    },

    getDataRemote = function (callback) {
      var url = baseUrl + 'people/export.json';
      logger.log("About to get " + url);
      $http.get(url)
        .success(function (response) {
          logger.log("successfully called " + url);
          logger.log("typeof data: " + typeof response.data);
          if (typeof response === 'object' && response.data) {
            callback(response.data);
          } else {
              callback([]);
          }
        })
        .error(function(data, status, headers, config) {
          logHttpError(url, data, status, headers, config);
        });
    };

  return {
    getData: function (callback) {
      hasLoggedIn || login(function() {
        getDataRemote(callback);
      });
    }
  };
}]);
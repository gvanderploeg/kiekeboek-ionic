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
        logger.log("in logout()");
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
            if (data.indexOf('Ongeldige gebruikersnaam of wachtwoord') === -1) {
              hasLoggedIn = true;
              logger.log("has logged in");
              if (typeof callback !== 'undefined') {
                logger.log("calling callback: " + callback);
                callback();
              }
            } else {
              hasLoggedIn = false;
              logger.log("Login failed for username '" + account.username + "', invalid credentials.");
            }
          }).error(function(data, status, headers, config) {
            logHttpError(loginUrl, data, status, headers, config);
          });
        }).error(function() {
          logger.log('logout error, will log: ' + status);
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
        resetLogin: function() {
        hasLoggedIn = false;
        logger.log("reset login-status to false, this will trigger new login next time.");
      },
      getData: function (callback) {
        logger.log("in getData(). hasLoggedIn: " + hasLoggedIn);
        if (hasLoggedIn) {
          getDataRemote(callback);
        } else {
          login(function() {
            getDataRemote(callback);
          });
        }
      }
    };
  }]);
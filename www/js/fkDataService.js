'use strict';

/**
 * @ngdoc service
 * @name fkIntranetAppApp.Fkappservice
 * @description
 * # Fkappservice
 * Service in the fkIntranetAppApp.
 */
angular.module('kiekeboek').service('fkDataService', function fkDataService($http) {

  var data = [],

    login = function(callback) {
      $http({
        method: 'POST',
        url: 'http://www.fonteinkerkhaarlem.nl/intranet/login',
        data: "_method=POST&data[Person][username]=geertvanderploeg&data[Person][password]=",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function() {
        if (typeof callback !== 'undefined') {
          callback();
        }
      })
    },

    getDataRemote = function (callback) {
      $http({
        method: 'GET',
        url: 'http://www.fonteinkerkhaarlem.nl/intranet/people/export.json'
      })
        .success(function (response) {
          data = response;
          callback(data.data);
        })
        .error(function (response, status, headers, config) {
          console.log("error fetching json data: " + status + ", " + response + ", " + headers + ", " + config);
        });
    };

  return {
    // TODO: proper caching (in localstorage?)
    getData: function (callback) {
      login();
      getDataRemote(callback);
    }
  };
});
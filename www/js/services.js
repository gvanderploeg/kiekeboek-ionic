angular.module('kiekeboek.services', [])

.factory('personService', ['$http', 'fkDataService', 'localStorage', function($http, fkDataService, localStorage) {

    var personsMap = {},
      personsArray = [];

    var getFromLocalStorage = function() {
      return JSON.parse(localStorage.persons);
    };


    var cacheInLocalStorage = function(persons) {
      localStorage.persons = JSON.stringify(persons);
    }

    /**
     * Save in an array and in a map
     * @param data
     */
    var cacheInMemory = function(data) {

      angular.forEach(data, function (value, key) {
        this[value.persoonid] = value;
      }, personsMap);

        personsArray = data;
    };

    var withdata = function(callback) {

      if (personsArray.length > 0) {
        callback(personsArray);
      } else if (typeof localStorage.persons !== 'undefined') {
        var data = getFromLocalStorage();
        cacheInMemory(data);
        callback(data);
      } else {
        fkDataService.getData(function (data) {
        cacheInLocalStorage(data);
        cacheInMemory(data);
        callback(data);
        });
      }
    };

  return {
    all: function(callback) {
      withdata(function(personsArray) {
        callback(personsArray);
    });
    },

    get: function(personId, callback) {
      if (personsArray.length > 0) {
        callback(personsMap[personId]);
      }
      else {
      withdata(function(personsArray) {
        callback(personsMap[personId]);
      });
      }
    }
  }
}]);

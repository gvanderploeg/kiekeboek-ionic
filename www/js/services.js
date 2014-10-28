angular.module('kiekeboek.services', [])

.factory('personService', ['$http', 'fkDataService', 'localStorage', 'logger', function($http, fkDataService, localStorage, logger) {

    var personsMap = {},
      personsArray = [];

    var getFromLocalStorage = function() {
      try {
        return JSON.parse(localStorage.persons);
      } catch (e) {
        return [];
      }
    };


    var cacheInLocalStorage = function(persons) {
      localStorage.persons = JSON.stringify(persons);
    };

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

    var withdata = function (callback) {
      logger.log("In withdata");
      if (personsArray.length > 0) {
        logger.log("array length > 0")
        callback(personsArray);
      } else {
        var persons = getFromLocalStorage();
        if (persons.length > 0) {
          logger.log("got " + persons.length + " persons from local storage");
          cacheInMemory(persons);
          callback(persons);
        } else {
          logger.log("Getting data from fkDataService");
          fkDataService.getData(function (persons) {
            logger.log("Caching in local storage and mem");
            cacheInLocalStorage(persons);
            cacheInMemory(persons);
            callback(persons);
          });
        }
      }
    };

  return {
    all: function(callback) {
      logger.log("About to get all() persons...")
      withdata(function(personsArray) {
        callback(personsArray);
    });
    },

    get: function(personId, callback) {
      withdata(function() {
        callback(personsMap[personId]);
      });
      }
    }
  }
}]);

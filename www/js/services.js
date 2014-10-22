angular.module('kiekeboek.services', [])

.factory('personService', ['$http', 'fkDataService', function($http, fkDataService) {

    var persons = [];

    var withdata = function(callback) {
      if (persons.length > 0) {
        callback(persons);
      } else {
        fkDataService.getData(function (data) {
          persons = data;
          callback(persons);
        });
      }
    };

  return {
    all: function(callback) {
      withdata(function(persons) {
        callback(persons);
    });
    },

    get: function(personId, callback) {
      withdata(function(persons) {
        callback(persons[personId]);
      });
    }
  }
}]);

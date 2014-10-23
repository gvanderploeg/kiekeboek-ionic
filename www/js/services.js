angular.module('kiekeboek.services', [])

.factory('personService', ['$http', 'fkDataService', function($http, fkDataService) {

    var personsMap = {},
      personsArray = [];

    var withdata = function(callback) {

      if (personsArray.length > 0) {
        callback(personsArray);
      } else {
        fkDataService.getData(function (data) {
          angular.forEach(data, function(value, key) {
            this[value.persoonid] = value;
          }, personsMap);

          personsArray = data;
          callback(personsArray);
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

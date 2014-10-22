angular.module('starter.services', [])

.factory('personService', function($http) {

    var persons = [];

    var personPromise = $http.get('/data/kiekeboek_seed.json')
    .then(function(data) {
      persons = data.data.data;
      console.table(persons);
    });

    var withdata = function(callback) {
      if (persons.length > 0) {
        callback(persons);
      } else {
        personPromise.then(function () {
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
});

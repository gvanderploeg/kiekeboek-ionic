angular.module('kiekeboek.controllers', [])

.controller('SearchCtrl', function($scope, personService) {

    $scope.search = {};

    $scope.searchFilter = function (person) {
      var re = new RegExp($scope.search.term, 'i');
      return re.test(person.roepnaam + " " + person.achternaam_met_tussenvoegsel);
    };

    personService.all(function(persons) {
      $scope.personList = persons;
    });
})


.controller('PersonCtrl', function($scope, $stateParams, personService) {

    personService.get($stateParams.id, function(person) {
      $scope.person = person;
    })
});
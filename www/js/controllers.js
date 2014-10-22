angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, personService) {
    personService.all(function(persons) {
      $scope.personList = persons;
    });

    $scope.searchFilter = function (person) {
      var re = new RegExp($scope.searchTerm, 'i');
      console.log($scope.searchTerm);
      return re.test(person.roepnaam) || re.test(person.achternaam);
    };
})


.controller('PersonCtrl', function($scope, $stateParams, personService) {

    personService.get($stateParams.id, function(person) {
      $scope.person = person;
    })
});
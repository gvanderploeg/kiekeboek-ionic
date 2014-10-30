angular.module('kiekeboek.controllers', [])
.controller('SearchCtrl', function($scope, personService, $ionicLoading, logger) {

    $scope.search = {};

    $scope.searchFilter = function (person) {

      // No search results for small terms
      if (!$scope.search.term || $scope.search.term.length < 2) {
        return false;
      }
      var re = new RegExp($scope.search.term, 'i');
      return re.test(person.roepnaam + " " + person.achternaam_met_tussenvoegsel);
    };

    $ionicLoading.show({
      template: 'Gegevens ophalen... <i class="icon ion-loading-c"></i>',
      duration: 20000
    });

    personService.all(function(persons) {
      $scope.personList = persons;
      $ionicLoading.hide();
    });

});
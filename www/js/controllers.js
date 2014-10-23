angular.module('kiekeboek.controllers', [])

.controller('SearchCtrl', function($scope, personService, $ionicLoading) {

    $scope.search = {};

    $scope.searchFilter = function (person) {
      var re = new RegExp($scope.search.term, 'i');
      return re.test(person.roepnaam + " " + person.achternaam_met_tussenvoegsel);
    };

    //$ionicLoading.show({
    //  template: 'Gegevens ophalen... <i class="icon ion-loading-c"></i>'
    //});

    personService.all(function(persons) {
      $scope.personList = persons;
      //$ionicLoading.hide();
    });

})


.controller('PersonCtrl', function($scope, $stateParams, personService) {

    personService.get($stateParams.id, function(person) {
      $scope.person = person;
    })
})
.controller('AccountCtrl', function ($scope, $stateParams, accountService) {

    var account = accountService.get();
    $scope.username = account.username;
    $scope.password = account.password;

    $scope.save = function() {
      accountService.save(this.username, this.password);
    }
});
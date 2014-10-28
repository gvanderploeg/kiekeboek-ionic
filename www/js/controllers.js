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
    });

    personService.all(function(persons) {
      $scope.personList = persons;
      $ionicLoading.hide();
    });

})


.controller('PersonCtrl', function($scope, $stateParams, personService, $window, logger) {

    personService.get($stateParams.id, function(person) {
      $scope.person = person;

    });

    $scope.normalizePhoneNr = function (nr) {
      if (typeof nr === undefined || nr === '') {
        return undefined;
      }

      if (/^0[^0]/.test(nr)) {
        nr = nr.replace(/^0/, '+31');
      } else {
        nr = '+3123' + nr;
      }
      return nr;
    }

    $scope.call = function() {
      logger.log("Calling " + this.person.mobiel);
      $window.open('tel:' + $scope.normalizePhoneNr(this.person.mobiel), '_system');
      return false;
    };
    $scope.text = function() {
      logger.log("Texting " + this.person.mobiel);
      $window.open('sms:' + $scope.normalizePhoneNr(this.person.mobiel), '_system');
      return false;
    };
})
.controller('AccountCtrl', function ($scope, $stateParams, accountService, logger) {

    var account = accountService.get();
    $scope.username = account.username;
    $scope.password = account.password;

    $scope.loglines = logger.tail();

    $scope.save = function() {
      accountService.save(this.username, this.password);
    }
});
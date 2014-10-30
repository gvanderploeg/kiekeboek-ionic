angular.module('kiekeboek.controllers')
  .controller('PersonDetailCtrl', function ($scope, $stateParams, personService, $window, logger) {


    function _calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function setDateFields(person) {
      var birthDate = new Date(Date.parse(person.geboortedatum));

      person.geboortedatumFormatted = birthDate.toLocaleDateString('nl', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      person.age = _calculateAge(birthDate);

    }

    personService.get($stateParams.id, function (person) {

      $scope.person = person;

      setDateFields($scope.person);

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
    };

    $scope.email = function() {
      var emailAddress = this.person.emailadres;
      logger.log("Emailing " + emailAddress);
      var result = $window.open('mailto:' + emailAddress, '_system');
      logger.log("window.open: " + result);
      return false;
    }

    $scope.call = function () {
      var nr = $scope.normalizePhoneNr(this.person.mobiel);
      logger.log("Calling " + nr);
      var result = $window.open('tel:' + nr, '_system');
      logger.log("window.open: " + result);
      return false;
    };
    $scope.text = function () {
      var nr = $scope.normalizePhoneNr(this.person.mobiel);
      logger.log("Texting " + nr);
      $window.open('sms:' + nr, '_system');
      return false;
    };
  });
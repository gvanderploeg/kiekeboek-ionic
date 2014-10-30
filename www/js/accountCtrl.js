angular.module('kiekeboek.controllers')
  .controller('AccountCtrl', function ($scope, $stateParams, accountService, logger, fkDataService) {

    var account = accountService.get();
    var isDirty = false;

    $scope.username = account.username;
    $scope.password = account.password;

    $scope.loglines = logger.tail();


    $scope.save = function () {
      accountService.save(this.username, this.password);
      fkDataService.resetLogin();
    }
  });
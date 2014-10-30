// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('kiekeboek', ['ionic', 'kiekeboek.controllers', 'kiekeboek.services'])

.run(function($ionicPlatform, $rootScope, $state, $ionicPopup, accountService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    // Redirect to account page if no account set
    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        console.log('state change, toState: ');
        console.log(toState);
        if (toState.name !== 'tab.account' && !accountService.get().username) {
          $ionicPopup.alert({'title': 'Accountgegevens ontbreken', template: 'Stel uw accountgegevens in (waarmee u ook inlogt op het intranet van de Fonteinkerk)'}).then(function() {
            $state.go('tab.account');
          });
        }
      })
  })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('tab.person', {
      url: '/person/:id',
      views: {
        'tab-search': {
          templateUrl: 'templates/person-detail.html',
          controller: 'PersonDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});
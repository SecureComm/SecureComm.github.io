angular.module('app', ['ngAnimate', 'ui.router']).config(configure).factory('logger', logger).controller('ListCtrl', ListCtrl);

configure.$inject('$stateProvider', '$urlRouterProvider');

function configure($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html'
    })
    .state('home.list', {
      url: 'list',
      templateUrl: 'partials/list.html',
      controller: 'ListCtrl'
    });
}

function logger(){}

function ListCtrl(){
  /* jshint validthis: true */
  var vm = this;
  vm.posts = {};
}

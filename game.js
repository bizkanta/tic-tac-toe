'use strict';

angular.module('ticTacToe', [])
  .controller('GameCtrl', ['$scope', function($scope) {
    $scope.world = 'World!';
  }]);

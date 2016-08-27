'use strict';

angular.module('ticTacToe', [])
  .controller('GameCtrl', ['$scope', function($scope) {
    var player = 'x';
    var player2 = 'o';
    $scope.board = [
      [null, player2, player],
      [player2, null, player],
      [player, player2, player2]
    ];
  }]);

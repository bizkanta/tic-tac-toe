'use strict';

angular.module('ticTacToe', [])
  .controller('GameCtrl', ['$scope', function($scope) {
    var player1 = 'x';
    var player2 = 'o';
    $scope.currentPlayer = player1;
    $scope.gameOver = false;
    $scope.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    $scope.onSelectCell = function(rowIdx, colIdx) {
      if (!$scope.gameOver) {
        markCell(rowIdx, colIdx);
      }
    }

    function markCell(rowIdx, colIdx) {
      if ($scope.board[rowIdx][colIdx] === null) {
        $scope.board[rowIdx][colIdx] = $scope.currentPlayer;
        getWinner();
        switchPlayer();
      }
    }

    function switchPlayer() {
      $scope.currentPlayer = $scope.currentPlayer === player1 ? player2 : player1;
    }

    function getWinner() {
      if (hasWinner()) {
        $scope.winner = $scope.currentPlayer;
        $scope.gameOver = true;
      }
    }

    function hasWinner() {
      var p = $scope.currentPlayer;
      var board = $scope.board.reduce(function(prev, next){
        return prev.concat(next);
      }, []);
      for (var i = 0; i < board.length; i+=3) {
        if (board[i] === p && board[i+1] === p && board[i+2] === p) {
          return true;
        }
      }
      for (var i = 0; i < board.length; i++) {
        if (board[i] === p && board[i+3] === p && board[i+6] === p) {
          return true;
        }
      }
      var isDiagonal1 = board[0] === p && board[4] === p && board[8] === p;
      var isDiagonal2 = board[2] === p && board[4] === p && board[6] === p;
      if (isDiagonal1 || isDiagonal2) {
        return true;
      }
      return false;
    }
  }]);

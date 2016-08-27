'use strict';

angular.module('ticTacToe', [])
  .controller('GameCtrl', ['$scope', 'GameService', function($scope, gameService) {
    var player1 = 'x';
    var player2 = 'o';

    initGame();

    function initGame() {
      var savedGame = gameService.loadGame();
      if (savedGame) {
        $scope.board = savedGame.board;
        $scope.currentPlayer = savedGame.player;
        checkWinner();
      } else {
        $scope.board = gameService.getEmptyBoard();
        $scope.currentPlayer = player1;
      }
    }

    $scope.newGame = function() {
      $scope.board = gameService.getEmptyBoard();
      $scope.gameOver = false;
      $scope.tie = null;
      $scope.winner = null;
    }

    $scope.onSelectCell = function(rowIdx, colIdx) {
      if (!$scope.gameOver) {
        markCell(rowIdx, colIdx);
      }
    }

    function markCell(rowIdx, colIdx) {
      if ($scope.board[rowIdx][colIdx] === null) {
        $scope.board[rowIdx][colIdx] = $scope.currentPlayer;
        gameService.saveGame($scope.board, $scope.currentPlayer);
        checkWinner();
      }
    }

    function switchPlayer() {
      $scope.currentPlayer = $scope.currentPlayer === player1 ? player2 : player1;
    }

    function checkWinner() {
      var board = $scope.board.reduce(function(prev, next){
        return prev.concat(next);
      }, []);
      if (hasWinner(board)) {
        $scope.winner = $scope.currentPlayer;
        $scope.gameOver = true;
      } else if (isAllMarked(board)) {
        $scope.tie = true;
        $scope.gameOver = true;
      } else {
        switchPlayer();
      }
    }

    function hasWinner(board) {
      var COLUMNS = 3;
      var p = $scope.currentPlayer;
      for (var i = 0; i < board.length; i+=COLUMNS) {
        if (board[i] === p && board[i+1] === p && board[i+2] === p) {
          return true;
        }
      }
      for (var i = 0; i < COLUMNS; i++) {
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

    function isAllMarked(board) {
      return board.every(function(cell) {
        return cell !== null;
      });
    }
  }]);

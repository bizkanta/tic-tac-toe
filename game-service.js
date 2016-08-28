'use strict';

angular.module('ticTacToe')
  .service('GameService', [function() {

    this.getEmptyBoard = function() {
      return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    };

    this.saveGame = function(board, currentPlayer) {
      var gameState = {
        player: currentPlayer,
        board: board
      };
      localStorage.setItem('ticTacGame', JSON.stringify(gameState));
    };

    this.loadGame = function() {
      return JSON.parse(localStorage.getItem('ticTacGame'));
    };

    this.clearGame = function() {
      return localStorage.clear();
    };
  }]);

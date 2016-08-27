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

    this.saveGame = function(board) {
      localStorage.setItem('ticTacGame', JSON.stringify(board));
    };

    this.loadGame = function() {
      var saved = JSON.parse(localStorage.getItem('ticTacGame'));
      return saved || this.getEmptyBoard();
    };
  }]);

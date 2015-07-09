function Game(p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = new Board(7, 6);
    this.distributeTokens();
    this.currentPlayer = this.player1;
    this.currentColIndex = this.board.currentColIndex;

}


Game.prototype.switchPlayer = function() {
    this.currentPlayer = (this.currentPlayer == this.player1) ? this.player2 : this.player1;
};
Game.prototype.distributeTokens = function() {
    var tokenCount = 7 * 6;
    var splitCount = Math.ceil(tokenCount / 2);
    for (var i = 0; i < splitCount; i++) {
        var p1Token = new Token(this.player1, "#ff0000");
        var p2Token = new Token(this.player2, "#000000");
        this.player1.addToken(p1Token);
        this.player2.addToken(p2Token);
    };
};

Game.prototype.selectColumn = function(colIndex) {
    this.currentColIndex = colIndex;
    return this.board.columns[colIndex];

};

Game.prototype.playToken = function() {
    var currToken = this.getToken();
    var success = this.board.placeToken(currToken, this.currentColIndex);

    if (success == true) {
        if (this.currentPlayer.checkWin() == true) {
            var winArray = this.currentPlayer.getWinningComponents();
            alert(this.currentPlayer.name + "  HAS WON THE CURRENT GAME VIA THESE COMPONENTS" + winArray.toString());
        } else {
            this.switchPlayer();
        };
    };
    // else {};

};

Game.prototype.getToken = function() {
    var tmpToken = this.currentPlayer.getNextToken();

    return tmpToken;
};
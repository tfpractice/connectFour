function Player(name) {
    this.name = name;
    this.tokens = [];
    this.components = [];
    this.wins = 0;
}

Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};

Player.prototype.placeToken = function(board, token, colIndex) {
    try {
       
            board.placeToken(token, colIndex);
        

    } catch (err) {
        alert
    }
};
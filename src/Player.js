function Player(name) {
    this.name = name;
    this.tokens = [];
    this.components = [];
    this.wins = 0;
}

Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};

Player.prototype.getComponent = function(n1, n2, relCode) {
    console.log(n1);
    console.log(n2);
    var tmpComp =  new Component(n1, n2, relCode);
    console.log(tmpComp);
    this.components.push(tmpComp);
    console.log(this.components);
    return tmpComp;
};

Player.prototype.placeToken = function(board, token, colIndex) {
    try {
       
            board.placeToken(token, colIndex);
        

    } catch (err) {
        alert
    }
};
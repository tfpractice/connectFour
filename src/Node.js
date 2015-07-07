function Node(colID, rowID) {
    this.column = colID;
    this.row = rowID;
    this.occupied = false;
    this.player = null;
    this.neighbors = {};
    this.token = null;
    this.color = "none";
}
Node.prototype.placeToken = function(token) {
    this.occupied = true;
    this.player = token.player;
    this.token = token;
    this.changeColor(token);
};
Node.prototype.setNeighbor = function(relationCode, nNode) {
    this.neighbors[relationCode] = nNode;
};
Node.prototype.changeColor = function(token) {
    this.color = token.color;
};
Node.prototype.checkMatchingNeighbors = function() {
    var result;
    if (this.occupied == true) {
        result = Object.keys(this.neighbors).some(function(key, id, arr) {
            return this.neighbors[key].player == this.player;
        }, this);
    } else if (this.occupied == false) {
        result = false;
    };
    return result;
};
Node.prototype.getMatchingNeighbors = function() {
    var matchingNeighbors = [];
    if (this.occupied == false) {
        // matchingNeighbors = [];
    } else if (this.occupied == true) {
        var matchingKeys = Object.keys(this.neighbors).filter(function(key, id, arr) {
            return this.neighbors[key].player == this.player;
        }, this);
        matchingKeys.forEach(function(key, id, arr) {
            matchingNeighbors.push(this.neighbors[key]);
        }, this);
    };
    return matchingNeighbors;
};
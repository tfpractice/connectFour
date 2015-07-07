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
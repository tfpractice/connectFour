function Node (colID, rowID) {
	this.column = colID;this.row = rowID;
	this.occupied = false;
	this.player = null;
	this.neighbors = {};
	this.token= null;
}


Node.prototype.placeToken = function(token) {
	this.occupied = true;
	this.player = token.player;
	this.token = token;
	console.log(this.player);

};

Node.prototype.setNeighbor = function(relationCode, nNode) {
	this.neighbors[relationCode]= nNode;
};

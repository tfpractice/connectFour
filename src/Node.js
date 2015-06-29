function Node (colID, rowID) {
	this.column = colID;this.row = rowID;
	this.occupied = false;
	this.player = null;
	this.neighbors = {};
	this.token= null;
}


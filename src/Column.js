function Column(index, nodeCount) {
    this.index = index;
    this.nodeCount = nodeCount;
    this.nodes = [];
    this.initializeNodes();
    this.freeIndex = this.nodeCount - 1;

}


Column.prototype.addNode = function(node) {
    this.nodes.push(node);

};

Column.prototype.initializeNodes = function() {
    for (var i = 0; i < this.nodeCount; i++) {
        this.nodes[i] = new Node(this.index, i);
    };
};

Column.prototype.isAvailable = function() {

    if ((this.freeIndex > 0) && (this.nodes[this.freeIndex].occupied == false)) {
        return true;
    };
};

Column.prototype.setVerticalNeighbors = function() {
	for (var i = 0; i < this.nodes.length - 1; i++) {
		var currNode = this.nodes[i];
		var nextNode = this.nodes[i+1];
		currNode.setNeighbor("cb", nextNode);
		nextNode.setNeighbor("ct", currNode); 
   	};
};


Column.prototype.decrementIndex = function() {
	this.freeIndex--;
};

Column.prototype.placeToken = function(token) {
	this.nodes[this.freeIndex].placeToken(token);
	this.decrementIndex();
};
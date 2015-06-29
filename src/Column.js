function Column(index, nodeCount) {
	this.index = index;
	this.nodeCount = nodeCount;
	this.nodes = [];
	this.freeIndex = this.nodeCount -1;

}


Column.prototype.addNode = function(node) {
	this.nodes.push(node);
	
};


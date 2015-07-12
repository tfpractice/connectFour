function Column(index, nodeCount) {
    this.index = index;
    this.nodeCount = nodeCount;
    this.nodes = [];
    this.initializeNodes();
    this.setVerticalNeighbors();
    this.freeIndex = this.nodeCount - 1;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g')).node();
    var colObj = this;
    // console.log(colObj);
    d3.select(this.domElement).on('click', function(d) {
        d3.select(this);
        console.log("A D3 EVENT WAS TRIGGERED FROM WITHIN");
        console.log(d.domElement);

        /* Act on the event */
    });
    $(this.domElement).trigger('click');
    // console.log(this.domElement);

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


    if (this.freeIndex < 0) {
        return false
    } else if ((this.nodes[this.freeIndex].occupied == true)) {
        return false;
    } else if (this.nodes[this.freeIndex].occupied == false) {
        return true;
    };
};

Column.prototype.setVerticalNeighbors = function() {
    for (var i = 0; i < this.nodes.length - 1; i++) {
        var currNode = this.nodes[i];
        var nextNode = this.nodes[i + 1];
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
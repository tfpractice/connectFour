C4.Column = function(index, nodeCount) {
    this.index = index;
    this.nodeCount = nodeCount;
    this.nodes = [];
    this.initializeNodes();
    this.setVerticalNeighbors();
    this.freeIndex = this.nodeCount - 1;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g')).node();
    var colObj = this;
    // console.log(colObj);
    this.colClick = new CustomEvent("colClick", {
        'detail': this
    });
    d3.select(this.domElement).on('click', function(d) {
        d3.select(this);
        this.dispatchEvent(d.colClick);
        var evt = d3.event;
        // this.dispatchEvent(evt.detail.insertToken)

        console.log("A D3 EVENT WAS TRIGGERED FROM WITHIN");
        console.log(d.domElement);

        /* Act on the event */
    });
    this.domElement.addEventListener('colClick', function(e) {
        // var tokenColor = e.detail.color;
        console.log(e.detail);
    });


};


C4.Column.prototype.addNode = function(node) {
    this.nodes.push(node);

};

C4.Column.prototype.initializeNodes = function() {
    for (var i = 0; i < this.nodeCount; i++) {
        this.nodes[i] = new C4.Node(this.index, i);
    };
};

C4.Column.prototype.isAvailable = function() {


    if (this.freeIndex < 0) {
        return false
    } else if ((this.nodes[this.freeIndex].occupied == true)) {
        return false;
    } else if (this.nodes[this.freeIndex].occupied == false) {
        return true;
    };
};

C4.Column.prototype.setVerticalNeighbors = function() {
    for (var i = 0; i < this.nodes.length - 1; i++) {
        var currNode = this.nodes[i];
        var nextNode = this.nodes[i + 1];
        currNode.setNeighbor("cb", nextNode);
        nextNode.setNeighbor("ct", currNode);
    };
};


C4.Column.prototype.decrementIndex = function() {
    this.freeIndex--;
};

C4.Column.prototype.placeToken = function(token) {
    this.nodes[this.freeIndex].placeToken(token);
    this.decrementIndex();
};
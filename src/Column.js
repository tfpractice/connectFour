/**
 * represents a column on the connect four board
 * @constructor C4.Column
 * @param {Number} index    the position of the column in the board
 * @param {Number} nodeCount the number of nodes to create for this column
 * @property {Number} index    the position of the column in the board
 * @property {Number} nodeCount the number of nodes to create for this column
 * @property {C4.Node[]} nodes the nodes in this column
 * @property {Number} freeIndex the topMost unoccupied row position
 */
C4.Column = function(index, nodeCount) {
    this.index = index;
    this.nodeCount = nodeCount;
    this.nodes = [];
    this.initializeNodes();
    this.setVerticalNeighbors();
    this.freeIndex = this.nodeCount - 1;
    /**
     * DOM element representing the column
     * @type {d3.svg}
     */
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g')).node();
    var colObj = this;
    /**
     * an Event triggered when the domElement is clicked
     * @type {CustomEvent}
     */
    this.colClick = new CustomEvent("colClick", {
        'detail': this
    });
    d3.select(this.domElement).on('click', function(d) {
        d3.select(this);
        this.dispatchEvent(d.colClick);
        var evt = d3.event;
    });
    this.domElement.addEventListener('colClick', function(e) {});
};
/**
 * adds a node to the nodes array
 * @param {C4.Node} node new node
 */
C4.Column.prototype.addNode = function(node) {
    this.nodes.push(node);
};
/**
 * initializes nodes based on [nodeCount]{@link C4.Column#nodeCount}
 */
C4.Column.prototype.initializeNodes = function() {
    for (var i = 0; i < this.nodeCount; i++) {
        this.nodes[i] = new C4.Node(this.index, i);
    };
};
/**
 * checks if any of the nodes are unoccupied
 * @return {Boolean} availability
 */
C4.Column.prototype.isAvailable = function() {
    if (this.freeIndex < 0) {
        return false
    } else if ((this.nodes[this.freeIndex].occupied == true)) {
        return false;
    } else if (this.nodes[this.freeIndex].occupied == false) {
        return true;
    };
};
/**
 * assigns center-top(CT) and center-bottom relationships for each node
 */
C4.Column.prototype.setVerticalNeighbors = function() {
    for (var i = 0; i < this.nodes.length - 1; i++) {
        var currNode = this.nodes[i];
        var nextNode = this.nodes[i + 1];
        currNode.setNeighbor("cb", nextNode);
        nextNode.setNeighbor("ct", currNode);
    };
};
/**
 * decreases the index of the available node by 1
 */
C4.Column.prototype.decrementIndex = function() {
    this.freeIndex--;
};
/**
 * places a token in the topmost available node
 * @param  {C4.Token} token
 */
C4.Column.prototype.placeToken = function(token) {
    this.nodes[this.freeIndex].placeToken(token);
    this.decrementIndex();
};
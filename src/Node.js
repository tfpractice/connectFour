/**
 * represents a node on the Connect four board
 * @constructor C4.Node
 * @param {Number} colID the column ID
 * @param {Number} rowID the row ID
 * @property {Number} column the nodes column
 * @property {Number} row the node's row
 * @property {Boolean} occupied presence of a token at node location
 * @property {Color} color color of node
 */
C4.Node = function(colID, rowID) {
    this.column = colID;
    this.row = rowID;
    this.occupied = false;
    /**
     * the player who claimed this node
     * @type {C4.Player}
     */
    this.player = null;
    /**
     * adjacent nodes
     * @type {C4.Node}
     */
    this.neighbors = {};
    /**
     * token occupying the node
     * @type {C4.Token}
     */
    this.token = null;
    this.color = "#ffffff";
    /**
     * an event that changes the node's color
     * @type {CustomEvent}
     */
    this.colorNode = new CustomEvent('colorNode', {
        'detail': this
    });
    /**
     * a hover event that selects the node
     * @type {CustomEvent}
     */
    this.clickEvent = new CustomEvent('hover', {
        'detail': this
    });
    /**
     * the DOM element corresponding to this node
     * @type {d3.svg}
     */
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
        .attr('stroke', '#000000').style("border", "1px solid black")
        .append('circle')
        .node();
    this.domElement.addEventListener('colorNode', function(e) {
        var tokenColor = e.detail.color;
        d3.select(this).attr({
            fill: tokenColor,
            stroke: tokenColor

        });
    });
    this.domElement.addEventListener('hover', function(e) {
        d3.select(this);
    });
};
/**
 * occupies node with specified token
 * @param  {C4.Token} token
 */
C4.Node.prototype.placeToken = function(token) {
    this.setToken(token);
    this.changeColor(token);
    if (this.checkMatchingNeighbors() == true) {
        this.makeMatchingComponents();
    };
};
/**
 * assigns a neighbor nodes with a Relation code
 * @param {String} relationCode the neighbors relative position to this node
 * @param {C4.Node} nNode the neighboring node
 */
C4.Node.prototype.setNeighbor = function(relationCode, nNode) {
    this.neighbors[relationCode] = nNode;
};
/**
 * sets the node color to match the given token
 * @param  {C4.Token} token
 */
C4.Node.prototype.changeColor = function(token) {
    this.color = token.color;
    this.domElement.dispatchEvent(this.colorNode);
};
/**
 * checks all neighboring nodes for matching ownership
 * @return {Boolean} matching neighbor status
 */
C4.Node.prototype.checkMatchingNeighbors = function() {
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
/**
 * @return {C4.Node[]} matching neighbor nodes
 */
C4.Node.prototype.getMatchingNeighbors = function() {
    var matchingNeighbors = [];
    if (this.occupied == false) {} else if (this.occupied == true) {
        var matchingKeys = Object.keys(this.neighbors).filter(function(key, id, arr) {
            return this.neighbors[key].player == this.player;
        }, this);
        matchingKeys.forEach(function(key, id, arr) {
            matchingNeighbors.push(this.neighbors[key]);
        }, this);
    };
    return matchingNeighbors;
};
/**
 * creates a new component neighboring node if they share ownership
 * @param  {C4.Node} nNode        the neighboring node
 * @param  {String} relationCode the neighboring nodes relative position
 * @return {C4.Component} the current component
 */
C4.Node.prototype.getComponent = function(nNode, relationCode) {
    try {
        if (this.checkMatch(nNode) == false) {
            throw new Error("nodes do not belong to same player");
        } else if (this.confirmNeighborStatus(nNode, relationCode) == false) {
            throw new Error("these nodes are not neighbors");
        } else if ((this.checkMatch(nNode) == true) && (this.confirmNeighborStatus(nNode, relationCode) == true)) {
            var tmpComp = new C4.Component(this, nNode, relationCode);
            return tmpComp;
        }
    } catch (err) {
        alert(err.message);
    }
};
/**
 * boolean check for neighboring node at realtion
 * @param  {C4.Node} nNode        the neighboring node
 * @param  {String} relationCode the neighboring nodes relative position
 * @return {Boolean} neighboring status
 */
C4.Node.prototype.confirmNeighborStatus = function(nNode, relationCode) {
    return this.neighbors[relationCode] == nNode;
};
/**
 * check for node player match
 * @param  {C4.Node} nNode the neighboring node
 * @return {Boolean} ownership match
 */
C4.Node.prototype.checkMatch = function(nNode) {
    if (this.occupied == false) {
        return false;
    } else if (this.occupied == true) {
        return nNode.player == this.player;
    };
};
/**
 * adds a the specified component to the node owner's list of components
 * @param  {C4.component} newComp the newly created component
 */
C4.Node.prototype.createPlayerComponent = function(newComp) {
    this.player.addComponent(newComp);
};
/**
 * creates a new component for each neighbor with matching ownership
 * and adds it to the node owner's list
 */
C4.Node.prototype.makeMatchingComponents = function() {
    var matchingKeys = Object.keys(this.neighbors).filter(function(key, id, arr) {
        return this.checkMatch(this.neighbors[key]) == true;
    }, this);
    matchingKeys.forEach(function(key, id, arr) {
        var tmpComponent = this.getComponent(this.neighbors[key], key);
        this.createPlayerComponent(tmpComponent);
    }, this);
};
/**
 * sets the token value
 * @param {C4.Token} token
 */
C4.Node.prototype.setToken = function(token) {
    this.token = token;
    this.occupied = true;
    this.player = token.player;
};
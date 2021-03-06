/**
 * A set of connected nodes sharing a player
 * @constructor C4.Component
 * @param {C4.Node} n1           the first node
 * @param {C4.Node} n2           the second node
 * @param {String} relationCode their relative positions
 * @property {C4.Node[]} nodes
 * @property {C4.Player} player
 * @property {Number} arity the number of nodes in the component
 * @property {String} direction component's general direction ('horizontal','vertical','posDiagonal','negDiagonal')
 */
C4.Component = function(n1, n2, relationCode) {
    this.nodes = [n1, n2];
    this.player = n1.player;
    this.arity = 2;
    this.verifyMemberPlayers();
    /**
     * @enum {Number}
     */
    this.direction;
    this.determineDirection(relationCode);
};
/**
 * checks if all nodes share the same player
 * @return {Boolean}
 */
C4.Component.prototype.verifyMemberPlayers = function() {
    return this.nodes.every(function(node, id, arr) {
        return node.player == this.player;
    }, this);
};
/**
 * based on the relation codes of the nodes, sets the direction
 * @param  {String} relationCode
 */
C4.Component.prototype.determineDirection = function(relationCode) {
    switch (relationCode) {
        case "ct":
        case "cb":
            this.direction = "vertical";
            break;
        case "rc":
        case "lc":
            this.direction = "horizontal";
            break;
        case "rb":
        case "lt":
            this.direction = "negDiagonal";
            break;
        case "lb":
        case "rt":
            this.direction = "posDiagonal";
            break;
    }
};
/**
 * checks for the presence of a node in the current components node array
 * @param  {C4.Node} node node to check for
 * @return {Boolean}
 */
C4.Component.prototype.contains = function(node) {
    return this.nodes.indexOf(node) > -1;
};
/**
 * returns nodes shared between this component and another
 * @param  {C4.Component} newComp the component to compare
 * @return {C4.Node[]}         shared nodes
 */
C4.Component.prototype.intersection = function(newComp) {
    var sharedNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == true) {
            sharedNodes.push(nNode);
        };
    }, this);
    return sharedNodes;
};
/**
 * checks if the two components share any nodes
 * @param  {C4.Component} newComp the component to check against
 * @return {Boolean}
 */
C4.Component.prototype.intersects = function(newComp) {
    return this.intersection(newComp).length > 0;
};
/**
 * checks if another component shares this components player attribute
 * @param  {C4.Component} newComp the component to be checked
 * @return {Boolean}
 */
C4.Component.prototype.playerCheck = function(newComp) {
    return newComp.player == this.player;
};
/**
 * /
 * @param  {C4.Node} newComp the component to be compared
 * @return {C4.Node[]} nodes not shared between the two components
 */
C4.Component.prototype.difference = function(newComp) {
    var distincNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == false) {
            distincNodes.push(nNode)
        };
    }, this);
    return distincNodes;
};
/**
 * @param  {C4.Component}  newComp the component to be compared
 * @return {Boolean} if there are any unshared nodes
 */
C4.Component.prototype.hasDistinctNodes = function(newComp) {
    return this.difference(newComp).length > 0;
};
/**
 * @param  {C4.Node} newComp the component to be compared
 * @return {C4.Node[]} all nodes in each component
 */
C4.Component.prototype.union = function(newComp) {
    var allNodes = [];
    this.nodes.forEach(function(oNode, id, arr) {
        allNodes.push(oNode);
    }, this);
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == false) {
            allNodes.push(nNode);
        };
    }, this);
    return allNodes;
};
/**
 * adds a node if it is not already accounted for in the nodes array
 * @param {C4.Node} newNode
 */
C4.Component.prototype.addNode = function(newNode) {
    if (this.contains(newNode) == false) {
        this.nodes.push(newNode);
        this.arity = this.nodes.length;
    };
};
/**
 * combines the nodes of both components into a single component
 * @param  {C4.Component} newComp the component to be added
 * @return {C4.Node} the updated component
 */
C4.Component.prototype.unionize = function(newComp) {
    try {
        if (this.checkDirection(newComp) == false) {
            throw new Error("components have different orientations");
        } else if (this.playerCheck(newComp) == false) {
            throw new Error("components belong different players");
        } else if (this.intersects(newComp) == false) {
            throw new Error("these components do no intersect");
        };
        var diffNodes = this.difference(newComp);
        diffNodes.forEach(function(dNode, id, arr) {
            this.addNode(dNode);
        }, this);
        return this;
    } catch (err) {
        alert(err.message);
    }
};
/**
 * compares the direction of this component with another
 * @param  {C4.Component} newComp the component to be compared
 * @return {Boolean}         if directions match
 */
C4.Component.prototype.checkDirection = function(newComp) {
    return newComp.direction == this.direction;
};
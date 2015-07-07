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
Node.prototype.checkMatchingNeighbors = function() {
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
Node.prototype.getMatchingNeighbors = function() {
    var matchingNeighbors = [];
    if (this.occupied == false) {
        // matchingNeighbors = [];
    } else if (this.occupied == true) {
        var matchingKeys = Object.keys(this.neighbors).filter(function(key, id, arr) {
            return this.neighbors[key].player == this.player;
        }, this);
        matchingKeys.forEach(function(key, id, arr) {
            matchingNeighbors.push(this.neighbors[key]);
        }, this);
    };
    return matchingNeighbors;
};

Node.prototype.getComponent = function(nNode, relationCode) {

    try {
        if (this.checkMatch(nNode) == false) {
            throw new Error("nodes do not belong to same player");
        } else if (this.confirmNeighborStatus(nNode, relationCode) == false) {
            throw new Error("these nodes are not neighbors");
        } else if ((this.checkMatch(nNode) == true) && (this.confirmNeighborStatus(nNode, relationCode) == true)) {
            return new Component(this, nNode, relationCode);
        }

    } catch (err) {
        alert(err.message);
    }


};

Node.prototype.confirmNeighborStatus = function(nNode, relationCode) {
    return this.neighbors[relationCode] == nNode;
};
Node.prototype.checkMatch = function(nNode) {

    if (this.occupied == false) {
        return false;
    } else if (this.occupied == true) {
        return nNode.player == this.player;
    };
};
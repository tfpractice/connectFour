C4.Node = function(colID, rowID) {
    this.column = colID;
    this.row = rowID;
    this.occupied = false;
    this.player = null;
    this.neighbors = {};
    this.token = null;
    this.color = "#ffffff";
    this.colorNode = new CustomEvent('colorNode', {
        'detail': this
    });
    this.clickEvent = new CustomEvent('hover', {
        'detail': this
    });
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
C4.Node.prototype.placeToken = function(token) {
    this.setToken(token);
    this.changeColor(token);
    if (this.checkMatchingNeighbors() == true) {
        this.makeMatchingComponents();
    };
};
C4.Node.prototype.setNeighbor = function(relationCode, nNode) {
    this.neighbors[relationCode] = nNode;
};
C4.Node.prototype.changeColor = function(token) {
    this.color = token.color;
    this.domElement.dispatchEvent(this.colorNode);
};
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
C4.Node.prototype.confirmNeighborStatus = function(nNode, relationCode) {
    return this.neighbors[relationCode] == nNode;
};
C4.Node.prototype.checkMatch = function(nNode) {
    if (this.occupied == false) {
        return false;
    } else if (this.occupied == true) {
        return nNode.player == this.player;
    };
};
C4.Node.prototype.createPlayerComponent = function(newComp) {
    this.player.addComponent(newComp);
};
C4.Node.prototype.makeMatchingComponents = function() {
    var matchingKeys = Object.keys(this.neighbors).filter(function(key, id, arr) {
        return this.checkMatch(this.neighbors[key]) == true;
    }, this);
    matchingKeys.forEach(function(key, id, arr) {
        var tmpComponent = this.getComponent(this.neighbors[key], key);
        this.createPlayerComponent(tmpComponent);
    }, this);
};
C4.Node.prototype.setToken = function(token) {
    this.token = token;
    this.occupied = true;
    this.player = token.player;
};
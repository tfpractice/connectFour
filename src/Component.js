C4.Component = function(n1, n2, relationCode) {
    this.nodes = [n1, n2];
    this.player = n1.player;
    this.arity = 2;
    this.verifyMemberPlayers();
    this.direction;
    this.determineDirection(relationCode);
};
C4.Component.prototype.verifyMemberPlayers = function() {
    return this.nodes.every(function(node, id, arr) {
        return node.player == this.player;
    }, this);
};
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
C4.Component.prototype.contains = function(node) {
    return this.nodes.indexOf(node) > -1;
};
C4.Component.prototype.intersection = function(newComp) {
    var sharedNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == true) {
            sharedNodes.push(nNode);
        };
    }, this);
    return sharedNodes;
};
C4.Component.prototype.intersects = function(newComp) {
    return this.intersection(newComp).length > 0;
};
C4.Component.prototype.playerCheck = function(newComp) {
    return newComp.player == this.player;
};
C4.Component.prototype.difference = function(newComp) {
    var distincNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == false) {
            distincNodes.push(nNode)
        };
    }, this);
    return distincNodes;
};
C4.Component.prototype.hasDistinctNodes = function(newComp) {
    return this.difference(newComp).length > 0;
};
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
C4.Component.prototype.addNode = function(newNode) {
    if (this.contains(newNode) == false) {
        this.nodes.push(newNode);
        this.arity = this.nodes.length;
    };
};
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
C4.Component.prototype.checkDirection = function(newComp) {
    return newComp.direction == this.direction;
};
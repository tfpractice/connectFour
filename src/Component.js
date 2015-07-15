function Component(n1, n2, relationCode) {
    this.nodes = [n1, n2];
    this.player = n1.player;
    this.arity = 2;
    this.verifyMemberPlayers();
    this.direction;
    this.determineDirection(relationCode);
}
Component.prototype.verifyMemberPlayers = function() {
    return this.nodes.every(function(node, id, arr) {
        return node.player == this.player;
    }, this);
};
Component.prototype.determineDirection = function(relationCode) {
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
Component.prototype.contains = function(node) {
    return this.nodes.indexOf(node) > -1;
};
Component.prototype.intersection = function(newComp) {
    var sharedNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == true) {
            sharedNodes.push(nNode);
        };
    }, this);
    return sharedNodes;
};
Component.prototype.intersects = function(newComp) {
    return this.intersection(newComp).length > 0;
};
Component.prototype.playerCheck = function(newComp) {
    return newComp.player == this.player;
};
Component.prototype.difference = function(newComp) {
    var distincNodes = [];
    newComp.nodes.forEach(function(nNode, id, arr) {
        if (this.contains(nNode) == false) {
            distincNodes.push(nNode)
        };
    }, this);
    return distincNodes;
};
Component.prototype.hasDistinctNodes = function(newComp) {
    return this.difference(newComp).length > 0;
};
Component.prototype.union = function(newComp) {
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
Component.prototype.addNode = function(newNode) {
    if (this.contains(newNode) == false) {
        this.nodes.push(newNode);
        this.arity = this.nodes.length;
    };
};
Component.prototype.unionize = function(newComp) {
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
Component.prototype.checkDirection = function(newComp) {
    return newComp.direction == this.direction;
};
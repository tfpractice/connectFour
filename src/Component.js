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
function Player(name) {
    this.name = name;
    this.tokens = [];
    this.components = [];
    this.wins = 0;
}
Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};
Player.prototype.getComponent = function(n1, n2, relCode) {
    console.log(n1);
    console.log(n2);
    var tmpComp = new Component(n1, n2, relCode);

    return tmpComp;
};
Player.prototype.placeToken = function(board, token, colIndex) {
    try {

        board.placeToken(token, colIndex);

    } catch (err) {
        alert
    }
};
Player.prototype.hasDirectedComponents = function(newComp) {
    var result;
    console.log(newComp.direction);
    if (this.hasComponents() == false) {
        result = false
    } else {
        result = this.components.some(function(dComp, id, arr) {
            console.log(dComp.direction);
            return dComp.direction == newComp.direction;
        }, this);
    };

    return result;
};

Player.prototype.addComponent = function(newComp) {
    if (this.evaluateUniqueness(newComp) == true) {
        this.components.push(newComp);
    } else if (this.evaluateUniqueness(newComp) == false) {
        var iComps = this.getIntersectingComponents(newComp);
        iComps.forEach(function(iComp, id, arr) {
            var oIComp = this.getOriginalArrayComponent(iComp);
            this.unionizeComponents(oIComp, newComp);
        }, this);

    };

};

Player.prototype.getDirectedComponents = function(newComp) {
    if (this.hasDirectedComponents(newComp) == true) {
        return this.components.filter(function(dComp) {
            return dComp.direction == newComp.direction;
        });
    };
};

Player.prototype.hasIntersectingComponents = function(newComp) {
    var result;
    if (this.hasDirectedComponents(newComp) == false) {
        result = false;
    } else if (this.hasDirectedComponents(newComp) == true) {
        var matchingComponents = this.getDirectedComponents(newComp);
        result = matchingComponents.some(function(dComp, id, arr) {
            return dComp.intersects(newComp) == true;

        }, this);
    };

    return result;
};

Player.prototype.getIntersectingComponents = function(newComp) {
    var result;
    if (this.hasDirectedComponents(newComp) == true) {
        var matchingComponents = this.getDirectedComponents(newComp);
        var result = matchingComponents.filter(function(dComp, id, arr) {
            return dComp.intersects(newComp);
        }, this);
    } else {
        result = [];
    };
    return result;

};

Player.prototype.getOriginalArrayComponent = function(newComp) {
    var oIndex = this.components.indexOf(newComp);
    if (oIndex > -1) {
        return this.components[oIndex];
    };
};

Player.prototype.unionizeComponents = function(oComp, newComp) {
    oComp.unionize(newComp);
};

Player.prototype.evaluateUniqueness = function(newComp) {
    var result;
    if (this.hasComponents() == false) {
        result = true;
    } else if (this.hasDirectedComponents(newComp) == false) {
        result = true;
    } else if (this.hasIntersectingComponents(newComp) == false) {
        result = true;
    } else if (this.hasIntersectingComponents(newComp) == true) {
        result = false;
    };
    return result;
};
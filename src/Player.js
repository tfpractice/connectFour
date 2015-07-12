function Player(name) {
    this.name = name;
    this.tokens = [];
    this.tokenIndex = null;
    this.components = [];
    this.wins = 0;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg')).node();
}
Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};
Player.prototype.getComponent = function(n1, n2, relCode) {

    var tmpComp = new Component(n1, n2, relCode);
    return tmpComp;
};
Player.prototype.placeToken = function(board, token, colIndex) {
    try {
        board.placeToken(token, colIndex);
    } catch (err) {
        alert(err.message);
    }
};
Player.prototype.hasDirectedComponents = function(newComp) {
    var result;
    if (this.hasComponents() == false) {
        result = false
    } else {
        result = this.components.some(function(dComp, id, arr) {
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

    this.aritySort();
    // this.getWinningComponents();
    // var winning = this.checkWin();
    // if (winning == true) {
    // //console.log(this.name + " Has won the current game");
    // };

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
Player.prototype.getNextToken = function() {
    if (this.tokens.length > 0) {
        var currToken = this.tokens[this.tokenIndex];
        this.tokenIndex--;
        return currToken;
    };
};
Player.prototype.addToken = function(token) {
    this.tokens.push(token);
    this.tokenIndex = this.tokens.length - 1;
};

Player.prototype.aritySort = function() {
    var iVal, tmpComp, compCount = this.components.length;
    for (var oVal = 0; oVal < compCount; oVal++) {
        tmpComp = this.components[oVal];
        iVal = oVal;
        while ((iVal > 0) && (this.components[iVal - 1].arity >= tmpComp.arity)) {
            this.components[iVal] = this.components[iVal - 1];
            --iVal;
        }
        this.components[iVal] = tmpComp;

    };
    this.components.reverse();
    //console.log(this.components);
};

Player.prototype.checkWin = function() {
    var result = this.components.some(function(comp, index, arr) {
        return comp.arity > 3;
    }, this);
    return result;

};
Player.prototype.getWinningComponents = function() {
    if (this.checkWin() == true) {
        return this.components.filter(function(comp, id, arr) {
            return comp.arity > 3;
        }, this);
    };
};
C4.Player = function(name) {
    this.name = name;
    this.tokens = [];
    this.tokenIndex = null;
    this.components = [];
    this.wins = 0;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg')).node();
    this.domElement.addEventListener('changeOpacity', function(e) {});
};
C4.Player.prototype.startNewGame = function() {
    this.clearTokens();
    this.clearComponents();
};
C4.Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};
C4.Player.prototype.getComponent = function(n1, n2, relCode) {
    var tmpComp = new Component(n1, n2, relCode);
    return tmpComp;
};
C4.Player.prototype.placeToken = function(board, token, colIndex) {
    try {
        board.placeToken(token, colIndex);
    } catch (err) {
        alert(err.message);
    }
};
C4.Player.prototype.hasDirectedComponents = function(newComp) {
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
C4.Player.prototype.incrementScore = function(first_argument) {
    this.wins++;
};
C4.Player.prototype.addComponent = function(newComp) {
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
};
C4.Player.prototype.getDirectedComponents = function(newComp) {
    if (this.hasDirectedComponents(newComp) == true) {
        return this.components.filter(function(dComp) {
            return dComp.direction == newComp.direction;
        });
    };
};
C4.Player.prototype.hasIntersectingComponents = function(newComp) {
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
C4.Player.prototype.getIntersectingComponents = function(newComp) {
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
C4.Player.prototype.getOriginalArrayComponent = function(newComp) {
    var oIndex = this.components.indexOf(newComp);
    if (oIndex > -1) {
        return this.components[oIndex];
    };
};
C4.Player.prototype.unionizeComponents = function(oComp, newComp) {
    oComp.unionize(newComp);
};
C4.Player.prototype.evaluateUniqueness = function(newComp) {
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
C4.Player.prototype.getNextToken = function() {
    if (this.tokens.length > 0) {
        var currToken = this.tokens[this.tokenIndex];
        this.tokenIndex--;
        return currToken;
    };
};
C4.Player.prototype.addToken = function(token) {
    this.tokens.push(token);
    this.tokenIndex = this.tokens.length - 1;
};
C4.Player.prototype.aritySort = function() {
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
};
C4.Player.prototype.checkWin = function() {
    var result = this.components.some(function(comp, index, arr) {
        return comp.arity > 3;
    }, this);
    return result;
};
C4.Player.prototype.clearTokens = function() {
    this.tokens = [];
    this.tokenIndex = null;
};
C4.Player.prototype.clearComponents = function() {
    this.components = [];
};
C4.Player.prototype.getWinningComponents = function() {
    if (this.checkWin() == true) {
        this.incrementScore();
        return this.components.filter(function(comp, id, arr) {
            return comp.arity > 3;
        }, this);
    };
};
/**
 * A Player object
 * @constructor C4.Player
 * @param {String} name the player's name
 * @property {C4.Token[]} tokens array of tokens
 * @property {number} tokenIndex the identifier for the next available token
 * @property {C4.Component[]} components array of connected nodes
 * @property {Number} wins the number of games player has
 */
C4.Player = function(name) {
    this.name = name;
    this.tokens = [];
    this.tokenIndex = null;
    this.components = [];
    this.wins = 0;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg')).node();
    this.domElement.addEventListener('changeOpacity', function(e) {});
};
/**
 * Starts a new game, resets tokens and components
 */
C4.Player.prototype.startNewGame = function() {
    this.clearTokens();
    this.clearComponents();
};
/**
 * check for any components already established
 * @return {Boolean} size of components array
 */
C4.Player.prototype.hasComponents = function() {
    return this.components.length > 0;
};
/**
 * retrieves the component containing the two node based on relationship
 * @param  {C4.node} n1      first node
 * @param  {C4.Node} n2      second node
 * @param  {String} relCode  relationship/direction of connextion
 * @return {C4.Component}    the corresponding component
 */
C4.Player.prototype.getComponent = function(n1, n2, relCode) {
    var tmpComp = new C4.Component(n1, n2, relCode);
    return tmpComp;
};
/**
 * Places a specified token in the colIndex of the selected board
 * @param  {C4.Board} board
 * @param  {C4.Token} token
 * @param  {Number} colIndex column index
 * @throws {Error} If column cannot accept more tokens
 */
C4.Player.prototype.placeToken = function(board, token, colIndex) {
    try {
        board.placeToken(token, colIndex);
    } catch (err) {
        alert(err.message);
    }
};
/**
 * compares specified component against current components for shared direction
 * @param  {C4.Component}  newComp the new component
 * @return {Boolean}         any components sharing direction
 */
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
/**
 * increments the wins attribute
 */
C4.Player.prototype.incrementScore = function() {
    this.wins++;
};
/**
 * adds new component to array or augments an existing one if the two can merge
 * @param {C4.Component} newComp the new component
 */
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
/**
 * retrieves components that share direction with the specified component
 * @param  {C4.Component} newComp the component to check
 * @return {C4.Component[]}         matching components
 */
C4.Player.prototype.getDirectedComponents = function(newComp) {
    if (this.hasDirectedComponents(newComp) == true) {
        return this.components.filter(function(dComp) {
            return dComp.direction == newComp.direction;
        });
    };
};
/**
 * /
 * @param  {C4.Component}  newComp component to check
 * @return {Boolean}       if any of the players components match direction with newComp
 */
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
/**
 * retrieves components that intersect with the specified component
 * @param  {C4.Component} newComp the component to check
 * @return {C4.Component[]}         intersecting components
 */
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
/**
 * Merges two components
 * @param  {C4.Component} oComp   original component
 * @param  {C4.Component} newComp component to be merged
 */
C4.Player.prototype.unionizeComponents = function(oComp, newComp) {
    oComp.unionize(newComp);
};
/**
 * evaluates the uniqueness of a specified component
 * @param  {C4.Componeny} newComp component to be checked
 * @return {Boolean}         whether the component is unique
 */
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
/**
 * @return {C4.Token} user's next available token
 */
C4.Player.prototype.getNextToken = function() {
    if (this.tokens.length > 0) {
        var currToken = this.tokens[this.tokenIndex];
        this.tokenIndex--;
        return currToken;
    };
};
/**
 * adds a token and resets the toeknIndex
 * @param {C4.Token} token the next token
 */
C4.Player.prototype.addToken = function(token) {
    this.tokens.push(token);
    this.tokenIndex = this.tokens.length - 1;
};
/**
 * sorts components by descending arity
 */
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
/**
 * confirms win state
 * @return {Boolean} there is a component with arity 4
 */
C4.Player.prototype.checkWin = function() {
    var result = this.components.some(function(comp, index, arr) {
        return comp.arity > 3;
    }, this);
    return result;
};
/**
 * clears the token array
 */
C4.Player.prototype.clearTokens = function() {
    this.tokens = [];
    this.tokenIndex = null;
};
/**
 * clears the components array
 */
C4.Player.prototype.clearComponents = function() {
    this.components = [];
};
/**
 * returns the winning component
 * @return {C4.Component[]} Components with arity greater than 4
 */
C4.Player.prototype.getWinningComponents = function() {
    if (this.checkWin() == true) {
        this.incrementScore();
        return this.components.filter(function(comp, id, arr) {
            return comp.arity > 3;
        }, this);
    };
};
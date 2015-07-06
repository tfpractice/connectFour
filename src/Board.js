function Board(colCount, rowCount) {
    this.colCount = colCount;
    this.rowCount = rowCount;
    this.columns = [];
    this.initColumns();
    this.setHNeighbors();
    this.setPDNeighbors();
    this.setNDNeighbors();
}

Board.prototype.initColumns = function() {
    for (var i = 0; i < this.colCount; i++) {
        this.columns[i] = new Column(i, this.rowCount);
    };
};

Board.prototype.setHNeighbors = function() {
    for (var i = 0; i < this.colCount - 1; i++) {
        var currCol = this.columns[i];
        var nextCol = this.columns[i + 1];
        for (var j = 0; j < this.rowCount; j++) {
            var currNode = currCol.nodes[j];
            var nextNode = nextCol.nodes[j];
            currNode.setNeighbor("rc", nextNode);
            nextNode.setNeighbor("lc", currNode);
        };
    };
};

Board.prototype.setPDNeighbors = function() {
    for (var i = 0; i < this.colCount - 1; i++) {
        var currCol = this.columns[i];
        var nextCol = this.columns[i + 1];
        for (var j = this.rowCount - 1; j > 0; j--) {
            var currNode = currCol.nodes[j];
            var nextNode = nextCol.nodes[j - 1];
            currNode.setNeighbor("rt", nextNode);
            nextNode.setNeighbor("lb", currNode);
        };
    };
};

Board.prototype.setNDNeighbors = function() {
    for (var i = this.colCount - 1; i > 0; i--) {
        var currCol = this.columns[i];
        var nextCol = this.columns[i - 1];
        for (var j = this.rowCount - 1; j > 0; j--) {
            var currNode = currCol.nodes[j];
            var nextNode = nextCol.nodes[j - 1];
            currNode.setNeighbor("lt", nextNode);
            nextNode.setNeighbor("rb", currNode);
        };
    };
};

Board.prototype.placeToken = function(token, colIndex) {
    var currCol = this.columns[colIndex];
    try {
        if (currCol.isAvailable() == false) {
        	
            throw new Error("column not free, please select another");
            
        } else {
            currCol.placeToken(token);
            return true;
        }

    } catch(e) {
        alert(e.message);
        return false;
    }
};
C4.Board = function(colCount, rowCount) {
    this.colCount = colCount;
    this.rowCount = rowCount;
    this.columns = [];
    this.initColumns();
    this.currentColIndex = 0;
    this.setHNeighbors();
    this.setPDNeighbors();
    this.setNDNeighbors();
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g')).node();
}
C4.Board.prototype.initColumns = function() {
    for (var i = 0; i < this.colCount; i++) {
        this.columns[i] = new C4.Column(i, this.rowCount);
    };
};
C4.Board.prototype.setHNeighbors = function() {
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
C4.Board.prototype.setPDNeighbors = function() {
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
C4.Board.prototype.setNDNeighbors = function() {
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
C4.Board.prototype.placeToken = function(token, colIndex) {
    var currCol = this.columns[colIndex];
    try {
        if (currCol.isAvailable() == false) {
            throw new Error("column not free, please select another");
        } else {
            this.currentColIndex = colIndex;
            currCol.placeToken(token);
            return true;
        }
    } catch (e) {
        alert(e.message);
        return false;
    }
};
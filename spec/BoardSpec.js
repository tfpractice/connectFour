describe('Board', function() {
    var myBoard;
    beforeEach(function() {
        myBoard = new Board(7, 6);

    });

    describe('init', function() {
        it('initialuzes with a colCount', function() {
            expect(myBoard.colCount).toEqual(7);
        });
        it('initialuzes with a rowCount', function() {
            expect(myBoard.rowCount).toEqual(6);
        });
    });

    describe('createColumns', function() {
        it('establishes the columns based on the colCount and rowCount params', function() {
            myBoard.initColumns();
            expect(myBoard.columns.length).toBe(7);
        });
    });

    describe('setHNeighbors', function() {
        it('sets the rc and lc neighbors for each of the nodes', function() {
            myBoard.setHNeighbors();
            var node_2_3 = myBoard.columns[2].nodes[3];
            var node_3_3 = myBoard.columns[3].nodes[3];
            expect(node_2_3.neighbors['rc']).toBe(node_3_3);
        });
    });

    describe('setPDNeighbors', function() {
        it('sets the lb and rt neighbors for each of the nodes', function() {
            myBoard.setPDNeighbors();

            var node_2_3 = myBoard.columns[2].nodes[3];
            var node_3_2 = myBoard.columns[3].nodes[2];
            console.log(node_2_3);
            console.log(node_3_2);
            expect(node_2_3.neighbors['rt']).toBe(node_3_2);

        });
    });

    describe('setNDNeighbors', function() {
    	it('sets the lt and rb neighbors for each node', function() {
    		 myBoard.setNDNeighbors();
            var node_2_3 = myBoard.columns[2].nodes[3];
            var node_3_4 = myBoard.columns[3].nodes[4];
            expect(node_2_3.neighbors['rb']).toBe(node_3_4);
    	});
    });
});
fdescribe('Column', function() {
    var myColumn, myPlayer, myToken;
    beforeEach(function() {
        myColumn = new Column(1, 6);
        myPlayer = new Player("John");
        myToken = new Token(myPlayer, "#000000");


    });
    describe('init', function() {

        it('initializes with an index', function() {
            expect(myColumn.index).toEqual(1);
        });

        it('initializes with a nodeCount', function() {
            expect(myColumn.nodeCount).toEqual(6);
        });
        it('initializes with a nodes array', function() {
            expect(myColumn.nodes).toBeArray();
        });

    });
    describe('#addNode', function() {
        it('appends a node to the nodes array', function() {
            var myNode1 = new Node(1, 0);
            myColumn.addNode(myNode1);
            expect(myColumn.nodes.length).toBe(7);
        });
    });

    describe('#initializeNodes', function() {
        it('should populate the nodes array', function() {
            myColumn.initializeNodes();
            expect(myColumn.nodes.length).toBe(6);

        });
    });

    describe('#isAvailable', function() {
        it('determines if there is an unoccupied node', function() {
            expect(myColumn.isAvailable).toBeTruthy();
        });

        it('returns false if the freeIndex is less than zero', function() {
            tmpColumn = new Column(3,6);
            tmpPlayer = new Player("zach");
            for (var i = 0; i < 6; i++) {
               tempToken = new Token(tmpPlayer, "#ff00ff" );
               tmpColumn.placeToken(tempToken);

            };

            expect(tmpColumn.isAvailable()).toBeFalsy();
        });
    });
    describe('#setVerticalNeighbors', function() {
        it('establishes the vertically adjacent nodes', function() {
            myColumn.setVerticalNeighbors();
            var firstNode = myColumn.nodes[0];
            var secondNode = myColumn.nodes[1];

            expect(secondNode.neighbors["ct"]).toBe(firstNode);
        });
    });

    describe('#decrementIndex', function() {
        it('decrements the freeIndex', function() {
            myColumn.decrementIndex();
            expect(myColumn.freeIndex).toBe(4);
        });
    });
    describe('#placeToken', function() {
        it('places a token in the node at freeIndex', function() {

            var freeNode = myColumn.nodes[myColumn.freeIndex];
            myColumn.placeToken(myToken);

            expect(freeNode.occupied).toBe(true);
        });
    });
});
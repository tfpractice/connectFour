describe('Node', function() {
    var myNode;
    var myCTNeighbor;

    beforeEach(function() {
        myNode = new Node(1, 3);
        myCTNeighbor = new Node (1,2);
        myPlayer = new Player("John");
        myToken = new Token(myPlayer, "#000000");
        mySecondToken = new Token(myPlayer, "#000000");
    });
    describe('initiallization', function() {
        it('initializes with a column index', function() {
            expect(myNode.column).toEqual(1);
        });
        it('initializes with a row index', function() {
            expect(myNode.row).toEqual(3);
        });
        it('initializes as unooccupied', function() {
            expect(myNode.occupied).toBe(false);
        });
        it('initializes with a no player', function() {
            expect(myNode.player).toBe(null);
        });
        it('initializes with an empty neighbors object', function() {
            expect(myNode.neighbors).toEqual({});
        });
        it('initializes with no token ', function() {
            expect(myNode.token).toEqual(null);
        });
    });

    describe('#placeToken', function() {
        beforeEach(function() {
            myNode.placeToken(myToken);
        });
        it('sets the nodes token attribute', function() {

            expect(myNode.token).toBe(myToken);

        });

        it('sets the occupied attribute to true', function() {
        	expect(myNode.occupied).toBe(true);
        });
        it('sets the player attribute', function() {
        	expect(myNode.player).toBe(myPlayer);
        });
    });

    describe('#setNeighbor', function() {
    	it('sets the neighbor node based on a relationString', function() {
    		myNode.setNeighbor("ct", myCTNeighbor);
    		expect(myNode.neighbors["ct"]).toBe(myCTNeighbor);
    	});
    });
    describe('#checkNeighborPlayer', function() {
    	it('verifies that neighboring nodes have the same player', function() {
    		myNode.setNeighbor("ct", myCTNeighbor);
			myNode.placeToken(myToken);
			myCTNeighbor.placeToken(myToken);
			expect(myNode.player).toBe(myCTNeighbor.player);    		
    	});
    });
});
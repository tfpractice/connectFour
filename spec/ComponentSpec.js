describe('Component', function() {
	var n1, n2, relCode, p1, t1, myComponent;
	beforeEach(function() {
		n1 = new Node(2,3);
		n2 = new Node(3,2);
		relCode = "rt";
		n1.setNeighbor(relCode, n2);
		p1 = new Player("Jill");
		t1 = new Token(p1, "#ff00ff");
		n1.placeToken(t1);
		n2.placeToken(t1);
		myComponent = new Component(n1, n2, relCode);
	});

	describe('init', function() {
		it('initializes with an array of nodes', function() {
			expect(myComponent.nodes).toBeArray();
		});
		it('initializes with a player', function() {
			expect(myComponent.player).toBe(p1);
		});
		it('initializes with an arity of 2', function() {
			expect(myComponent.arity).toEqual(2);
		});
	});

	describe('#verifyMemberPlayers', function() {
		it('verifies that all memebers have the same player attr', function() {
			expect(myComponent.verifyMemberPlayers()).toBeTrue();
		});
	});
	describe('#determineDirection', function() {
		it('establishes the components direction based on relationCode', function() {
			expect(myComponent.direction).toBe("posDiagonal");
		});
	});
	describe('#contains', function() {
		it('checks if a node is already present in the nodes array', function() {
			expect(myComponent.contains(n1)).toBeTrue();
		});
	});
});
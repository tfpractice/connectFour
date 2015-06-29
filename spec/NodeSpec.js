describe('Node', function() {
	var myNode;

	beforeEach(function() {
		myNode = new Node(1,3);
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
});

describe('Column', function() {
	var myColumn;
	describe('init', function() {
		beforeEach(function() {
			myColumn = new Column(1,6);

		});
		it('initializes with an index', function() {
			expect(myColumn.index).toEqual(1);
		});

		it('initializes with a nodeCount', function() {
			expect(myColumn.nodeCount).toEqual(6);
		});
		it('initializes with an empty nodes array', function() {
			expect(myColumn.nodes).toEqual([]);
		});

	});
	describe('#addNode', function() {
		it('appends a node to the nodes array', function() {
			var myNode1 = new Node(1,0);
			myColumn.addNode(myNode1);
			expect(myColumn.nodes.length).toBe(1);
		});
	});
});
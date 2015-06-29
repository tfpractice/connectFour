describe('Board', function() {
	var myBoard;
	beforeEach(function() {
		myBoard = new Board (7,6);

	});

	describe('init', function() {
		it('initialuzes with a colCount', function() {
			expect(myBoard.colCount).toEqual(7);
		});
		it('initialuzes with a rowCount', function() {
			expect(myBoard.rowCount).toEqual(6);
		});
	});
});
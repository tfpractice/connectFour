describe('Game', function() {
	var p1, p2, myGame;

	beforeEach(function() {
		p1 = new Player("Dick");
		p2 = new Player("Jane");
		myGame = new Game(p1, p2);
	});

	describe('init', function() {
		it('instantiates with a player1', function() {
			expect(myGame.player1).toEqual(p1);
		});
	});
});
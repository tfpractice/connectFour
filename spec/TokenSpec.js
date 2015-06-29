describe('Token', function() {
	var p1Token, p2Token, p1, p2;
	beforeEach(function() {
		p1 = new Player("Jack");
		p2 = new Player("Jennifer");
		p1Token = new Token(p1, "#ff00ff");
		p2Token = new Token(p2, "#00ff00");

	});

	describe('init', function() {
		it('instantiaties with a Player', function() {
			expect(p1Token.player).toEqual(p1);
		});
	});
});
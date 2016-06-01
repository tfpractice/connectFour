fdescribe('Token', function() {
    var p1Token, p2Token, p1, p2;
    beforeEach(function() {
        p1 = new C4.Player("Jack");
        p2 = new C4.Player("Jennifer");
        p1Token = new C4.Token(p1, "#ff00ff");
        p2Token = new C4.Token(p2, "#00ff00");

    });

    describe('init', function() {
        it('instantiaties with a Player', function() {
            expect(p1Token.player).toEqual(p1);
        });
        it('initializes with an svg domElement', function() {
            expect(myToken.domElement).toBeTruthy();
        });
    });
});
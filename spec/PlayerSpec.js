describe('Player', function() {
    var myPlayer;
    beforeEach(function() {
        myPlayer = new Player("John");
    });
    describe('init', function() {



        it('initializes with a name', function() {
            expect(myPlayer.name).toEqual("John");
        });
         it('initializes with an empty tokens array', function() {
            expect(myPlayer.tokens).toEqual([]);
        });
          it('initializes with an empty components array', function() {
            expect(myPlayer.components).toEqual([]);
        });
    });
});
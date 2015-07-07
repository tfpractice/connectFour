describe('Player', function() {
    var myPlayer, myBoard, t1, t2, t3, n1, n2, n3;
    beforeEach(function() {

        myBoard = new Board(7, 6);
        myPlayer = new Player("John");
        t1 = new Token(myPlayer, "#ff00ff");
        t2 = new Token(myPlayer, "#ff00ff");
        t3 = new Token(myPlayer, "#ff00ff");
        // var n1 = new Node(2, 3);
        // var n2 = new Node(3, 2);
        // var n3 = new Node(4, 1);
        n1 = myBoard.columns[2].nodes[3];
        n2 = myBoard.columns[3].nodes[2];
        n3 = myBoard.columns[4].nodes[1];

        n1.setNeighbor("rt", n2);
        n2.setNeighbor("lb", n1);
        n1.placeToken(t1);
        n2.placeToken(t2);




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

    describe('#hasComponents', function() {
        it('determines if the player has any components', function() {
            expect(myPlayer.hasComponents()).toBeFalse();
        });
    });
    describe('#placeToken', function() {
        it('palces a token in a indexed column', function() {
            myPlayer.placeToken(myBoard, t1, 3);
            expect(myBoard.columns[3].freeIndex).toBe(4);
        });
    });

    // describe('#hasDirectedComponents', function() {
    //     it('determines if the player has components matching the direction of arg component', function() {
    //         var t1 = new Token(myPlayer, "#ff00ff");
    //         var t2 = new Token(myPlayer, "#ff00ff");
    //         var t3 = new Token(myPlayer, "#ff00ff");
    //         var n1 = new Node(2, 3);
    //         var n2 = new Node(3, 2);
    //         var n3 = new Node(4, 1);
    //         n1.placeToken(t1);
    //         n2.placeToken(t2);
    //         n3.placeToken(t3);
    //         var myComponent = new Component(n1, n2, "rt");
    //         var my2Component = new Component(n2, n3, "rt")


    //     });
    // });

    describe('#getComponent', function() {
        it('returns a new component based on the given nodes and neighborRelation', function() {


            // n1.placeToken(t1);
            // n2.placeToken(t2);
            // n3.placeToken(t3);
            console.log(n1);
            console.log(n2);
            var myComponent = new Component(n1, n2, "rt");
            console.log(myComponent);
            var resultComponent = myPlayer.getComponent(n1, n2, "rt");
            console.log(resultComponent);
            // console.log(myPlayer.getComponent());
            expect(resultComponent).toEqual(myComponent);
            // expect(myPlayer.getComponent(n1, n2, "rt")).toBeTrue();

        });
    });
});
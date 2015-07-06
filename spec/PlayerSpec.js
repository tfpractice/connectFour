// describe('Player', function() {
//     var myPlayer, myBoard;
//     var n1, n2, n3, n4, n5, p1, p2, t1, t2, t3, t4, myComponent, my2Component, oComponenet;
//     beforeEach(function() {
//         myPlayer = new Player("John");
//         myBoard = new Board(7, 6);
//         // n1 = new Node(2, 3);
//         // n2 = new Node(3, 2);
//         // n3 = new Node(4, 1);
//         // n4 = new Node(1, 4);
//         // n5 = new Node(1, 3);
//         // relCode = "rt";
//         // n1.setNeighbor(relCode, n2);
//         // p2 = new Player("Jack");
//         t1 = new Token(myPlayer, "#ff00ff");
//         // t2 = new Token(myPlayer, "#ff00ff");
//         // t3 = new Token(myPlayer, "#ff00ff");
//         // t4 = new Token(p2, "#ff00ff");
//         // n1.placeToken(t1);
//         // n2.placeToken(t1);
//         // n3.placeToken(t2);
//         // n4.placeToken(t3);
//         // n5.placeToken(t4);
//         // myComponent = new Component(n1, n2, relCode);
//         // my2Component = new Component(n2, n3, "rt")
//         // oComponenet = new Component(n3, n4, "ct");
//     });
//     describe('init', function() {
//         it('initializes with a name', function() {
//             expect(myPlayer.name).toEqual("John");
//         });
//         it('initializes with an empty tokens array', function() {
//             expect(myPlayer.tokens).toEqual([]);
//         });
//         it('initializes with an empty components array', function() {
//             expect(myPlayer.components).toEqual([]);
//         });
//     });
//     describe('#hasComponents', function() {
//         it('determines if the player has any components', function() {
//             expect(myPlayer.hasComponents()).toBeFalse();
//         });
//     });
//     // describe('getComponent', function() {
//     //     it('returns a new component based on neighboring occupied nodes', function() {

//     //     });
//     // });

//     describe('#placeToken', function() {
//         it('palces a token in a indexed column', function() {
//             myPlayer.placeToken(t1, 3);
//             expect(myBoard.columns[3].freeIndex).toBe(4);
//         });
//     });
// });
describe('Player', function() {
    var myPlayer, myBoard, t1;
    beforeEach(function() {

        myBoard = new Board(7, 6);
        myPlayer = new Player("John");
        t1 = new Token(myPlayer, "#ff00ff");
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
});
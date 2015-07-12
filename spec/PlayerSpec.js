describe('Player', function() {
    var myPlayer, myBoard, t1, t2, t3, n1, n2, n3;
    beforeEach(function() {
        myBoard = new Board(7, 6);
        myPlayer = new Player("John");
        t1 = new Token(myPlayer, "#ff00ff");
        t2 = new Token(myPlayer, "#ff00ff");
        t3 = new Token(myPlayer, "#ff00ff");
        n1 = myBoard.columns[2].nodes[3];
        n2 = myBoard.columns[3].nodes[2];
        n3 = myBoard.columns[4].nodes[1];
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
        it('initializes with an svg domElement', function() {
            expect(myPlayer.domElement).toBeTruthy();
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
    describe('component comparisons', function() {
        var myComponent, n2n3Component;
        beforeEach(function() {
            myComponent = new Component(n1, n2, "rt");
            n2n3Component = new Component(n2, n3, "rt");
            myPlayer.addComponent(myComponent);
        });
        describe('#getComponent', function() {
            it('returns a new component based on the given nodes and neighborRelation', function() {
                var resultComponent = myPlayer.getComponent(n1, n2, "rt");
                expect(resultComponent).toEqual(myComponent);
            });
        });
        describe('#hasDirectedComponents', function() {
            it('determines if the player currently has any components matching the argument', function() {
                expect(myPlayer.hasDirectedComponents(n2n3Component)).toBeTrue();
            });
        });
        describe('#addComponent', function() {
            it('appends a new component to the players component array', function() {
                expect(myPlayer.components).toContain(myComponent);
            });
            it('unionizes new component with intersecting components', function() {
                myPlayer.addComponent(n2n3Component);
                var origComp = myPlayer.getOriginalArrayComponent(myComponent);
                expect(origComp.arity).toBe(3);
            });
        });
        describe('#getDirectedComponents', function() {
            it('returns an array of components whose direction match that of the argument component', function() {
                expect(myPlayer.getDirectedComponents(n2n3Component)).toContain(myComponent);
            });
        });
        describe('#hasIntersectingComponents', function() {
            it('determines if any of the matching directed components intersect with the argument component', function() {
                expect(myPlayer.hasIntersectingComponents(n2n3Component)).toBeTrue();
            });
        });
        describe('#getIntersectingComponents', function() {
            it('returns an array of intersecting components', function() {
                expect(myPlayer.getIntersectingComponents(n2n3Component)).toContain(myComponent);
            });
        });
        describe('#getOriginalArrayComponent', function() {
            it('takes a component from a modified array and returns the original component', function() {
                expect(myPlayer.getOriginalArrayComponent(myComponent)).toBe(myComponent);
            });
        });
        describe('unionizeComponents', function() {
            it('adds nodes from an intersecting component to an already existing component', function() {
                myPlayer.unionizeComponents(myComponent, n2n3Component);
                expect(myComponent.arity).toBe(3);
            });
        });
        describe('evaluateUniqueness', function() {
            it('determines if a component warrants a unique entry in the components array ', function() {
                expect(myPlayer.evaluateUniqueness(n2n3Component)).toBeFalse();
            });
        });
        describe('aritySort', function() {
            it('sorts connected components by arity and reverses it', function() {
                var n23 = myBoard.columns[2].nodes[3];
                var n33 = myBoard.columns[3].nodes[3];
                var n43 = myBoard.columns[4].nodes[3];
                var t23 = new Token(myPlayer, "#ff0000");
                var t33 = new Token(myPlayer, "#ff0000");
                var t43 = new Token(myPlayer, "#ff0000");
                n23.placeToken(t23);
                n33.placeToken(t33);
                n43.placeToken(t43);
                myPlayer.aritySort();
               expect(myPlayer.components[0].arity).toBe(3);

           });
        });
       describe('#checkWin', function() {
            it('retuns false if there are no arity-4 components', function() {
                expect(myPlayer.checkWin()).toBeFalse();
            });
           it('returns true if any component has an arity over 3', function() {
                var n13 = myBoard.columns[1].nodes[3];
                var n23 = myBoard.columns[2].nodes[3];
                var n33 = myBoard.columns[3].nodes[3];
                var n43 = myBoard.columns[4].nodes[3];
                var t13 = new Token(myPlayer, "#ff0000");
                var t23 = new Token(myPlayer, "#ff0000");
                var t33 = new Token(myPlayer, "#ff0000");
                var t43 = new Token(myPlayer, "#ff0000");
                n13.placeToken(t13);
                n23.placeToken(t23);
                n33.placeToken(t33);
                n43.placeToken(t43);
               expect(myPlayer.checkWin()).toBeTrue();
            });
        });
       describe('getWinningComponents', function() {
            it('retuns the winning components', function() {
                var n13 = myBoard.columns[1].nodes[3];
                var n23 = myBoard.columns[2].nodes[3];
                var n33 = myBoard.columns[3].nodes[3];
                var n43 = myBoard.columns[4].nodes[3];
                var t13 = new Token(myPlayer, "#ff0000");
                var t23 = new Token(myPlayer, "#ff0000");
                var t33 = new Token(myPlayer, "#ff0000");
                var t43 = new Token(myPlayer, "#ff0000");
                n13.placeToken(t13);
                n23.placeToken(t23);
                n33.placeToken(t33);
                n43.placeToken(t43);
               expect(myPlayer.getWinningComponents()).not.toBeEmptyArray();

           });
        });

       describe('addToken', function() {
            it('adds a token to the players token array', function() {
                var tmpToken = new Token(myPlayer, "#ff0000");
                myPlayer.addToken(tmpToken);
                expect(myPlayer.tokenIndex).toBe(0);
            });
        });
        describe('getNextToken', function() {
            it('returns the next available token', function() {
                var tmpToken = new Token(myPlayer, "#ff0000");
                myPlayer.addToken(tmpToken);
                expect(myPlayer.getNextToken()).toBe(tmpToken);
            });
        });
    });
});
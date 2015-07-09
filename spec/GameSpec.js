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
        it('instantiates with a player2', function() {
            expect(myGame.player2).toEqual(p2);
        });
        it('instantiates with a new board', function() {
            expect(myGame.board).toBeTruthy();
        });
        it('instantiates with a currentPlayer', function() {
            expect(myGame.currentPlayer).toEqual(p1);
        });
        it('instantiates with a currentColIndex ', function() {
            expect(myGame.currentColIndex).toBe(0);
        });
    });
    describe('switchPlayer', function() {
        it('switches the currentPlayer', function() {
            myGame.switchPlayer();
            expect(myGame.currentPlayer).toBe(p2);
        });
    });
    describe('distribute tokens', function() {
        it('gives each player enough tokens to fill board', function() {
            expect(myGame.player1.tokens.length).toBe(21);
        });
    });
    describe('selectColumn', function() {
        it('selects a column based on an index', function() {
            var col3 = myGame.board.columns[3];
            expect(myGame.selectColumn(3)).toBe(col3);
        });
    });
    describe('playToken', function() {
        it('places the currentPlayer token in the current column', function() {
            var col2 = myGame.selectColumn(2);

            myGame.playToken();
            expect(col2.freeIndex).toBe(4);
        });
        it('places current players token in current slot ', function() {
            var col3 = myGame.selectColumn(3);
            var currToken = myGame.getToken();
            myGame.playToken();
            expect(col3.freeIndex).toBe(4);
        });
    });
    describe('getToken', function() {
        it('returns the currentPlayers next available token', function() {
            var currToken = myGame.currentPlayer.tokens[0];
            expect(myGame.getToken()).toEqual(currToken);
        });
    });

    describe('gamePlay trial', function() {
        describe('places five tokens in the central(index3) column', function() {
            var centralCol;
            beforeEach(function() {
                centralCol = myGame.selectColumn(3);
                for (var i = 0; i < 5; i++) {
                    myGame.playToken();
                };
            });
            it('leaves the last node of the central column available(index 0)', function() {

                expect(centralCol.freeIndex).toEqual(0);
            });
            it('fills final node and throws error', function() {
                myGame.playToken();
                expect(myGame.playToken()).toThrowAnyError();
            });

        });

        describe('places tokens in adjacent columns to evaluate node functionality', function() {
            var p1Index, p2Index;
            beforeEach(function() {
                p1Index = 2;
                p2Index = 3;


                for (var i = 0; i < 7; i++) {
                    
                    if ((i % 2) == 0) {
                       myGame.selectColumn(p1Index);
                       myGame.playToken();
                    } else if ((i % 2) == 1) {
                        myGame.selectColumn(p2Index);
                        myGame.playToken();
                    };
                };
            });

            describe('player1 has an arity-4 component', function() {
            	it('reports player one as having a single arity-4 component', function() {
            		console.log(myGame);
            		expect(myGame.player1.components).not.toBeEmptyArray();

            		// expect(array).toBeEmptyArray();
            	});
            	it('fills p1s columns with 4 tokens leaving position 1 free', function() {
            		expect(myGame.selectColumn(p1Index).freeIndex).toBe(1);
            	});

            });
        });
    });
});
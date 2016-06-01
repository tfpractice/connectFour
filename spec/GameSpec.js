fdescribe('Game', function() {
    var p1, p2, myGame;
    beforeEach(function() {
        p1 = new C4.Player("Dick");
        p2 = new C4.Player("Jane");
        myGame = new C4.Game(p1, p2);
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
        it('initializies with an empty array of winCoordinates', function() {
            expect(myGame.winCoordinates).toBeEmptyArray();
        });
        describe('setCustomColumnEvents', function() {
            it('applies a hover evet to the dom object of each column to select it', function() {
                expect(myGame.colHover).toBeTruthy();
            });
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
            
            var currLength = myGame.currentPlayer.tokens.length;
            var currToken = myGame.currentPlayer.tokens[currLength -1];
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
           xdescribe('player1 has an arity-4 component', function() {
                it('reports player one as having a single arity-4 component', function() {
                    expect(myGame.player1.components).not.toBeEmptyArray();
                });
                it('fills p1s columns with 4 tokens leaving position 1 free', function() {
                    expect(myGame.selectColumn(p1Index).freeIndex).toBe(1);
                });
            });
        });
    });
    xdescribe('#visualize', function() {
        beforeEach(function() {
            myGame.visualize();
        });
        it('appends an SVG element with class gameVis to DOM', function() {
            console.log($(myGame.visualization));
            console.log(d3.selectAll(".gameVis"));
            expect((myGame.visualization)).toBeInDOM("gameVis");
        });
        it('appends an svg elemnt (".playerVis") per player', function() {
            var playerVis = $(".playerVis");
            expect(playerVis.length).toBe(2);
        });
        it('appends a #gameBoard svg to the dom', function() {
            var gB = $('#gameBoard');
            expect(gB).not.toBeEmptyArray();
        });
        it('appends a .columnVis svg to the dom based on the board attribute', function() {
            var columns = $('.columnVis');
            expect(columns.length).toBe(7);
        });
        it('appends six nodes to each column', function() {
            var nodes = $('.nodeVis');
            expect(nodes.length).toBe(42);
        });
        it('appends a .nodeToken placeHolder onto every node', function() {
            var nTokens = $('.nodeToken');
            expect(nTokens.length).toBe(42);
        });
        describe('D3js DomEvents cannot be tested internally spies dont have callThrough', function() {
            var col2ClickSpy, col1HoverSpy, nodeTokenSpy;
            beforeEach(function() {
                col1HoverSpy = spyOnEvent('#column1', 'hover');
                col2ClickSpy = spyOnEvent('#column2', 'click');

            });
            describe('columnVis click', function() {
                it('triggers a click event on #column2', function() {
                    $('#column2').click();
                    expect(col2ClickSpy).toHaveBeenTriggered();
                });

                it('triggers an attribute change in the d3Selection', function() {
                    $("#column2").click(function(d) {
                        d3.select(this).attr('fill', '#ff0000').append('h1').text(function(c) {
                            return c.index;
                        }); // body...
                        // console.log(d);
                    });
                    $("#column2").click();
                    $('#column2').trigger('click');
                    var colStyle = $("#column2").css("fill");
                    expect(colStyle).toEqual('rgb(255, 0, 0)');
                });
            });
            describe('columnVis hover', function() {
                it('selects the currently hovered column (#column1)', function() {
                    
                    $("#column1").on('hover', function(e) {
                         var d3Event = function(e){
                            d3.select(this).on('hover', function(d) {
                            console.log(d.index);
                            /* Act on the event */
                        })
                        };
                        // 
                        return d3Event();
                        console.log(d3Event);
                        /* Act on the event */
                    });
                    $("#column1").hover();
                    $("#column1").trigger('hover');
                    expect(col1HoverSpy).toHaveBeenTriggered();
                });
            });
        });
    });
    describe('jasmine-jquery trial', function() {
        var elem;
        beforeEach(function() {
            elem = $('<div id="trialDiv"></div>');
        });
        it('appends a div with id trialDiv to DOM', function() {
            expect(elem).toHaveId('trialDiv');
        });
    });
});
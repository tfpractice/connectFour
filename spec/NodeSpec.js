describe('Node', function() {
    var myNode;
    var myCTNeighbor;
    beforeEach(function() {
        myNode = new Node(1, 3);
        myCTNeighbor = new Node(1, 2);
        myPlayer = new Player("John");
        myToken = new Token(myPlayer, "#000000");
        mySecondToken = new Token(myPlayer, "#000000");
    });
    describe('initiallization', function() {
        it('initializes with a column index', function() {
            expect(myNode.column).toEqual(1);
        });
        it('initializes with a row index', function() {
            expect(myNode.row).toEqual(3);
        });
        it('initializes as unooccupied', function() {
            expect(myNode.occupied).toBe(false);
        });
        it('initializes with a no player', function() {
            expect(myNode.player).toBe(null);
        });
        it('initializes with an empty neighbors object', function() {
            expect(myNode.neighbors).toEqual({});
        });
        it('initializes with no token ', function() {
            expect(myNode.token).toEqual(null);
        });
        it('initializes with no color ', function() {
            expect(myNode.color).toEqual("none");
        });
        it('initializes with a svg domElement', function() {
            console.log(myNode.domElement);
            expect(myNode.domElement).toBeTruthy();

        });
    });
    describe('#setToken', function() {
        beforeEach(function() {
            myNode.setToken(myToken);
        });
        it('sets the nodes token value', function() {
            expect(myNode.token).toBe(myToken);
        });
        it('sets the nodes token attribute', function() {
            expect(myNode.token).toBe(myToken);
        });
        it('sets the occupied attribute to true', function() {
            expect(myNode.occupied).toBe(true);
        });
        it('sets the player attribute', function() {
            expect(myNode.player).toBe(myPlayer);
        });
    });
    describe('#placeToken', function() {
        beforeEach(function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            myCTNeighbor.setNeighbor("cb", myNode);
            myNode.placeToken(myToken);
        });
        it('sets player token', function() {
            expect(myNode.token).toBe(myToken);
        });
        describe('when no neighboring nodes match player', function() {
            it('does not find any mathcing neighbor nodes', function() {
                myNode.setNeighbor("ct", myCTNeighbor);
                myCTNeighbor.setNeighbor("cb", myNode);
                expect(myNode.checkMatchingNeighbors()).toBeFalse();
            });
            it('does not modify player components', function() {
                myNode.setNeighbor("ct", myCTNeighbor);
                myCTNeighbor.setNeighbor("cb", myNode);
                myNode.placeToken(myToken);
                expect(myNode.player.components).toBeEmptyArray();
            });
        });
        describe('when there are matching neighbors', function() {
            it('creates a new component based on match', function() {
                myCTNeighbor.placeToken(myToken);
                var myComponent = new Component(myCTNeighbor, myNode, "cb");
                expect(myNode.player.components).toContain(myComponent);
            });
        });
        describe('when multiple matching neighbors can become one component', function() {
            it('combines the players components', function() {
                var myThirdToken = new Token(myPlayer, "#000000");
                var myCBNeighbor = new Node(1, 4);
                myNode.setNeighbor("cb", myCBNeighbor);
                myCBNeighbor.setNeighbor("ct", myNode);
                myCTNeighbor.placeToken(myToken);
                var myComponent = myCTNeighbor.getComponent(myNode, "cb");
                myCBNeighbor.placeToken(myThirdToken);
                var cbComp = myCBNeighbor.getComponent(myNode, "ct");
                var uComp = myComponent.unionize(cbComp);
                expect(myNode.player.components).toContain(uComp);

            });
        });
    });
    describe('#setNeighbor', function() {
        it('sets the neighbor node based on a relationString', function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            expect(myNode.neighbors["ct"]).toBe(myCTNeighbor);
        });
    });
    describe('#checkNeighborPlayer', function() {
        it('verifies that neighboring nodes have the same player', function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            myNode.placeToken(myToken);
            myCTNeighbor.placeToken(myToken);
            expect(myNode.player).toBe(myCTNeighbor.player);
        });
    });
    describe('#changeColor', function() {
        it('changes node color based on token', function() {
            myNode.changeColor(myToken);
            expect(myNode.color).toBe(myToken.color);
        });
    });
    describe('checkMatchingNeighbors', function() {
        it('searches neighboring nodes for a matching player', function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            myNode.placeToken(myToken);
            myCTNeighbor.placeToken(myToken);
            expect(myNode.checkMatchingNeighbors()).toBeTrue();
        });
    });
    describe('interNode Comparison', function() {
        beforeEach(function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            myNode.placeToken(myToken);
        });
        describe('getMatchingNeighbors', function() {
            it('retuns an array of neighboring nodes with the same player attribute', function() {
                myCTNeighbor.placeToken(myToken);
                expect(myNode.getMatchingNeighbors()).toBeArray();
            });
            it('will return an array containing neighboring matched nodes', function() {
                myCTNeighbor.placeToken(myToken);
                expect(myNode.getMatchingNeighbors()).toContain(myCTNeighbor);
            });
        });
        describe('#getComponent', function() {
            it('returns a new component based on the matching neighboring nodes', function() {
                myCTNeighbor.placeToken(myToken);
                var myComponent = new Component(myNode, myCTNeighbor, "ct");
                expect(myNode.getComponent(myCTNeighbor, "ct")).toEqual(myComponent);
            });
        });
        describe('#checkMatch', function() {
            it('ensures that another ndoe has the same player', function() {
                myCTNeighbor.placeToken(myToken);
                expect(myNode.checkMatch(myCTNeighbor)).toBe(true);
            });
        });
        describe('#confirmNeighborStatus', function() {
            it('confirms that nodes are in fact neighboring', function() {
                expect(myNode.confirmNeighborStatus(myCTNeighbor, "ct")).toBeTrue();
            });
        });
        describe('createPlayerComponent', function() {
            it('passes newly created node to mutual player', function() {
                var myComponent = myNode.getComponent(myCTNeighbor, "ct");
                myNode.createPlayerComponent(myComponent);
                expect(myNode.player.components).toContain(myComponent);
            });
        });
    });
    describe('makeMatchingComponents', function() {
        it('creates a new component for each matching neighbor', function() {
            myNode.setNeighbor("ct", myCTNeighbor);
            myCTNeighbor.setNeighbor("cb", myNode);
            myCTNeighbor.placeToken(myToken);
            myNode.placeToken(myToken);
            var myComponent = myNode.getComponent(myCTNeighbor, "ct");
            myNode.makeMatchingComponents();
            expect(myNode.player.components).toContain(myComponent);
        });
    });
});
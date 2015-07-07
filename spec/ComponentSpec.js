describe('Component', function() {
    var n1, n2, n3, n4, n5, relCode, p1, p2, t1, t2, t3, t4, myComponent, my2Component, oComponenet;
    beforeEach(function() {
        n1 = new Node(2, 3);
        n2 = new Node(3, 2);
        n3 = new Node(4, 1);
        n4 = new Node(1, 4);
        n5 = new Node(1, 3);
        relCode = "rt";
        n1.setNeighbor(relCode, n2);
        p1 = new Player("Jill");
        p2 = new Player("Jack");
        t1 = new Token(p1, "#ff00ff");
        t2 = new Token(p1, "#ff00ff");
        t3 = new Token(p2, "#ff00ff");
        t4 = new Token(p2, "#ff00ff");
        n1.placeToken(t1);
        n2.placeToken(t1);
        n3.placeToken(t2);
        n4.placeToken(t3);
        n5.placeToken(t4);
        myComponent = new Component(n1, n2, relCode);
        my2Component = new Component(n2, n3, "rt")
        oComponenet = new Component(n3, n4, "ct");
    });
    describe('init', function() {
        it('initializes with an array of nodes', function() {
            expect(myComponent.nodes).toBeArray();
        });
        it('initializes with a player', function() {
            expect(myComponent.player).toBe(p1);
        });
        it('initializes with an arity of 2', function() {
            expect(myComponent.arity).toEqual(2);
        });
    });
    describe('#verifyMemberPlayers', function() {
        it('verifies that all memebers have the same player attr', function() {
            expect(myComponent.verifyMemberPlayers()).toBeTrue();
        });
    });
    describe('#determineDirection', function() {
        it('establishes the components direction based on relationCode', function() {
            expect(myComponent.direction).toBe("posDiagonal");
        });
    });
    describe('#contains', function() {
        it('checks if a node is already present in the nodes array', function() {
            expect(myComponent.contains(n1)).toBeTrue();
        });
    });
    describe('intersection', function() {
        it('retuns an array of nodes shared by two components', function() {
            expect(myComponent.intersection(my2Component)).toBeArray();
        });
    });
    describe('intersects', function() {
        it('determines if two components share nodes', function() {
            expect(myComponent.intersects(my2Component)).toBeTrue();
        });
    });
    describe('playerCheck', function() {
        it('determines of two components have the smae owner', function() {
            expect(myComponent.playerCheck(my2Component)).toBeTrue();
        });
    });
    describe('difference', function() {
        it('returns an array of nodes not contained in the operating array', function() {
            expect(myComponent.difference(my2Component)).toBeArray();
        });
    });
    describe('hasDistinctNodes', function() {
        it('determines if there are distinct nodes between componnts', function() {
            expect(myComponent.hasDistinctNodes(my2Component)).toBeTrue();
        });
    });
    describe('union', function() {
        it('returns an array of all nodes between two componenets', function() {
            expect(myComponent.union(my2Component)).toBeArray();
        });
    });
    describe('addNode', function() {
        it('adds a node to the component', function() {
            myComponent.addNode(n3);
            expect(myComponent.arity).toBe(3);
        });
    });
    describe('unionize', function() {
        it('sets the nodes to be the union of the two components', function() {
            myComponent.unionize(my2Component);
            var nodeUnion = myComponent.union(my2Component);
            console.log(nodeUnion);
            console.log(myComponent.nodes);
            expect(myComponent.nodes).toEqual(nodeUnion);
        });
    });
    describe('checkDirection', function() {
        it('determines if two components share the same direction', function() {
            expect(myComponent.checkDirection(my2Component)).toBeTrue();
        });
    });
});
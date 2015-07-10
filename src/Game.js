 function Game(p1, p2) {
     this.player1 = p1;
     this.player2 = p2;
     this.players = [this.player1, this.player2];
     this.board = new Board(7, 6);
     this.distributeTokens();
     this.currentPlayer = this.player1;
     this.currentColIndex = this.board.currentColIndex;
 }
 Game.prototype.switchPlayer = function() {
     this.currentPlayer = (this.currentPlayer == this.player1) ? this.player2 : this.player1;
 };
 Game.prototype.distributeTokens = function() {
     var tokenCount = 7 * 6;
     var splitCount = Math.ceil(tokenCount / 2);
     for (var i = 0; i < splitCount; i++) {
         var p1Token = new Token(this.player1, "#ff0000");
         var p2Token = new Token(this.player2, "#000000");
         this.player1.addToken(p1Token);
         this.player2.addToken(p2Token);
     };
 };
 Game.prototype.selectColumn = function(colIndex) {
     this.currentColIndex = colIndex;
     return this.board.columns[colIndex];
 };
 Game.prototype.playToken = function() {
     var currToken = this.getToken();
     var success = this.board.placeToken(currToken, this.currentColIndex);
     if (success == true) {
         if (this.currentPlayer.checkWin() == true) {
             var winArray = this.currentPlayer.getWinningComponents();
             alert(this.currentPlayer.name + "  HAS WON THE CURRENT GAME VIA THESE COMPONENTS" + winArray.toString());
         } else {
             this.switchPlayer();
         };
     };
 };
 Game.prototype.getToken = function() {
     var tmpToken = this.currentPlayer.getNextToken();
     return tmpToken;
 };
 Game.prototype.visualize = function() {
     d3.selectAll('svg').remove();
     this.visualization = d3.select('body').append('svg').classed("gameVis", true);
     var playerVis = this.visualization.selectAll(".playerVis").data(this.players).enter()
         .append('svg').classed("playerVis", true)
         .attr('id', function(p, i) {
             return "p" + (i + 1) + "Vis";
         });
     var board = this.visualization.selectAll('#gameBoard').data([this.board])
         .enter().append('svg').attr('id', 'gameBoard');
     var columns = board.selectAll(".columnVis").data(function(d) {
             return d.columns;
         })
         .enter().append('svg').classed("columnVis", true).attr('id', function(c) {
             return "column" + c.index;
         }).attr('fill', 'blue');
     columns.on("click", function(c) {
         d3.select(this).attr('fill', 'red')
             .append('h1')
             .text("I HAVE BEEN CLICKED");
         alert(c.index + "hasBeenClicked");
         
     });
     var nodes = columns.selectAll(".nodeVis").data(function(c) {
         return c.nodes;
     }).enter().append('svg').classed("nodeVis", true).attr('id', function(n) {
         return "node" + n.column + n.row + ""
     });
     var nodeTokens = nodes.append('svg').classed("nodeToken", true);
 };
 function Game(p1, p2) {
     this.player1 = p1;
     this.player2 = p2;
     this.players = [this.player1, this.player2];
     this.board = new Board(7, 6);
     this.distributeTokens();
     this.currentPlayer = this.player1;
     this.currentColIndex = this.board.currentColIndex;
     this.visualization = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg')).node();
     this.colHover = new CustomEvent('hover', {
         'detail': this
     });
     this.gameClick = new CustomEvent("gameClick", {
         'detail': this
     });
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
 Game.prototype.setCustomColumnEvents = function() {
     this.board.columns.forEach(function(col, id, arr) {
         col.domElement.addEventListener('gameClick', function(e) {
             //console.log("now selecting column " + col.index + "");
             e.detail.selectColumn(col.index);
             $(col.domElement).trigger('hover');
             //console.log(e.detail);
         });
     }, this);
     this.visualization.dispatchEvent(this.gameClick);
 };
 Game.prototype.visualize = function() {

    var screenWidth = window.innerWidth;
    var gameUnit = screenWidth/40;
    var p1x = gameUnit, p1y = gameUnit, p1Width = gameUnit * 10, p2Width = gameUnit * 10;
    //console.log("player 2 box iwdht");
    //console.log(p2Width);
     var gameObj = this;
     d3.selectAll('svg').remove();
     var gVis = d3.select('body').selectAll('.gameVis')
         .data([this]).enter().append(function(g) {
             return g.visualization;
         })
         .classed("gameVis", true);
     gVis.on('moouseenter', function(event) {
         event.preventDefault();
         
     });
     var playerVis = gVis.selectAll(".playerVis")
         .data(function(g) {
             return g.players;
         })
         .enter()
         .append('svg')
         .classed("playerVis", true)
         .attr('id', function(p, i) {
             return "p" + (i + 1) + "Vis";
         });
     var board = gVis.selectAll('#gameBoard')
         .data(function(g) {
             return [g.board];
         })
         .enter()
         .append(function(b) {
             return b.domElement;
         })
         .attr('id', 'gameBoard');
     var colHoverEvt = new CustomEvent('')
     var columns = board.selectAll(".columnVis")
         .data(function(d) {
             return d.columns;
         })
         .enter()
         .append(function(c) {
             return c.domElement;
         }).classed("columnVis", true)
         .attr('id', function(c) {
             return "column" + c.index;
         })
         .attr('fill', 'blue');
 
     columns.each(function(col, id) {
         col.domElement.addEventListener('hover', function(d) {
             d3.select(this);
             //console.log("A D3 selection was clicked, the event should be triggerd");
             gameObj.selectColumn(col.index);
             //console.log(col);
             //console.log(d.detail);
         });
         //console.log(gameObj.currentColIndex);
         col.domElement.dispatchEvent(gameObj.colHover);
     });
     //console.log(columns);
     var nodes = columns.selectAll(".nodeVis")
         .data(function(c) {
             return c.nodes;
         })
         .enter()
         .append(function(n) {
             return n.domElement;
         })
         .classed("nodeVis", true).attr('id', function(n) {
             return "node" + n.column + n.row + ""
         });
     var nodeTokens = nodes.append('svg')
         .classed("nodeToken", true);
 };
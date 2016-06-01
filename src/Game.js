C4.Game = function(p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
    this.players = [this.player1, this.player2];
    this.board = new C4.Board(7, 6);
    this.player1.startNewGame();
    this.player2.startNewGame();
    this.distributeTokens();
    this.currentPlayer = this.player1;
    this.currentColIndex = this.board.currentColIndex;
    this.visualization = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg')).node();
    this.winCoordinates = [];
    this.colHover = new CustomEvent('mouseenter', {
        'detail': this
    });
    this.gameClick = new CustomEvent("gameClick", {
        'detail': this
    });
    this.changeOpacity = new CustomEvent('changeOpacity', {
        'detail': this
    });
    this.gameWon = new CustomEvent('gameWon', {
        'detail': this
    });
    this.drawWinningLine = new CustomEvent('drawWinningLine', {
        'detail': this
    });
    this.visualize();
}
C4.Game.prototype.switchPlayer = function() {
    this.currentPlayer = (this.currentPlayer == this.player1) ? this.player2 : this.player1;
    this.player1.domElement.dispatchEvent(this.changeOpacity);
    this.player2.domElement.dispatchEvent(this.changeOpacity);
};
C4.Game.prototype.distributeTokens = function() {
    var tokenCount = 7 * 6;
    var splitCount = Math.ceil(tokenCount / 2);
    for (var i = 0; i < splitCount; i++) {
        var p1Token = new Token(this.player1, "#ff0000");
        var p2Token = new Token(this.player2, "#000000");
        this.player1.addToken(p1Token);
        this.player2.addToken(p2Token);
    };
};
C4.Game.prototype.selectColumn = function(colIndex) {
    this.currentColIndex = colIndex;
    return this.board.columns[colIndex];
};
C4.Game.prototype.playToken = function() {
    var currToken = this.getToken();
    var success = this.board.placeToken(currToken, this.currentColIndex);
    if (success == true) {
        if (this.currentPlayer.checkWin() == true) {
            var winArray = this.currentPlayer.getWinningComponents();
            this.assembleWinningCoordinates(winArray);
            alert(this.currentPlayer.name + "  HAS WON THE CURRENT GAME VIA THESE COMPONENTS" + winArray.toString());
            document.getElementById("p1Info").dispatchEvent(this.gameWon);
            document.getElementById("p2Info").dispatchEvent(this.gameWon);
            document.getElementById("gameStartButton").dispatchEvent(this.gameWon);
        } else {
            this.switchPlayer();
        };
    };
};
C4.Game.prototype.assembleWinningCoordinates = function(winArray) {
    var winCoords = [];
    winArray[0].nodes.forEach(function(node, id, arr) {
        var nodeC = [(node.domElement.cx.baseVal.value), (node.domElement.cy.baseVal.value)];
        winCoords.push(nodeC);
    }, this);
    this.winCoordinates = winCoords;
    document.getElementById("gameBoard").dispatchEvent(this.drawWinningLine);
};
C4.Game.prototype.getToken = function() {
    var tmpToken = this.currentPlayer.getNextToken();
    return tmpToken;
};
C4.Game.prototype.setCustomColumnEvents = function() {
    this.board.columns.forEach(function(col, id, arr) {
        col.domElement.addEventListener('gameClick', function(e) {
            e.detail.selectColumn(col.index);
            $(col.domElement).trigger('hover');
        });
    }, this);
    this.visualization.dispatchEvent(this.gameClick);
};
C4.Game.prototype.visualize = function() {
    d3.selectAll("svg, g, rect, circle, line, path").remove();
    var screenWidth = window.innerWidth;
    var gameUnit = screenWidth / 40;
    var gameVisX = gameUnit,
        gameVisY = gameUnit,
        gameVisWidth = gameUnit * 38,
        gameVisHeight = gameVisWidth,
        p1x = gameUnit,
        p1y = gameVisY + gameUnit,
        p1Width = gameUnit * 10,
        p2Width = gameUnit * 10,
        p2x = gameUnit * 28,
        playerWidth = 9 * gameUnit,
        boardX = gameVisX + (11 * gameUnit),
        boardY = gameVisY,
        boardWidth = 14 * gameUnit,
        boardHeight = 16 * gameUnit,
        boardSpan = boardX + boardWidth,
        colY = boardY + gameUnit,
        colWidth = 2 * gameUnit,
        colHeight = 6 * gameUnit,
        colSpanY = colY + (gameUnit * 6),
        nodeW = 2 * gameUnit,
        nodeH = nodeW;
    var boardScaleX = d3.scale.linear()
        .domain([0, 7])
        .range([boardX, boardSpan]);
    var boardScaleY = d3.scale.linear()
        .domain([0, 6])
        .range([colY, colSpanY]);
    var gameObj = this;
    var gVis = d3.select('#gb').selectAll('.gameVis')
        .data([this]).enter().append(function(g) {
            return g.visualization;
        })
        .classed("gameVis", true)
        .attr({
            width: gameVisWidth,
            height: gameVisHeight
        })
        .style('opacity', 0.2);
    var playerVis = gVis.selectAll(".playerVis")
        .data(function(g) {
            return g.players;
        })
        .enter()
        .append(function(p) {
            return p.domElement;
        })
        .classed("playerVis", true)
        .attr('id', function(p, i) {
            return "p" + (i + 1) + "Vis";
        }).attr('stroke', function(p) {
            return p.tokens[0].color;
        }).on('changeOpacity', function(p) {
            if (gameObj.currentPlayer == p) {
                d3.select(this).style("opacity", 0.75);
            } else {
                d3.select(this).style("opacity", 0.3);
            };
        });
    playerVis.append('rect')
        .attr({
            x: function(p, i) {
                if (i == 0) {
                    return p1x;
                } else {
                    return p2x;
                };
            },
            y: p1y,
            fill: function(p) {
                return p.tokens[0].color;
            },
            width: p1Width,
            height: p1Width
        })
        .style('opacity', 0.2);
    d3.select("#p1Vis").selectAll(".tokenVis")
        .data(gameObj.player1.tokens)
        .enter()
        .append(function(t) {
            return t.domElement;
        }).classed("tokenVis", true)
        .attr({
            cx: function(t, i) {
                return p1x + ((i % 3) * (1.5 * nodeW));
            },
            cy: function(t, i) {
                return p1y + ((Math.floor(i / 3)) * nodeW);
            },
            r: nodeW / 2,
            fill: function(t) {
                return t.color;
            }
        });
    d3.select("#p2Vis").selectAll(".tokenVis")
        .data(gameObj.player2.tokens)
        .enter()
        .append(function(t) {
            return t.domElement;
        }).classed("tokenVis", true)
        .attr({
            cx: function(t, i) {
                return p2x + nodeW + ((i % 3) * (1.5 * nodeW));
            },
            cy: function(t, i) {
                return p1y + ((Math.floor(i / 3)) * nodeW);
            },
            r: nodeW / 2,
            fill: function(t) {
                return t.color;
            }
        });
    var p1Stats = d3.select("#p1Info")
        .on('gameWon', function(p) {
            d3.select("#p1Score").html(function(p) {
                return p.wins;
            });
        });
    p1Stats.selectAll("#p1Name")
        .data([gameObj.player1])
        .enter()
        .append("h1")
        .attr('id', 'p1Name')
        .html(function(p) {
            return p.name;
        });
    p1Stats.selectAll("#p1Score")
        .data([gameObj.player1])
        .enter()
        .append("h1")
        .attr('id', 'p1Score')
        .html(function(p) {
            return p.wins;
        });
    var p2Stats = d3.select("#p2Info")
        .on('gameWon', function(p) {
            d3.select("#p2Score").html(function(p) {
                return p.wins;
            });
        });
    p2Stats.selectAll("#p2Name")
        .data([gameObj.player2])
        .enter()
        .append("h1")
        .attr('id', 'p2Name')
        .html(function(p) {
            return p.name
        });
    p2Stats.selectAll("#p2Score")
        .data([gameObj.player2])
        .enter()
        .append("h1")
        .attr('id', 'p2Score')
        .html(function(p) {
            return p.wins;
        });
    d3.select("#p2Vis").insert("div")
        .classed("playerDiv", true)
        .attr('id', "p2Div");
    var lineFunction = d3.svg.line()
        .x(function(d) {
            return d[0];
        })
        .y(function(d) {
            return d[1];
        })
        .interpolate("linear");
    var board = gVis
        .selectAll('#gameBoard')
        .data(function(g) {
            return [g.board];
        })
        .enter()
        .insert(function(b) {
            return b.domElement;
        }, "#p2Vis")
        .attr('id', 'gameBoard').attr({
            x: 0,
            y: 0,
            fill: "none",
            stroke: "#000000",
            "stroke-width": 2,
            width: boardWidth,
            height: boardHeight
        }).style('background-color', '#00ff00');
    board.on('drawWinningLine', function(d) {
        d3.select(this).append('path')
            .attr("d", lineFunction(gameObj.winCoordinates))
            .attr("stroke", "#00ff00")
            .attr("stroke-width", 10)
            .attr("fill", "none");
    });
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
        }).attr({
            x: function(d, i) {
                return boardX + gameUnit + (i * colWidth);
            },
            y: boardY,
            fill: function(d, i) {
                return "#000000";
            },
            stroke: "#00ff00",
            width: colWidth,
            height: colHeight
        })
        .style("background-color", "#ff00ff")
        .on('mouseenter', function(col) {
            gameObj.selectColumn(col.index);
        }).on('click', function(col) {
            gameObj.selectColumn(col.index);
            gameObj.playToken();
        });
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
        })
        .attr({
            cx: function(d, i) {
                return boardX + (gameUnit * 1.5) + (d.column * nodeW);
            },
            cy: function(d, i) {
                return (d.row * nodeH) + (nodeH * 1.5);
            },
            r: nodeW / 2,
            fill: function(d, i) {
                return (d.color);
            },
            stroke: function(d, i) {
                return (d.color);
            },
            width: nodeW,
            height: nodeH
        })
        .style("stroke", "#000000");
};
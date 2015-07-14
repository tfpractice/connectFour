$(function() {
    $("#gameStartButton").on('click', function(event) {
        // event.preventDefault();
        var p1Name = $("#p1Name").val() || "Dick";
        var p2Name = $("#p2Name").val() || "Jane";
        console.log(p1Name);
        console.log(p2Name);

        var p1 = new Player(p1Name);
        var p2 = new Player(p2Name);

        var game = new Game(p1, p2);
        game.visualize();
    });







});
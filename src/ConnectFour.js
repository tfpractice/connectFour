$(function() {
    var game;
    var p1;
    var p2;
    $("#gameStartButton").on('click', function(event) {
        var p1Name = $("#p1Name").val() || "Dick";
        var p2Name = $("#p2Name").val() || "Jane";
        console.log(p1Name);
        console.log(p2Name);

        p1 = p1 || new Player(p1Name);
        p2 = p2 || new Player(p2Name);

        game = new Game(p1, p2);
        game.visualize();

    });
    $(window).resize(function(e) {

        console.log("window resized");
        game.visualize();
    });







});
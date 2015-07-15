function Token(player, color) {
    this.player = player;
    this.color = color;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'circle')).node();



    // body...
}
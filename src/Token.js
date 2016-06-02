/**
 * a connect four token
 * @constructor C4.Token
 * @param {C4.Player} player the player owning the token
 * @param {Color} color
 */
C4.Token = function(player, color) {
    this.player = player;
    this.color = color;
    this.domElement = d3.select(document.createElementNS(d3.ns.prefix.svg, 'circle')).node();
};
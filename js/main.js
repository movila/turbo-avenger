var viewportWidth = $(window).width(), SIDEBAR_WIDTH = 250;
$('#content').css("width", viewportWidth - SIDEBAR_WIDTH + "px");

var ITEM_WIDTH = 238, GAP = 20, COIN_ITEM = ITEM_WIDTH + GAP;
var containerWidth = $('#deal-list').width(), var cols = Math.floor((containerWidth+GAP)/COIN_ITEM), listNum = $('.item-wrapper').length;

var $items = $('.item-wrapper');
var left = 0, minBot = 0;

for (var i = 0; i < listNum; i++) {
	var $li = $($items[i]);
	var liHeight = $li.height();

	minBot = Math.min(minBot, liHeight);

	left += COIN_ITEM;
	if ((i+1) % cols == 0)
		left = 0;
};
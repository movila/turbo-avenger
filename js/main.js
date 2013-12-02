// START ..
var ITEM_WIDTH = 240, GAP = 20,  SIDEBAR_WIDTH = 250, MAX_COLS_PER_PAGE = 3, respBox = '#content', stream = '#deal-list';

var COIN_ITEM = ITEM_WIDTH + GAP;
var viewportWidth = $(window).width();
var contentWidth = viewportWidth - SIDEBAR_WIDTH;
var cols = Math.floor((contentWidth + GAP) / COIN_ITEM);
var containerWidth = COIN_ITEM * MAX_COLS_PER_PAGE - GAP;

if (cols > MAX_COLS_PER_PAGE)
	cols = MAX_COLS_PER_PAGE;
if (cols < MAX_COLS_PER_PAGE)
	containerWidth = COIN_ITEM * cols - GAP;

$(respBox).css("width", contentWidth + "px");
$(stream).css("width", containerWidth + "px");
var $items = $(stream + ' > li');

var icicleLengths = new Array();
for (var x = 0; x < cols; x++)
	icicleLengths[x] = 0;

for (var i = 0; i < $items.length; i++) {
	var shortest = Math.min.apply(null, icicleLengths);

	var spike;
	for (spike = 0; spike < cols; spike++)
		if (icicleLengths[spike] == shortest) break;

	$($items[i]).css({top:shortest, left:spike * COIN_ITEM});
	icicleLengths[spike] = icicleLengths[spike] + $($items[i]).height()  + GAP;
};

$(stream).height(Math.max.apply(null, icicleLengths));
// END ..

$('#sidebar').height($('#content').height());
console.log("viewportWidth: " + viewportWidth);
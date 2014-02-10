/**
 * Nov 28th, 2013
 */
var FANNABY = (function(api, $){

	api.iciclize = function(itemWidth, gap, maxCols, containerTag, centerStreamTag, sidebarWidth){
		// START iciclize ..
		var ITEM_WIDTH = itemWidth, GAP = gap,  SIDEBAR_WIDTH = sidebarWidth || 0, MAX_COLS_PER_PAGE = maxCols, 
			respBox = containerTag, stream = centerStreamTag;

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

			$($items[i]).css({top:shortest, left:spike * COIN_ITEM, width:ITEM_WIDTH});
			icicleLengths[spike] = icicleLengths[spike] + $($items[i]).height()  + GAP;
		};

		$(stream).height(Math.max.apply(null, icicleLengths));
		// END iciclize ..
	};

	api.centerImage = function(imgWrapper, buffer) {
		$(imgWrapper).each(function(){
			var outW = $(this).width();
			var outH = $(this).height();
			console.log("IMG: " + outW + " " + outH);
			var hor = outW - buffer * 2;
			var ver = outH - buffer * 2;
			console.log("BUF: " + hor + " " + ver);
			//console.log('IO:' + $(this).children('img')[0].width);
			$img = $(this).children('img')[0];
			var ratio = $img.width / $img.height;
			if (ratio > 1) 
				$($img).css({width:hor, marginLeft:buffer, marginTop:(outH-$img.height)/2});
			else
				$($img).css({height:ver, marginLeft:(outW-$img.width)/2, marginTop:buffer});
		});
	};

	return api;
}(FANNABY || {}, jQuery));

FANNABY.iciclize(238, 20, 5, '#content', '#deal-list', 250);
FANNABY.iciclize(200, 20, 5, '#content', '#program-list', 250);

FANNABY.centerImage('#program-list > .item-wrapper > .list-item > .item-image', 10)

$('#sidebar').height($('#content').height());
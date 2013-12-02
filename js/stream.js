var PROJC = (function () {
	var projc = {};

	function icicleEffects (itemWidth, gap, sidebarWidth, maxCols, respBox, streamList) {
		var ITEM_WIDTH = itemWidth, GAP = gap,  SIDEBAR_WIDTH = sidebarWidth, 
			MAX_COLS_PER_PAGE = maxCols, RESP_BOX = respBox, STREAM = streamList,
			COIN_ITEM = ITEM_WIDTH + GAP;
		var viewportWidth = $(window).width();
		var contentWidth = viewportWidth - SIDEBAR_WIDTH;
		var cols = Math.floor((contentWidth + GAP) / COIN_ITEM);
		var containerWidth = COIN_ITEM * MAX_COLS_PER_PAGE - GAP;
		if (cols > MAX_COLS_PER_PAGE)
			cols = MAX_COLS_PER_PAGE;
		if (cols < MAX_COLS_PER_PAGE)
			containerWidth = COIN_ITEM * cols - GAP;
		$(RESP_BOX).css("width", contentWidth + "px");
		$(STREAM).css("width", containerWidth + "px");
		var $items = $(STREAM + ' > li');
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
		$(STREAM).height(Math.max.apply(null, icicleLengths));	
	}

	projc.moduleProperty = 1;
	projc.moduleMethod = function () {
		// ...
	};

	return projc;
}());








function icicleEffect (itemWidth, gap, sidebarWidth, maxCols, respBox, streamList) {

	var ITEM_WIDTH = itemWidth, GAP = gap,  SIDEBAR_WIDTH = sidebarWidth, 
		MAX_COLS_PER_PAGE = maxCols, RESP_BOX = respBox, STREAM = streamList,
		COIN_ITEM = ITEM_WIDTH + GAP;

	var viewportWidth = $(window).width();
	var contentWidth = viewportWidth - SIDEBAR_WIDTH;
	var cols = Math.floor((contentWidth + GAP) / COIN_ITEM);
	var containerWidth = COIN_ITEM * MAX_COLS_PER_PAGE - GAP;

	if (cols > MAX_COLS_PER_PAGE)
		cols = MAX_COLS_PER_PAGE;
	if (cols < MAX_COLS_PER_PAGE)
		containerWidth = COIN_ITEM * cols - GAP;

	$(RESP_BOX).css("width", contentWidth + "px");
	$(STREAM).css("width", containerWidth + "px");
	var $items = $(STREAM + ' > li');

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

	$(STREAM).height(Math.max.apply(null, icicleLengths));	
}
var bottoms = [0,0,0,0]; // fixed 4 columns 
function arrange(force_refresh){
		
		var i, c, x, w, h, nh, min, $target, $marker, $first, $img, COL_COUNT, ITEM_WIDTH;

		// $marker = $stream.find('li.page_marker_');

		// if(force_refresh || !$marker.length) {
		// 	force_refresh = true;
		// 	bottoms = [0,0,0,0];
		// 	$target = $stream.children('li');
		// } else {
		// 	$target = $marker.nextAll('li');
		// }

		// if(!$target.length) return;

		// $first = $target.eq(0);
		// $target.eq(-1).addClass('page_marker_');
		// $marker.removeClass('page_marker_');
			
		//ITEM_WIDTH  = parseInt($first.width());
		//COL_COUNT   = Math.floor($stream.width()/ITEM_WIDTH);
		ITEM_WIDTH = 247;
		COL_COUNT = 4;
		
		for(i=0,c=$target.length; i < c; i++){
			min = Math.min.apply(Math, bottoms);			

			for(x=0; x < COL_COUNT; x++) 
				if(bottoms[x] == min) break;

			//$li = $target.eq(i);
			$li = $($target[i]);
			$img = $li.find('.figure.vertical > img');
			if(!(nh = $img.attr('data-calcHeight'))){
				w = +$img.attr('data-width');
				h = +$img.attr('data-height');

				if(w && h) {
					//nh = $img.width()/w * h;
					nh = 231/w * h;
					nh = Math.max(nh,150);
					$img.attr('height', nh)
.data('calcHeight', nh);
				}else{
					nh = $img.height();
				}
			}

			$li.css({top:bottoms[x], left:x*ITEM_WIDTH})
			if(!$li.attr("src")) 
$li.attr('src', $li.attr('data-src'));
			bottoms[x] = bottoms[x] + nh + 20;
		}
		
		$stream.height(Math.max.apply(Math, bottoms));	
		
};

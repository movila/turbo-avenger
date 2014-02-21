/**
 * @date Nov 28th, 2013
 * @author movila
 * @exports utils
 */
define(['jquery'], function($){

    'use strict';

    var Utils = function() {};

    Utils.prototype = {
        version: '1.0.0',

        /**
         * Mock-up of famous Pinterest style layout, responsive under resize (need manual refresh the page)
         * note: each 'pin' is retrieved as '$pinBoard > li'; so use <li> for 'pin' item
         *
         * @param {Number} pinWidth         width of a pin container
         * @param {Number} gap              gap between adjacent pins
         * @param {Number} maxCols          max number of columns in a single row
         * @param {jQuery} $wrapper         jQuery object, e.g. $('#container'), outer container with 'responsive width'
         * @param {jQuery} $pinBoard        jQuery container for all the pins (will be wrapped inside $wrapper)
         * @param {Number:0} sidebarWidth   'fixed width' (default 0) sidebar; adjacent to $wrapper 
         */
        iciclize: function(pinWidth, gap, maxCols, $wrapper, $pinBoard, sidebarWidth) {
            var ITEM_WIDTH = pinWidth, GAP = gap,  SIDEBAR_WIDTH = sidebarWidth || 0, MAX_COLS_PER_PAGE = maxCols;

            var COIN_ITEM = ITEM_WIDTH + GAP;
            var viewportWidth = $(window).width();
            var contentWidth = viewportWidth - SIDEBAR_WIDTH;
            var cols = Math.floor((contentWidth + GAP) / COIN_ITEM);
            var containerWidth = COIN_ITEM * MAX_COLS_PER_PAGE - GAP;

            if (cols > MAX_COLS_PER_PAGE)
                cols = MAX_COLS_PER_PAGE;
            if (cols < MAX_COLS_PER_PAGE)
                containerWidth = COIN_ITEM * cols - GAP;

            $wrapper.css("width", contentWidth + "px");
            $pinBoard.css("width", containerWidth + "px");
            var $items = $pinBoard.children('li');

            var icicleLengths = [];
            for (var x = 0; x < cols; x++)
                icicleLengths[x] = 0;

            for (var i = 0; i < $items.length; i++) {
                /* CSS Reset */
                $($items[i]).css({'position': 'absolute', 'margin': '0!important'});

                var shortest = Math.min.apply(null, icicleLengths);

                var spike;
                for (spike = 0; spike < cols; spike++)
                    if (icicleLengths[spike] == shortest) break;

                $($items[i]).css({top:shortest, left:spike * COIN_ITEM, width:ITEM_WIDTH});
                icicleLengths[spike] = icicleLengths[spike] + $($items[i]).height()  + GAP;
            }

            $pinBoard.height(Math.max.apply(null, icicleLengths));
        }, // END this.iciclize

        /**
         * Mock-up of famous Pinterest style layout, responsive under resize (need manual refresh the page)
         * note: each 'pin' is retrieved as '$pinBoard > li'; so use <li> for 'pin' item
         * warning: if the pin contains a image, make sure there's no other method setting on image before
         *          calling this method.
         *
         * @param {Number} pinWidth         width of a pin container
         * @param {Number} gap              gap between adjacent pins
         * @param {Number} maxCols          max number of columns in a single row
         * @param {jQuery} $pinBoard        jQuery container for all the pins (will be wrapped inside $wrapper)s
         * @param {Number} pinHeight        optional height, default to auto-calculation
         */
        grid: function(pinWidth, gap, maxCols, $pinBoard, pinHeight) {
            var ITEM_WIDTH = pinWidth, GAP = gap, MAX_COLS_PER_PAGE = maxCols;
            var COIN_ITEM = ITEM_WIDTH + GAP;

            var cols = Math.floor(($pinBoard.width() + GAP) / COIN_ITEM);   // actual cols
            //var containerWidth = COIN_ITEM * MAX_COLS_PER_PAGE - GAP;       // 

            if (cols > MAX_COLS_PER_PAGE)
                cols = MAX_COLS_PER_PAGE;
            //if (cols < MAX_COLS_PER_PAGE)
            
            var containerWidth = COIN_ITEM * cols - GAP;

            $pinBoard.css({"width": containerWidth + "px", "margin-left": "auto", "margin-right": "auto"});

            var $items = $pinBoard.children('li');

            var icicleLengths = [];
            for (var x = 0; x < cols; x++)
                icicleLengths[x] = 0;

            for (var i = 0; i < $items.length; i++) {
                /* CSS Reset */
                $($items[i]).css({'position': 'absolute'});

                var shortest = Math.min.apply(null, icicleLengths);

                var spike;
                for (spike = 0; spike < cols; spike++)
                    if (icicleLengths[spike] == shortest) break;

                $($items[i]).css({top:shortest, left:spike * COIN_ITEM, width:ITEM_WIDTH});
                var ITEM_HEIGHT = pinHeight || $($items[i]).height();
                //console.log(ITEM_HEIGHT);
                icicleLengths[spike] = icicleLengths[spike] + ITEM_HEIGHT + GAP;
            }

            $pinBoard.height(Math.max.apply(null, icicleLengths));
        }, // END this.grid

        /**
         * properly center image inside image wrapper (the size of image and wrapper are irrelevant)
         * warning: using jQuery.load on image; so, for better efficiency and cross-broswer capability, 
         *          please generating proper sized thumbnail on the server-side.
         *
         * @param {jQuery} $imgWrapper  container of the image; list of wrappers is supported
         * @param {Number:0} buffer     optional buffer; the margin between image and wrapper border
         */
        centerImage: function($imgWrapper, buffer) {
            buffer = buffer || 0;
            // buffer is used to further shrink image to fit outter container
            // normally buffer is set 0 for aesthetic reason.
            console.log('\n------------------------ Utils.centerImage Debug ------------------------\n');
            $imgWrapper.each(function(index){

                //console.log($(this).width()); // Debug

                var outW = $(this).width();
                var outH = $(this).height();

                var hor = outW - buffer * 2;
                var ver = outH - buffer * 2;

                $(this).children('img').one('load', function(){ // position after load
                    var imgW = $(this).width();
                    var imgH = $(this).height();
                    console.log('Loaded-' + index + ': \t\t' + imgW + 'x' + imgH);
                    console.log('Container-' + index + ': \t' + hor + 'x' + ver);

                    var imgRatio = imgW / imgH;
                    var boxRatio = hor / ver;

                    var $img = this; // 'this' context is save in $img

                    var verticleAlign = function(){
                        var newImgHi = hor * imgH / imgW;
                        console.log('Verticle Align: new-'+newImgHi);
                        $($img).css({width:hor, marginLeft:buffer, marginTop:(outH-newImgHi)/2});
                    };

                    var horizontalAlign = function(){
                        var newImgWi = ver * imgW / imgH;
                        console.log('Horizontal Align: new-'+newImgWi);
                        $($img).css({height:ver, marginLeft:(outW-newImgWi)/2, marginTop:buffer});
                    };

                    if (boxRatio > 1 && imgRatio > 1) // landscape container && landscape image
                        if (boxRatio > imgRatio) // container is wider
                            horizontalAlign();
                        else // image is wider
                            verticleAlign();
                    else if (boxRatio <= 1 && imgRatio <= 1) // portrait container && portrait image
                        if (boxRatio > imgRatio) // image is longer
                            horizontalAlign();
                        else // box is longer
                            verticleAlign();
                    else // container and image have different orientation
                        if (boxRatio > 1)
                            horizontalAlign();
                        else
                            verticleAlign();
                }).each(function() {
                    if(this.complete) $(this).load();
                });
                    
            });
        }, // END this.centerImage

        /**
         * fully strech image inside wrapper (thus may result cut on the appearance); 
         * when mouse hover, full image is shown.
         * warning: using jQuery.load on image; so, for better efficiency and cross-broswer capability, 
         *          please generating proper sized thumbnail on the server-side.
         *
         * @param {jQuery} $imgWrapper     container of the image; list of wrappers is supported
         * @param {Number:0} tolerence     optional tolerence; the size of the cut on image that we can tolerate
         */
        strechImage: function($imgWrapper, tolerence, $hoverTarget) {
            tolerence = tolerence || 0;
            console.log('\n------------------------ Utils.strechImage Debug ------------------------\n');
            $imgWrapper.each(function() {
                // get and set image conainter property
                var outW = $(this).width();
                var outH = $(this).height();
                $(this).css('overflow', 'hidden');

                // do animation strech on image
                $(this).children('img').one('load', {$ht: $hoverTarget}, function(event){ // animate image after load
                    var $img = $(this);
                    $img.attr("width", outW); // fix image width
                    //console.log(event.data.$ht); //debug

                    var $hoverTarget = event.data.$ht || $(this);
                    
                    var imgHeight = $(this).height();
                    // longer than container
                    if(imgHeight > outH) {              
                        var vDiff = imgHeight - outH;
                        if(vDiff > tolerence)
                            $hoverTarget.hover(
                                function(){
                                    $(this).animate({marginTop:"-" + vDiff + "px"}, 350);
                                },
                                function(){
                                    $(this).animate({marginTop: 0}, 250);
                                }
                            );
                    }
                    // shorter than container
                    if(imgHeight < outH) { 
                        $(this).removeAttr("width");
                        $(this).attr("height", outH + "px");
                        var hDiff = $(this).width() - outW;
                        
                        if(hDiff > tolerence)
                            $hoverTarget.hover(
                                function(){
                                    $img.animate({marginLeft:"-" + hDiff + "px"}, 350);
                                },
                                function(){
                                    $img.animate({marginLeft: 0}, 250);
                                }
                            );
                    }
                    
                }).each(function() {
                    if (this.complete) $(this).load(); // image is cached, trigger load anyway
                });

            });
        }, // END this.strechImage


    };


    return new Utils();
});
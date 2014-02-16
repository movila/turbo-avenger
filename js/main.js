'use strict';

require.config({

	paths: {
		jquery: 'libs/jquery/jquery-1.11.0.min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		backboneLocalstorage: 'libs/backbone/plugins/backbone.localStorage-min',
		easing: 'libs/jquery/plugins/jquery.easing.1.3',
		utils: 'app/utils',
		fannaby: 'app/fannaby'
	},

	shim: {
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		easing: ['jquery'],
	}

});

require([
	'jquery', 
	'underscore', 
	'backbone', 
	'utils', 
	'fannaby'
], function(
	$, 
	_, 
	Backbone,
	Utils
){

	console.log( '\n\n--------------------- Main (Require JS) DEBUG ----------------------\n' );
	console.log( 'jQuery ' + $.fn.jquery );
	console.log( 'Underscore ' + _.VERSION );
	console.log( 'Backbone ' + Backbone.VERSION );

	Utils.centerImage($('#program-list .program-icon'), 10);
	Utils.strechImage($('#user .user-icon'), 3, $('#user'));

});
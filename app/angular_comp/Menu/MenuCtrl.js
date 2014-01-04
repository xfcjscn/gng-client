'use strict';
/* jshint unused:false */
function MenuCtrl() {
	require(['jquery'], function($) {
		$("ul li").click(function() {
			$("ul .active").removeClass("active");
			$(this).addClass("active");
		});
	});

}
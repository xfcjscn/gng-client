'use strict';
function GPlatformCtrl($scope) {
	require(['jquery', 'infra-client/app/scripts/models/server','infra-client/app/scripts/models/postload'], function($, server,postload) {
        $scope.$on('$viewContentLoaded', function() {
			postload.callBack();
	        $('.swiper-container').swiper({
		        //freeMode:true
	        });
		});
		$scope.$on('$includeContentLoaded', function() {
			postload.callBack();
			$('.swiper-container').swiper({
				//freeMode:true
			});
		});

		server.config.serverURL = 'http://localhost:8080/gng-server-1.0';
		//server.config.serverURL = 'http://server.gplatform.net/gng-server-1.0';

        //User server in template directly
        $scope.server = server;
	});
}
GPlatformCtrl.$inject = [ '$scope' ];
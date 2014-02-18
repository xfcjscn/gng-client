'use strict';
function GPlatformCtrl($scope) {
	require(['jquery', 'infra-client/app/scripts/models/server','infra-client/app/scripts/models/postload'], function($, server,postload) {
        $scope.$on('$viewContentLoaded', function() {
			postload.callBack();
		});
		$scope.$on('$includeContentLoaded', function() {
			postload.callBack();
		});

        //User server in template directly
        $scope.server = server;
	});
}
GPlatformCtrl.$inject = [ '$scope' ];
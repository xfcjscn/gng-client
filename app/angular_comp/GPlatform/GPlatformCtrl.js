'use strict';
function GPlatformCtrl($scope) {
	require(['jquery', 'client-infra/app/scripts/models/server','client-infra/app/scripts/models/postload'], function($, server,postload) {
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
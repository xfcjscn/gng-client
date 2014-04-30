'use strict';
function LoginFormCtrl($scope, $rootScope) {
	require([ 'sudoor-client/app/scripts/models/server' ], function(gplatformServer) {
		$scope.formData = {};
		$scope.status = '';
		$scope.loginSubmit = function() {
			var promise = gplatformServer.login($scope.formData);
			promise.then(function() {
				$rootScope.isLogin = true;
				$rootScope.$digest();
			}, function() {
				$scope.status = 'FAILURE';
				$scope.$digest();
			});
		};
	});
}
LoginFormCtrl.$inject = [ '$scope', '$rootScope' ];
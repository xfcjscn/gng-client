'use strict';
function AccountInfoCtrl($scope, $rootScope) {
	require([ 'sudoor-client/app/scripts/models/server' ], function(server) {
		$scope.logout = function() {
			server.logout().then(function() {
				$rootScope.isLogin = false;
				$rootScope.$digest();
			});
		};
	});
}
AccountInfoCtrl.$inject = [ '$scope', '$rootScope' ];
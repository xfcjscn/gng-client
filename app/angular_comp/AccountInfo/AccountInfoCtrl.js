'use strict';
function AccountInfoCtrl($scope, $http) {
	$scope.logout = function() {
		server.logout().then(function() {
			$scope.$apply();
		});
	};
}
AccountInfoCtrl.$inject = [ '$scope', '$http' ];
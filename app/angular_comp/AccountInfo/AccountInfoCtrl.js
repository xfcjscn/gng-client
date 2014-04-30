'use strict';
function AccountInfoCtrl($scope, $http) {

	$scope.logout = function() {
		require(['sudoor-client/app/scripts/models/server'], function(server){
			var promise = server.logout();

			promise.then(function(data) {
				$scope.$apply();
			});
		});

	};
}
AccountInfoCtrl.$inject = [ '$scope', '$http' ];
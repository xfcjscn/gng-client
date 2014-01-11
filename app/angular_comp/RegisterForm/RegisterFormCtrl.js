'use strict';
function RegisterFormCtrl($scope) {
	require(['client-infra/app/scripts/models/server'], function (gplatformServer) {
		$scope.formData = {
			Enabled: true,
			CredentialAuthorityDetails: {Authority: 'ROLE_CUSTOMER'}
		};
		$scope.status = '';

		$scope.registerSubmit = function () {
			gplatformServer.getDb().then(function (instance) {
				$scope.formData.CredentialAuthorityDetails.Username = $scope.formData.Username;
				instance.CredentialUsers.add($scope.formData);
				var deferredUsers = instance.saveChanges();
				deferredUsers.then(function () {
					$scope.status = 'Completed';
				}, function () {
					$scope.status = 'FAILURE';
				});
			});
		};
	});
}
RegisterFormCtrl.$inject = [ '$scope' ];
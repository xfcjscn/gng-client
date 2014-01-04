'use strict';
function RegisterFormCtrl($scope) {
    require(['client-infra/app/scripts/models/server'], function (gplatformServer) {
        $scope.formData = {
            enabled: true,
            authority: 'ROLE_CUSTOMER'
        };
        $scope.status = '';

        $scope.registerSubmit = function() {
            gplatformServer.getDb().then(function(instance) {
                instance.CredentialUser.add($scope.formData);
                instance.CredentialAuthority.add($scope.formData);
                var deferredUsers = instance.saveChanges();
                deferredUsers.then(function() {
                    $scope.status = 'Completed';
                }, function() {
                    $scope.status = 'FAILURE';
                });
            });
        };
    });
}
RegisterFormCtrl.$inject = [ '$scope' ];
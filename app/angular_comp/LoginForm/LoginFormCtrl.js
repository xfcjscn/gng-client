'use strict';
function LoginFormCtrl($scope) {
    require(['sudoor-client/app/scripts/models/server'], function (gplatformServer) {
        $scope.formData = {};
        $scope.status = '';
        $scope.loginSubmit = function () {
            var promise = gplatformServer.login($scope.formData);
            promise.then(function () {
                $scope.$apply(
                    function () {
                        $scope.status = 'SUCCESS';
                    }
                );
            }, function () {
                $scope.$apply(
                    function () {
                        $scope.status = 'FAILURE';
                    }
                );
            });
        };
    });
}
LoginFormCtrl.$inject = [ '$scope' ];
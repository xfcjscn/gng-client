'use strict';
function AddItemCtrl($scope) {
	$scope.status = 'NotStarted';
	$scope.item = {
		Name: '',
		Desc: '',
		//Below fields is calculated
		ImageDetails: [],
		Owner: {Name: $scope.server.getSession().inspect().value.user.name}
	};
	$scope.addItemFormSubmit = function () {
		$('#uploader').plupload('start');
	};
	$scope.addMore = function () {
		$scope.status = 'NotStarted';
	};
	// Save data, when upload completed
	$scope.$on('FileUploadCompleted', function () {
		// Here this will be executed in sync mode, since service should already OK at this point
		require(['infra-client/app/scripts/models/server'], function (gplatformServer) {
			gplatformServer.getDb().then(function (instance) {
//				for(var idx in $scope.item.Images){
//					var image = $scope.item.Images[idx];
//					instance.sequenceAdd(instance.Images, image);
//				}
				instance.Items.add( $scope.item);
				var deferred = instance.Items.saveChanges();
//				var deferred = instance.sequenceAdd(instance.Items, $scope.item);
				deferred.then(function () {
					$scope.status = 'Completed';
				});
			});
		});
	});

	// Calculate images, when image uploaded
	$scope.$on('uploaded', function (event, args) {
		require(['infra-client/app/scripts/models/server'], function (server) {
			var info = angular.fromJson(args.response.response);
			info.Path = info.uri;
			$scope.item.ImageDetails.push(info);
		});
	});

}
AddItemCtrl.$inject = [ '$scope' ];
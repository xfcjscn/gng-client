'use strict';
function AddItemCtrl($scope) {
	require(['sudoor-client/app/scripts/models/server'], function (server) {
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
			server.getDb().then(function (instance) {
				instance.Items.add($scope.item);
				var deferred = instance.Items.saveChanges();
				deferred.then(function () {
					$scope.status = 'Completed';
				});
			});
		});

		// Calculate images, when image uploaded
		$scope.$on('uploaded', function (event, args) {
			var info = angular.fromJson(args.response.response);
			info.Path = info.uri;
			//info.ItemDetails = $scope.item;
			$scope.item.ImageDetails.push(info);

//			server.getDb().then(function (instance) {
//				instance.Images.add(info);
//				var deferred = instance.saveChanges();
//			});
		});
	});
}
AddItemCtrl.$inject = [ '$scope' ];
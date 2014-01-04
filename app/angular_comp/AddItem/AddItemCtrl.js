'use strict';
function AddItemCtrl($scope) {
	$scope.status = 'NotStarted';
	$scope.item = {
		name: '',
		desc: '',
		// Below fields is calculated
		// images : [],
		images: '',
		owner: $scope.server.getSession().inspect().value.user.name
	};
	$scope.addItemFormSubmit = function() {
		$('#uploader').plupload('start');
	};
	$scope.addMore = function() {
		$scope.status = 'NotStarted';
	};
	// Save data, when upload completed
	$scope.$on('FileUploadCompleted', function() {
		// Here this will be executed in sync mode, since service should already OK at this point
		require(['client-infra/app/scripts/models/server'], function(gplatformServer) {
			gplatformServer.getDb().then(function(instance) {
				instance.Item.add($scope.item);
				var deferred = instance.saveChanges();
				deferred.then(function() {
					$scope.status = 'Completed';
				});
			});
		});
	});

	// Calculate images, when image uploaded
	$scope.$on('uploaded', function(event, args) {
		require(['client-infra/app/scripts/models/server'], function(server) {
			var info = angular.fromJson(args.response.response);
			var path = server.config.serverURL + server.config.odataURI + '/' + info;
			var imgObj = {
				'name': path,
				'path': path
			};
			$scope.item.images = imgObj.path;
		});
	});

}
AddItemCtrl.$inject = [ '$scope' ];
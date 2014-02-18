'use strict';
function ShowcaseCtrl($scope) {
	require(['infra-client/app/scripts/models/server', 'gng-client/app/scripts/models/server-gng'], function (gplatformServer, gngServer) {
		simpleCart({
			checkout: {
				type: "SendForm",
				url: "http://example.com/your/custom/checkout/url"
			},
			cartColumns: [
				{ attr: "id", label: "ID" } ,
				{ attr: "name", label: "Name" } ,
				{ view: "remove", label: "Remove"}
			],
			cartStyle: "table"
		});

		$scope.query = '';
		$scope.layout = 'grid';
		$scope.items = [];
		$scope.selectedItem = null;
		$scope.bufferSize = 20;

		$scope._currentItemSet = null;
		$scope._onLoading = false;

		$scope.loadMoreItems = function () {
			if ($scope._onLoading == true) {
				return;
			}
			$scope._onLoading = true;
			if ($scope._currentItemSet == null) {

				gplatformServer.getDb().then(function (instance) {
					var itemPromise = instance.Items.take($scope.bufferSize).toArray();
					itemPromise.then(function (result) {
						//This result is an enhanced array
						$scope.$apply(function () {
							$scope._currentItemSet = result;
							_.each(result, function (it) {
								it.firstImage = it.ImageDetails;
								it.get_ImageDetails(function(res){
									console.log("IMage Details: "+ res);
								});
								$scope.items.push(it);
							});
							$scope._onLoading = false;
						});
					});
				});

			} else {
				if ($scope._currentItemSet.length == $scope.bufferSize) {
					var nextItemsPromise = $scope._currentItemSet.next();
					nextItemsPromise.then(function (result) {
						//This result is an enhanced array
						$scope.$apply(function () {
							$scope._currentItemSet = result;
							_.each(result, function (it) {
								$scope.items.push(it);
							});
							$scope._onLoading = false;
						});
					});
				}
			}
		}

		$scope.selectItem = function (item) {
			$scope.selectedItem = item;

			var ah = null;

			if (gplatformServer.isLogin()) {
				ah = {owner: gplatformServer.getSession().inspect().value.user.name,
					action: 'view',
					target: item.id
				};
				gplatformServer.getDb().then(function (instance) {
					instance.ActionHistory.add(ah);
					instance.saveChanges();
				});

			} else {
				ah = {
					id: new Date().getTime(),
					owner: 'UNKNOW',
					action: 'view',
					target: item.id
				};
				gplatformServer.getDb().cache.then(function (cache) {
					cache.ActionHistory.add(ah);
					cache.saveChanges();
				});

			}
		}

		$scope.deleteItem = function (item) {
			gplatformServer.getDb().then(function (instance) {
				instance.remove(item);
				instance.saveChanges();
			});
		}

		$scope.attachItem = function (item) {
			gplatformServer.getDb().then(function (instance) {
				instance.attachOrGet(item);
			});
		}

		$scope.saveChanges = function () {
			gplatformServer.getDb().then(function (instance) {
				instance.saveChanges();
			});
		}

		$scope.showMyStuffes = function () {
			$scope.query = gplatformServer.getSession().inspect().value.user.name;
		}

		$scope.showAllStuffes = function () {
			$scope.query = '';
		}

		$scope.isEditable = function (item) {
			if (gplatformServer.isLogin()) {
				if (item.owner == gplatformServer.getSession().inspect().value.user.name) {
					return true;
				}
			}
			return false;
		}
	});


}
ShowcaseCtrl.$inject = [ '$scope' ];
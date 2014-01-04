'use strict';
function SettingCtrl($scope, $translate) {
	$scope.language = $translate.uses();
	
	
	function changeLanguage(newlang, oldlang) {
		$translate.uses(newlang);
	}
	
	$scope.$watch('language', function(newVal, oldVal) {
		changeLanguage(newVal, oldVal);
	});
}
SettingCtrl.$inject = [ '$scope', '$translate' ];
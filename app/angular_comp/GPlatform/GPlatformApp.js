'use strict';
require(['jquery', 'infra-client/app/scripts/models/angular', 'infra-client/app/scripts/models/infra', 'css!infra-client/app/styles/infra'], function ($, angular) {
	var gplatformApp = angular.module('GPlatform', [ 'ngRoute', 'ngResource', 'ngAnimate', 'chieffancypants.loadingBar',
		'http-auth-interceptor', 'infinite-scroll', 'pascalprecht.translate', 'xeditable', 'ngAnimate-animate.css' ]);

	var configObj = function ($routeProvider, $translateProvider) {
		//Config Router
		$routeProvider.when('/Home', {
			templateUrl: 'angular_comp/Home/Home.html'
		}).when('/Showcase', {
					templateUrl: 'angular_comp/Showcase/Showcase.html'
				}).when('/Account', {
					templateUrl: 'angular_comp/Account/Account.html'
				}).when('/AddItem', {
					templateUrl: 'angular_comp/AddItem/AddItem.html'
				}).when('/Setting', {
					templateUrl: 'angular_comp/Setting/Setting.html'
				}).when('/RegisterForm', {
					templateUrl: 'angular_comp/RegisterForm/RegisterForm.html'
				}).otherwise({
					redirectTo: '/Home'
				});

		//Config Translate
		$translateProvider.useStaticFilesLoader({
			prefix: 'angular_comp/languages/',
			suffix: '.json'
		});
		$translateProvider.preferredLanguage('zh');
	};
	configObj.$inject = [ '$routeProvider', '$translateProvider' ];
	gplatformApp.config(configObj);


	var runObj = function (editableOptions) {
		editableOptions.theme = 'bs3';
	};
	runObj.$inject = [ 'editableOptions' ];
	gplatformApp.run(runObj);
	$(
			function () {
				angular.bootstrap($(document), ['GPlatform']);
			}
	);

});


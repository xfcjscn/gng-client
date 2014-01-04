'use strict';
require(['jquery', 'client-infra/app/scripts/models/angular', 'client-infra/app/scripts/models/infra', 'css!client-infra/app/styles/infra'], function ($, angular) {
	var gplatformApp = angular.module('GPlatform', [ 'ngRoute', 'ngResource', 'ngAnimate', 'chieffancypants.loadingBar',
		'http-auth-interceptor', 'infinite-scroll', 'pascalprecht.translate', 'xeditable', 'ngAnimate-animate.css' ]);

	var configObj = function ($routeProvider, $translateProvider) {
		//Config Router
		$routeProvider.when('/Home', {
			templateUrl: '../Home/Home.html'
		}).when('/Showcase', {
					templateUrl: '../Showcase/Showcase.html'
				}).when('/Account', {
					templateUrl: '../Account/Account.html'
				}).when('/AddItem', {
					templateUrl: '../AddItem/AddItem.html'
				}).when('/Setting', {
					templateUrl: '../Setting/Setting.html'
				}).when('/RegisterForm', {
					templateUrl: '../RegisterForm/RegisterForm.html'
				}).otherwise({
					redirectTo: '/Home'
				});

		//Config Translate
		$translateProvider.useStaticFilesLoader({
			prefix: '/angular_comp/languages/',
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


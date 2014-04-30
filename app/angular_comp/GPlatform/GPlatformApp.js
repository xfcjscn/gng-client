'use strict';
require([ 'jquery', 'angular/angular', 'angular-route/angular-route', 'angular-resource/angular-resource', 'angular-animate/angular-animate',
        'angular-loading-bar/src/loading-bar', 'angular-http-auth/src/http-auth-interceptor', 'nginfinitescroll/build/ng-infinite-scroll',
        'angular-translate/angular-translate', 'angular-translate-loader-static-files/angular-translate-loader-static-files',
        'angular-xeditable/dist/js/xeditable', 'ngAnimate-animate.css/animate', 'sudoor-client/app/scripts/models/angular-requirejs',
        'blockui/jquery.blockUI', 'swiper/dist/idangerous.swiper', 'sudoor-client/app/scripts/models/validator', 'css!normalize-css/normalize',
        'css!font-awesome/css/font-awesome', 'css!animate.css/animate', 'css!sudoor-client/app/styles/infra', 'swipe/swipe',
        'bootstrap/dist/js/bootstrap', 'underscore/underscore', 'underscore.string', 'modernizr/modernizr', 'simplecart-js/simpleCart',
        'css!sudoor-client/app/styles/infra', 'css!gng-client/app/styles/gplatform' ], function($) {
	var gplatformApp = angular.module('GPlatform', [ 'ngRoute', 'ngResource', 'ngAnimate', 'chieffancypants.loadingBar', 'http-auth-interceptor',
	        'infinite-scroll', 'pascalprecht.translate', 'xeditable', 'ngAnimate-animate.css', 'angular-requirejs' ]);

	var configObj = function($routeProvider, $translateProvider) {
		// Config Router
		$routeProvider.when('/Home', {
			templateUrl : 'angular_comp/Home/Home.html'
		}).when('/Showcase', {
			templateUrl : 'angular_comp/Showcase/Showcase.html'
		}).when('/Account', {
			templateUrl : 'angular_comp/Account/Account.html'
		}).when('/AddItem', {
			templateUrl : 'angular_comp/AddItem/AddItem.html'
		}).when('/Setting', {
			templateUrl : 'angular_comp/Setting/Setting.html'
		}).when('/RegisterForm', {
			templateUrl : 'angular_comp/RegisterForm/RegisterForm.html'
		}).otherwise({
			redirectTo : '/Home'
		});

		// Config Translate
		$translateProvider.useStaticFilesLoader({
		    prefix : 'angular_comp/languages/',
		    suffix : '.json'
		});
		$translateProvider.preferredLanguage('zh');
	};
	configObj.$inject = [ '$routeProvider', '$translateProvider' ];
	gplatformApp.config(configObj);

	var runObj = function(editableOptions) {
		editableOptions.theme = 'bs3';
	};
	runObj.$inject = [ 'editableOptions' ];
	gplatformApp.run(runObj);
	$(function() {
		angular.bootstrap($(document), [ 'GPlatform' ]);
	});

});

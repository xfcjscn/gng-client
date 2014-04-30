'use strict';
function UploaderCtrl($scope) {

	require(['sudoor-client/app/scripts/models/server','plupload/js/i18n/zh_CN'], function(gplatformServer){
		// There suppose to be NO view code in controller, this is a temp solution,
		// should move to directive in future
		$('#uploader').plupload({
			// General settings
			runtimes : 'html5,flash,silverlight,html4',

			url : gplatformServer.config.serverURL + gplatformServer.config.fileUploadURL,
			// chunk_size : '1mb',

			prevent_duplicates : true,

			// Resize images on clientside if we can
			resize : {
				width : 600,
				height : 800,
				quality : 70,
				crop : false
			},

			filters : {
				// Maximum file size
				max_file_size : '1000mb',
				// Specify what files to browse for
				mime_types : [ {
					title : "Image files",
					extensions : "jpg,gif,png"
				} ]
			},

			rename : true,

			sortable : true,

			buttons : {
				start : false,
				stop : false
			},

			dragdrop : true,

			views : {
				list : true,
				thumbs : true, // Show thumbs
				active : 'thumbs'
			},

			// Flash settings
			flash_swf_url : 'bower_components/plupload/js/Moxie.swf',

			// Silverlight settings
			silverlight_xap_url : 'bower_components/plupload/js/Moxie.xap'
		});

		// Emit FileUploaded
		var up = $('#uploader').plupload('getUploader');
		up.bind('FileUploaded', function(uploader, file, res) {
			$scope.$emit('uploaded', {
				'uploader' : uploader,
				'file' : file,
				'response' : res
			});
		});

		// Emit complete
		$('#uploader').on('complete', function() {
			$scope.$emit('FileUploadCompleted');
		});
	});
}
UploaderCtrl.$inject = [ '$scope'];
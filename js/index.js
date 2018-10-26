window.onload = function(){
	console.log("*******************************");
	console.log("*** -- Feature Loader v1 -- ***");
	console.log("*******************************");

	// If necessary, make sure any required libraries/polyfills are downloaded.
	featureDetection.initial_windowOnload(
		function(){
			// Do the rest of the application setup here.
			console.log("FEATURE DETECTION: FINISHED");
			console.log("******************************************\n");

			// READY TO CONTINUE!
			//

		} );

};

var featureDetection = {
	reqs : {
		// Libraries:
		//  Enables .zip file creation.
		//  Enables file download from browser.
		//  Enables string hashing.

		// Each test is performed with a try/catch block.
		// A failed test needs to make the try fail and throw an error to be caught by the catch.
		// If the test fails and the catch activates then the url will be used to load a file containing the missing functionality.

		// Promise support.
		  'Promise'       : { 'type':'library', 'req': true, 'have':null, 'url':['js/libs/bluebird.min.js']          , 'test':'Promise;'                                              }

		// Polyfills:
		, 'repeat'        : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/repeat.js']          , 'test': '"abc".repeat(2);'                                     }
		, 'padStart_End'  : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/padEnd_padStart.js'] , 'test': '"test".padEnd(20, "*"); "test".padStart(20, "*");'    }
		, 'closest'       : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/closest.js']         , 'test': 'document.body.closest("html");'                       }
		, 'findIndex'     : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/findIndex.js']       , 'test': '[0, 1, 2, ].findIndex( function(e){ return e > 1; });'}
		, 'isNaN'         : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/isNaN.js']           , 'test': 'isNaN;'                                               }
		, 'Object.assign' : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/Object.assign.js']   , 'test': 'Object.assign;'                                       }
		, 'forEach'       : { 'type':'polyfill', 'req': true, 'have':null, 'url':['js/polyfills/forEach.js']         , 'test': 'Array.prototype.forEach;'                             }

		// Libraries:
		, 'JSZip'         : { 'type':'library', 'req':false, 'have':null, 'url':['js/libs/jszip.min.js']             , 'test': 'JSZip;'                                               }
		, 'saveAs'        : { 'type':'library', 'req':false, 'have':null, 'url':['js/libs/FileSaver.min.js']         , 'test': 'saveAs;'                                              }
		, 'sha512'        : { 'type':'library', 'req':false, 'have':null, 'url':['js/libs/sha512.js']                , 'test': 'hex_sha512;'                                          }

	}

	// Loads an individual feature.
	, loadFeature : function(feature){
		// Make sure that Promises are supported first!
		return new Promise(function(resolve, reject) {
			var keys = Object.keys(featureDetection.reqs);

			// Is the requested feature one that is known to us?
			if( keys.indexOf(feature) == -1 ){
				console.log("  -- Feature unavailable:", feature);
				return;
			}

			// Is this one already loaded?
			if( featureDetection.reqs[feature].have==true){
				// console.log("  -- This feature is already loaded:", feature);
				return;
			}

			var type = featureDetection.reqs[feature].type;

			// Get the feature.
			var js = document.createElement('script');
			js.onload = function(){
				featureDetection.reqs[feature].have=true;
				console.log("  LOADED: ("+type+") ->" , feature ,  " ");
				resolve();
			};

			document.body.appendChild(js);
			js.src = featureDetection.reqs[ feature ].url[0];
		});
	}

	// Load the initial feature detection and loading.
	, initial_windowOnload : function(callback){
		console.log("FEATURE DETECTION: START");

		// Array for the missing requirements keys.
		var missingReqs = [];

		// Do the test for each required library. Set the have flag.
		for(var k in featureDetection.reqs){
			try{
				eval(featureDetection.reqs[k].test);
				featureDetection.reqs[k].have=true;
			}
			catch(e){
				featureDetection.reqs[k].have=false;
				if(featureDetection.reqs[k].req==true){
					if(k !='Promise'){
						missingReqs.push(k);
					}
				}
				else{
					// Library is not core to the application. Can be skipped for now.
					// Will need to check for it again later if it is actually needed.
					//
				}
			}
		}

		// Need to check for 'Promise' first since the rest of this test requires Promise support.
		try{
			Promise;
			featureDetection.reqs.Promise.have=true;
			finishFeatureDetection();
		}
		catch(e){
			// console.log("No promise support. Downloading bluebird.js...");
			var js = document.createElement('script');

			js.onload = function(){
				console.log("  LOADED: (library) -> Promise (library)");
				featureDetection.reqs['Promise'].have=true;
				finishFeatureDetection();
			};

			document.body.appendChild(js);
			// js.src = 'js/libs/bluebird.min.js';
			js.src = featureDetection.reqs[ 'Promise' ].url[0];
		}

		// We have a list now of what is missing. Download whatever is missing.
		function finishFeatureDetection(){
			var fileIndex=0;

			// Download features if some are missing.
			if(missingReqs.length){
				var recursive = function(){
					// Is this the last file?
					if(fileIndex == missingReqs.length){
						// console.log("Finished!");

						callback();

						return;
					}
					var key = missingReqs[fileIndex];

					featureDetection.loadFeature( key ).then(
						function(){
							// Increment the file index.
							fileIndex++;

							// Start the next download process.
							setTimeout(function(){
								recursive();
							}, 1);
						}
						, function(error){ console.log("ERROR:", error); }
					);

				};

				// Start the first download.
				recursive();

			}
			else{
				callback();
			}
		}

	}

	// EXAMPLE USAGE:
	/*
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
	*/
};
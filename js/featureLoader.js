var featureDetection = {
	reqs : {
		// Libraries:
		//  Enables .zip file creation.
		//  Enables file download from browser.
		//  Enables string hashing.

		// Each test is performed with a try/catch block.
		// A failed test needs to make the try fail and throw an error to be caught by the catch.
		// A passed test needs to return something truth-y.
		// If the test fails and the catch activates then the url will be used to load a file containing the missing functionality.

		// Promise support (library):
		'Promise'            : {
			  'type' : 'library'
			, 'text' : "Bluebird Promise Library. Supports IE9+"
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/libs/bluebird.min.js']
			, 'test' : 'Promise;'
			, 'website' : 'https://github.com/petkaantonov/bluebird'
		}

		// Libraries:
		, 'JSZip'            : {
			  'type' : 'library'
			, 'text' : "Allows for the creation of a .zip file."
			, 'req'  : false
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/libs/jszip.min.js']
			, 'test' : 'JSZip;'
			, 'website' : 'https://github.com/Stuk/jszip'
		}
		, 'saveAs'           : {
			  'type' : 'library'
			, 'text' : "Allows for downloading of a file that is already in browser memory."
			, 'req'  : false
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/libs/FileSaver.min.js']
			, 'test' : 'saveAs;'
			, 'website' : 'https://github.com/eligrey/FileSaver.js/'
		}
		, 'sha512'           : {
			  'type' : 'library'
			, 'text' : "Hashing library that can be used for hashing passwords."
			, 'req'  : false
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/libs/sha512.js']
			, 'test' : 'hex_sha512;'
			, 'website' : 'http://pajhome.org.uk/crypt/md5'
		}

		// Polyfills:
		, 'repeat'           : {
			  'type' : 'polyfill'
			, 'text' : "Required for .padEnd and .padStart. The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/repeat.js']
			, 'test' : '"abc".repeat(2);'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat'
		}
		, 'padStart'     : {
			  'type' : 'polyfill'
			, 'text' : "The padStart() method pads the current string with another string (multiple times, if needed)"
			, 'req'  :  true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/padStart.js']
			, 'test' :  '"test".padStart(20, "*");'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart'
		}
		, 'padEnd'     : {
			  'type' : 'polyfill'
			, 'text' : "The padEnd() method pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length."
			, 'req'  :  true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/padEnd.js']
			, 'test' :  '"test".padEnd(20, "*");'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd'
		}
		, 'closest'          : {
			  'type' : 'polyfill'
			, 'text' : "The Element.closest() method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there isn't such an ancestor, it returns null."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/closest.js']
			, 'test' : 'document.body.closest("html");'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/API/Element/closest'
		}
		, 'findIndex'        : {
			  'type' : 'polyfill'
			, 'text' : "The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating no element passed the test."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/findIndex.js']
			, 'test' : '[0, 1, 2, ].findIndex( function(e){ return e > 1; });'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex'
		}
		// , 'isNaN'            : {
		// 	  'type' : 'polyfill'
		// 	, 'text' : "The original, global isNaN(). Checks if a value is a number."
		// 	, 'req'  : true
		// 	, 'have' : null
		// 	, 'hadNatively' : null
		// 	, 'url'  : ['js/polyfills/isNaN.js']
		// 	, 'test' : 'isNaN;'
		// 	, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN'
		// }
		, 'Number.isNaN'            : {
			  'type' : 'polyfill'
			, 'text' : "The Number.isNaN() method determines whether the passed value is NaN and its type is Number. It is a more robust version of the original, global isNaN()."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/isNaN.js']
			, 'test' : 'Number.isNaN;'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN'
		}
		, 'Object.assign'    : {
			  'type' : 'polyfill'
			, 'text' : "The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/Object.assign.js']
			, 'test' : 'Object.assign;'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign'
		}
		, 'forEach_array'    : {
			  'type' : 'polyfill'
			, 'text' : "Covers array."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/forEach.js']
			, 'test' : 'Array.prototype.forEach ; NodeList.prototype.forEach ;'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach'
		}
		, 'forEach_nodeList'    : {
			  'type' : 'polyfill'
			, 'text' : "Covers nodeList."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/forEach.js']
			, 'test' : 'Array.prototype.forEach ; NodeList.prototype.forEach ;'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach'
		}
		, 'smoothScroll'     : {
			  'type' : 'polyfill'
			, 'text' : "Allows for {behavior:smooth} scrolling."
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/smoothscroll.min.js']
			, 'test' : 'if("scrollBehavior" in document.documentElement.style===false){throw "MISSING";} else{true;}'
			, 'website' : 'https://github.com/iamdustan/smoothscroll'
		}
		, 'CustomEvent'      : {
			  'type' : 'polyfill'
			, 'text' : "Normalizes CustomEvent which is different in IE"
			, 'req'  : true
			, 'have' : null
			, 'hadNatively' : null
			, 'url'  : ['js/polyfills/CustomEvent.js']
			, 'test' : 'if(typeof window.CustomEvent !== "function") { throw "MISSING"; } else{true;}'
			, 'website' : 'https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent'
		}

	}

	// Loads an individual feature.
	, loadFeature : function(feature){
		// Make sure that Promises are supported first!
		return new Promise(function(resolve, reject) {
			var keys = Object.keys(featureDetection.reqs);

			// Is the requested feature one that is known to us?
			if( keys.indexOf(feature) == -1 ){
				console.log("  -- Feature unavailable:", feature);
				resolve('');
				return;
			}

			// Is this one already loaded?
			if( featureDetection.reqs[feature].have==true){
				// console.log("  -- This feature is already loaded:", feature);
				resolve('');
				return;
			}

			// var type = featureDetection.reqs[feature].type;

			// Get the feature.
			var js = document.createElement('script');

			js.onload = function(){
				featureDetection.reqs[feature].have=true;
				// console.log("  LOADED: ("+type+") ->" , feature ,  " " );
				resolve(''+feature);
			};

			js.onerror = function(){
				featureDetection.reqs[feature].have=false;
				// console.log("  ERROR: COULD NOT LOAD: ("+type+") ->" , feature ,  " " );
				reject(''+feature);
			};

			document.body.appendChild(js);
			js.src = featureDetection.reqs[ feature ].url[0];
		});
	}

	// Loads multiple features.
	, loadFeatures : function( list ){
		var missingFeatures = [];
		var missingFeatures_index=0;

		// Determine if any feature from the specified list is not yet loaded.
		for(var i=0; i<list.length; i++){
			if( featureDetection.reqs[ list[i] ] .have !== true) { missingFeatures.push( list[i] ); }
		}

		// Create a variable to hold the promise that will be returned.
		var prom1;

		// Are the specified features missing?
		if(missingFeatures.length){
			// Create a promise and load the missing features. Resolve the promise when finished.
			prom1 = new Promise(function(resolve, reject){
				// Define the iterative process.
				var iterative = function(feature){
					featureDetection.loadFeature( feature ).then(function(){
						// Bump up the index.
						missingFeatures_index++;

						// If there are still more to do then run another iteration.
						if(missingFeatures_index < missingFeatures.length){
							iterative(missingFeatures[missingFeatures_index]);
						}
						// Otherwise, resolve the promise.
						else{
							resolve('');
						}
					});

				};

				// Start the first iteration.
				iterative( missingFeatures[missingFeatures_index] );

			});
		}
		else{
			// Create an immediately resolved promise.
			prom1 = new Promise(function(resolve, reject){ resolve(); });
		}

		// Return the promise.
		return prom1;

	}

	// Load the initial feature detection and loading.
	, initial_windowOnload : function(callback){
		console.log("FEATURE DETECTION: START");

		// Array for the missing requirements keys.
		var missingReqs = [];

		// Do the test for each required library. Set the have flag.
		for(var k in featureDetection.reqs){
			try{
				// Test #1
				// console.log("TRY1:", featureDetection.reqs[k].test);
				eval(featureDetection.reqs[k].test);

				// Test #2
				if( eval(featureDetection.reqs[k].test) == undefined){
					// console.log("TRY2:", featureDetection.reqs[k].test, "Feature is not defined.");
					throw "Feature is not defined.";
				}

				// No error? The feature already exists.
				featureDetection.reqs[k].have=true;
				featureDetection.reqs[k].hadNatively=true;
			}
			catch(e){
				// console.log("CATCH:", featureDetection.reqs[k].test, "\n", e);
				featureDetection.reqs[k].have=false;
				if(featureDetection.reqs[k].req==true){
					if(k !='Promise'){
						missingReqs.push(k);
						featureDetection.reqs[k].hadNatively=false;
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
			// console.log("No promise support. Downloading bluebird.js...", e);
			var js = document.createElement('script');

			js.onload = function(){
				console.log("  LOADED: (library)  -> Promise (library)");
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

					// console.log("about to load:", key);

					featureDetection.loadFeature( key ).then(
						function(success){
							console.log("  LOADED: ("+featureDetection.reqs[key].type+") ->" , key ,  " " );
							// Increment the file index.
							fileIndex++;

							// Start the next download process.
							setTimeout(function(){
								recursive();
							}, 1);
						}
						, function(error){
							console.log("ERROR:", error);
							console.log("  ** ERROR: COULD NOT LOAD: ("+featureDetection.reqs[key].type+") ->" , key ,  " " );

							// Increment the file index.
							fileIndex++;

							// Start the next download process.
							setTimeout(function(){
								recursive();
							}, 1);
						}

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
		console.log("********************************");
		console.log("*** -- Feature Loader v1b -- ***");
		console.log("********************************");

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
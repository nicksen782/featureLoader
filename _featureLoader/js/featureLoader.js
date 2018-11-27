// NOTE: "eval" is used here.
// Eval should NOT be used on any code that you do not 100% control.
// All code that will be seen by eval actually comes from a folder within the application.
// The code cannot be changed by a third party unless the server copy is actually updated.

var featureDetection = {
	reqs:{
	},
	config:{
		usePhp         : false ,
		useAsync       : true  ,
		includeText    : false ,
		includeWebsite : false ,
		userReqs  : []
	},
	funcs:{

		evalInContext : function(js, context) {
			// featureDetection.funcs.evalInContext(data, window);
			return function() { eval(js); }.call(context);
		},
		isTheFeatureAlreadyLoaded : function(feature){
			var keys = Object.keys(featureDetection.reqs);

			// Is the requested feature one that is known to us?
			if     ( keys.indexOf(feature) == -1 ){
				console.log("  -- UNKNOWN FEATURE: (T1)", feature);
				return true;
				// return false;
			}

			// Similar check to the one above.
			else if( featureDetection.reqs[feature] == "undefined" ){
				console.log("  -- UNKNOWN FEATURE (T2):", feature);
				return true;
				// return false;
			}

			// Is this one already loaded?
			else if( featureDetection.reqs[feature].have == true){
				// console.log("  -- ALREADY LOADED:", feature);
				return true;
				// return false;
			}

			// This feature can be loaded.
			else{
				// return true;
				return false;
			}
		},

		applyFeatures_fromList : function(features){
			var PHP_combinedFeatures = function(features){
				return new Promise(function(resolve,reject){
					var new_features = [];
					for(var i=0; i<features.length; i+=1){
						// Remove the feature from the list if it is already known to be loaded.
						if( ! featureDetection.funcs.isTheFeatureAlreadyLoaded( features[i] ) ){
							new_features.push( features[i] );
						}
					}

					if( !new_features.length ) {
						resolve();
						return;
					}

					var finished = function(data) {
						data = xhr.response;
						featureDetection.funcs.evalInContext(data, window);
						new_features.map(function(d,i,a){
							featureDetection.reqs[d].have=true;
							console.log("  LOADED: ("+featureDetection.reqs[d].type+") ->" , d ,  " " );
						});

						resolve();
					};
					var error = function(data) {
						console.log("error:", this, data);
						reject(data);
					};
					var xhr = new XMLHttpRequest();
					xhr.addEventListener("load", finished);
					xhr.addEventListener("error", error);

					var fd   = new FormData();
					var o    = "getData" ;
					fd.append("o"           , o);
					fd.append("missingReqs" , new_features );

					var url = "_featureLoader/_p/featureLoader_p.php?o="+o+"&missingReqs="+new_features.join(",");

					xhr.open(
						"POST", // Type of method (GET/POST)
						url  // Destination
					, true);
					xhr.send(fd);

				});
			};
			var JS_features = function(features, syncType){
				var loadFeature = function(feature){
					return new Promise(function(resolve, reject){
						// Skip the loading of this feature if it is already known to be loaded.
						if( featureDetection.funcs.isTheFeatureAlreadyLoaded( feature ) ){
							resolve();
							return;
						}

						var type = featureDetection.reqs[feature].type;
						var url  = featureDetection.reqs[feature].url;

						var finished = function(data) {
							data = xhr.response;
							featureDetection.funcs.evalInContext(data, window);
							featureDetection.reqs[feature].have=true;
							console.log("  LOADED: ("+type+") ->" , feature ,  " " );
							resolve();
						};
						var error = function(data) {
							console.log("error:", this, data);
							reject(data);
						};
						var xhr = new XMLHttpRequest();
						xhr.addEventListener("load", finished);
						xhr.addEventListener("error", error);

						xhr.open(
							"POST", // Type of method (GET/POST)
							url     // Destination
						, true);
						xhr.send();
					});
				};

				return new Promise(function(resolve,reject){
					// The Promise.all inside this function will be started AFTER the array of promises has been populated.
					var promiseAll = function(proms){
						Promise.all(proms).then(
							function(results){
								resolve();
							}
							,function(error) {
								console.log("error:", error);
								reject();
							}
						);
					};

					// Start all downloads at once.
					if     (syncType=="async"){
						// Create an array of promises.
						var proms = [];
						for(var i=0; i<features.length; i+=1){
							var key = features[i];
							proms.push( loadFeature( key ) );
						}

						// Now run the function that creates the Promise.all now that the promise array is fully populated.
						promiseAll(proms);
					}
					// Do one download at a time.
					else if(syncType=="sync"){
						if(features.length){
							var fileIndex=0;
							var iterative = function(){
								// Is this the last file?
								if(fileIndex >= features.length){
									resolve();;
									return;
								}
								var key = features[fileIndex];
								loadFeature( key ).then(
									function(res){
										// Increment the file index.
										fileIndex++;
										// Start the next download process.
										iterative();
									},
									function(res){ console.log("ERROR:", res); reject(); }
								);

							};
							iterative();
						}
						else{
							resolve();
						}
					}
				});
			};

			return new Promise(function(resolve,reject){
				if(featureDetection.config.usePhp===true){
					// Get the code for each feature as one download.
					PHP_combinedFeatures(features).then(
						function(res){ resolve(res); },
						function(res){ console.log("ERROR", res); reject(res); }
					);
				}
				else{
					// Use Promise.all to start all downloads. (ASYNC)
					if     (featureDetection.config.useAsync===true){
						JS_features(features, "async").then(
							function(res){ resolve(res); },
							function(res){ console.log("ERROR", res); reject(res); }
						);
					}
					// Chain each download one after the other. (SYNC)
					else{
						JS_features(features, "sync").then(
							function(res){ resolve(res); },
							function(res){ console.log("ERROR", res); reject(res); }
						);
					}
				}

			});
		} ,
		getDatabase            : function(){
			return new Promise(function(resolve,reject){
				var method;
				var url;

				var finished = function(data) {
					data = JSON.parse(xhr.response);
					var keys = Object.keys(data);

					for(var i=0; i<keys.length; i+=1){
						featureDetection.reqs[ keys[i] ] = data[ keys[i] ];
					}

					resolve(data);
				};
				var error = function(data) {
					console.log("error:", this, data);
					reject();
				};
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("load", finished);
				xhr.addEventListener("error", error);

				var fd   = new FormData();
				var o    = "getDb" ;
				fd.append("o" , o);
				fd.append("includeText"    , featureDetection.config.includeText   );
				fd.append("includeWebsite" , featureDetection.config.includeWebsite);

				method="POST";
				url="_featureLoader/_p/featureLoader_p.php";

				xhr.open(
					method, // Type of method (GET/POST)
					url     // Destination
				, true);

				xhr.send(fd);
			});
		}         ,
		detectAndApply         : function(){
			var detect = function(){
				return new Promise(function(resolve, reject){
					var missingReqs = [];

					// Do the test for each required library. Set the have flag.
					for(var k in featureDetection.reqs){
						try{
							// TEST: check for a result of false.
							// If the test throws an exception it will still be caught.
							if( eval(featureDetection.reqs[k].test) === false){
								throw "The specified feature is missing.";
							}
							// No error? The feature already exists.
							else{
								// console.log("You have this feature already:", k);
								featureDetection.reqs[k].have=true;
								featureDetection.reqs[k].hadNatively=true;
							}

						}
						catch(e){
							// An exception was thrown. The feature is missing.
							featureDetection.reqs[k].have=false;

							// Add it to the missing list IF the feature is required at the start of the program.
							// Can install the feature later at the point WHEN it is needed.
							if(featureDetection.reqs[k].req==true){
								missingReqs.push(k);
								featureDetection.reqs[k].hadNatively=false;
							}

						}
					}

					// Resolve the promise and return the list of missing required features.
					resolve( missingReqs ) ;
				});
			};

			return new Promise(function(resolve,reject){
				// Get the config and feature file from the server. (one file.)
				featureDetection.funcs.getDatabase().then(
					function(res){
						// Detect.
						detect().then(
							function(missingReqs){
								// var new_missingReqs=[];
								var libs_missingReqs=[];
								var polys_missingReqs=[];
								var f;

								// Before applying, add in any userReqs.
								if( featureDetection.config.userReqs.length ){
									// Only userReqs that are NOT already in missingReqs will be added.
									for(f=0; f<featureDetection.config.userReqs.length; f+=1){
										if( missingReqs.indexOf(featureDetection.config.userReqs[f]) ==-1){
											missingReqs.push( featureDetection.config.userReqs[f] );
											featureDetection.reqs[ missingReqs[f] ].req=true;
										}
									}
								}

								// Change the order of the missingReqs so that polyfills load before libraries.
								var keys_libs  = ( missingReqs.filter(function(d,i,a){ if(featureDetection.reqs[d].type=="library")  { return d; } } ) );
								var keys_polys = ( missingReqs.filter(function(d,i,a){ if(featureDetection.reqs[d].type=="polyfill") { return d; } } ) );
								for(f=0; f<keys_libs.length; f+=1 ){ libs_missingReqs .push( keys_libs[f]  ); }
								for(f=0; f<keys_polys.length; f+=1){ polys_missingReqs.push( keys_polys[f] ); }

								// Apply.

								// Apply the libs.
								var prom1=featureDetection.funcs.applyFeatures_fromList(polys_missingReqs);
								prom1.then(
									function(res){
										// Then apply the polys.
										featureDetection.funcs.applyFeatures_fromList(libs_missingReqs).then(
											function(res){ resolve(res); },
											function(res){ console.log("error", res); reject(res); }
										);
									},
									function(res){ console.log("error", res); reject(res); }
								);

							},
							function(res){ console.log("error", res); reject(res); }
						);

					},
					function(res){ console.log("fail", res); reject(res); }
				);

			});

		}         ,
		init                   : function(callback){
			var nextStep = function(callback){
				featureDetection.funcs.detectAndApply().then(
					function(res){
						callback(res);
					},
					function(res){ console.log("1 error"  , res); }
				);
			};

			// First, Promise support must be checked for.
			if(typeof Promise=="undefined"){
				var js=document.createElement("script");
				js.onload=function(){
					nextStep(callback);
				};
				js.src="_featureLoader/libs/bluebird.min.js";
				document.body.appendChild(js);
			}
			else{
				nextStep(callback);
			}

		}
	}

};
	// EXAMPLE USAGE:
	/*

In the <head> of the HTML:
<script src="js/featureLoader.js"></script>

For the function that loads when your page it ready:

window.onload = function(){
	window.onload = null;

	// Feature Loader config:
	featureDetection.config.usePhp         = false;
	featureDetection.config.useAsync       = true;
	featureDetection.config.includeText    = false; // Using false makes the database download smaller.
	featureDetection.config.includeWebsite = false; // Using false makes the database download smaller.

	// Load these libraries also:
	featureDetection.config.userReqs = [
		// "JSZip"    ,
		// "FileSaver",
		// "sha512"   ,
		// "chartsJs" ,
		// "momentJs"
	];

	console.log("********************************");
	console.log("*** -- Feature Loader v1c -- ***");
	console.log("********************************");

	// Feature detect/replace.
	console.log("FEATURE DETECTION: START");
	featureDetection.funcs.init(
		function(res){
			console.log("FEATURE DETECTION: END");

			// Ready to continue with the rest of the application setup!
			//

		}
	);


};

	*/
# Feature Loader

Feature Loader helps to solve a common problem. The problem of managing a growing list of polyfills and libraries. It solves this by only loading what is actually needed based on individual feature detection tests.

## View the demo:
[Feature Loader Demo]

# What are some examples of what it can do?
  - For example, Promise support is not available natively with Internet Explorer. If this feature is detected as missing, Feature Loader will install Bluebird.js before continuing. However, if the feature is already available natively in the browser the feature will NOT be loaded.
  - The methods of padStart and padEnd are not available in Internet Explorer. This will be detected and a polyfill loaded. Many other small polyfills such as for smooth scrolling, Custom Event, .closest, forEach (array and nodeList) can all be individually tested for and polyfilled IF needed.
  - Libraries and polyfills do not have to be all loaded at program start. Some may not be required until later. An example of this would be JSZip and FileSaver. These libraries can be used to create and download a .zip file. However, the user may not use this feature of your application every time. With Feature Loader, you can load a library or several at the point it is needed.
  - Additionally, Feature Loader is smart enough to not load the same polyfill or library again if it has already been loaded.

# What is the earliest version of Internet Explorer that is supported?
Internet Explorer support starts at version 10.

### Methods
- Feature Loader has three main ways of getting the libraries/polyfills installed.
The first is downloading the individual files one at a time (sequentially.) This method requires only Javascript and will result in one file download per requested feature.
- The second is downloading the all the individual files one at a time but asequentially. This method requires only Javascript and will result in one file download per requested feature.
- The third is downloading all the requested features in one download. This method requires PHP which will return one datafile that contains the requested libraries/polyfills.

I would avoid the first option but it is available because it is the most simple.
The second and third options are the best. You will download less individual files with the PHP method.
Both the second and third options are about the same for speed and both are noticably faster than the first option.

### Tech

Feature Loader uses plain "Vanilla" Javascript. However, it does allow for easily loading of polyfills and libaries which can include additional code or libraries.

INCLUDED LIBRARIES AND POLYFILLS:
* [Promise] - via Bluebird Promise Library
* [JSZip] - Allows for the creation of a .zip file.
* [FileSaver] - Allows for downloading of a file that is already in browser memory.
* [sha512] - Hashing library that can be used for hashing passwords.
* [chartsJs] - Simple yet flexible JavaScript charting for designers & developers
* [momentJs] - Parse, validate, manipulate, and display dates and times in JavaScript.
* [X2JS] - XML to JSON and back for JavaScript.
* [repeat] - Required for .padEnd and .padStart. The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.
* [padStart] - The padStart() method pads the current string with another string (multiple times, if needed)
* [padEnd] - The padEnd() method pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
* [closest] - The Element.closest() method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there is not such an ancestor, it returns null.
* [findIndex] - The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating no element passed the test.
* [Number.isNaN] - The Number.isNaN() method determines whether the passed value is NaN and its type is Number. It is a more robust version of the original, global isNaN().
* [Object.assign] - The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
* [forEach_array] - Covers array.
* [forEach_nodeList] - Covers nodeList.
* [smoothScroll] - Allows for {behavior:smooth} scrolling.
* [CustomEvent] - Normalizes CustomEvent which is different in IE

### Installation
This is an example of how you can install this into your webpage. Feature Loader should run BEFORE the rest of your application so that it can load the required polyfills and libraries.

In your website's directory copy in the "_featureLoader" folder. If you are updating Feature Loader you can just empty and replace the folder.

In the <head> of the HTML:

```sh
<script src="_featureLoader/js/featureLoader.js"></script>
```

For the function that loads when your page it ready:

```sh
window.onload = function(){
	window.onload = null;

	var continueApp = function(){
		// Your app will continue from this function.
	};

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

	// Feature detect/replace.
	featureDetection.funcs.init(
		function(res){
			// Ready to continue with the rest of the application setup!
			continueApp();
		}
	);

};
```
### Loading Features After Init:
```sh
// EXAMPLE:
featureDetection.funcs.applyFeatures_fromList([ "JSZip", "FileSaver", "momentJs"]);
```

License
----
GPL3


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Feature Loader Demo]:<https://www.nicksen782.net/featureLoader/>
[Promise]:<https://github.com/petkaantonov/bluebird>
[JSZip]:<https://github.com/Stuk/jszip>
[FileSaver]:<https://github.com/eligrey/FileSaver.js>
[sha512]:<https://web.archive.org/web/20170806032838/http://www.happycode.info:80/javascript-sha-512/>
[chartsJs]:<https://www.chartjs.org/>
[momentJs]:<http://momentjs.com/>
[X2JS]:<https://github.com/abdmob/x2js/>
[repeat]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat>
[padStart]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart>
[padEnd]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd>
[closest]:<https://developer.mozilla.org/en-US/docs/Web/API/Element/closest>
[findIndex]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex>
[Number.isNaN]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN>
[Object.assign]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>
[forEach_array]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach>
[forEach_nodeList]:<https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach>
[smoothScroll]:<https://github.com/iamdustan/smoothscroll>
[CustomEvent]:<https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent>

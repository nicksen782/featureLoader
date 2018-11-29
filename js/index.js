/* global featureDetection */
function drawResultsTable(){
	var table = document.querySelector("#scanresults table");
	var keys  = Object.keys(featureDetection.reqs);

	var row;
	var th1;
	var td1;
	var td2;
	var td3;
	var td4;
	var td5;
	var td6;
	var hadNatively;
	var have;
	var req;
	var i;

	// Clear the table.
	for (i = (table.rows.length) - 1; i > 0; i--) { table.deleteRow(i); }

	var keys_libs  = ( keys.filter(function(d,i,a){ if(featureDetection.reqs[d].type=="library")  { return d; } } ) );
	var keys_polys = ( keys.filter(function(d,i,a){ if( featureDetection.reqs[d].type=="polyfill") { return d; } } ) );
	var keys_custFuncs = ( keys.filter(function(d,i,a){ if(featureDetection.reqs[d].type=="customFunction")  { return d; } } ) );

	// console.log("keys_libs:", keys_libs);
	// console.log("keys_polys:", keys_polys);
	// console.log("keys_custFuncs:", keys_custFuncs);

	var createTable = function(keys){
		// Set the values.
		for(i=0; i<keys.length; i++){
			// Flags
			hadNatively = featureDetection.reqs [ keys[i] ].hadNatively ? "YES" : "-";
			have        = featureDetection.reqs [ keys[i] ].have        ? "YES" : "-";
			req         = featureDetection.reqs [ keys[i] ].req         ? "YES" : "-";

			// Set flag: hadNatively
			if(hadNatively==null){ hadNatively="";}
			else if(hadNatively==true ){ hadNatively="YES";}
			else if(hadNatively==false){ hadNatively="";}

			// Set flag: have
			if(have==null      ){ have="";}
			else if(have==true ){ have="YES";}
			else if(have==false){ have="";}

			// Set flag: req
			if(req==null      ){ req="";}
			else if(req==true ){ req="YES";}
			else if(req==false){ req="";}

			// Create the elements.
			row = table.insertRow(table.rows.length);
			th1 = document.createElement('th');
			td1 = document.createElement('td');
			td2 = document.createElement('td');
			td3 = document.createElement('td');
			td4 = document.createElement('td');
			td5 = document.createElement('td');
			td6 = document.createElement('td');

			if     ( featureDetection.reqs [ keys[i] ].type == "library"        ){ row["style"]["background-color"] = "#b8e0b8"; }
			else if( featureDetection.reqs [ keys[i] ].type == "polyfill"       ){ row["style"]["background-color"] = "#b8b8e0"; }
			else if( featureDetection.reqs [ keys[i] ].type == "customFunction" ){ row["style"]["background-color"] = "#e0b8b8"; }

			// Set the text inside of each element.
			th1.innerHTML = "<a href='"+featureDetection.reqs [ keys[i] ].url    +"' target='_blank'>"+keys[i]+"</a>";
			td1.innerHTML = "<a href='"+featureDetection.reqs [ keys[i] ].website+"' target='_blank'>LINK</a>";
			td2.innerHTML = featureDetection.reqs [ keys[i] ].type ;
			td3.innerHTML = req;
			td4.innerHTML = hadNatively ;
			td5.innerHTML = have        ;
			td6.innerHTML = featureDetection.reqs [ keys[i] ].text ;

			// Append the new elements to the row.
			row.appendChild(th1);
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			row.appendChild(td6);
		}

	};

	createTable(keys_libs);
	createTable(keys_custFuncs);
	createTable(keys_polys);

	// Adjust the caption.
	// table.querySelector("caption").innerHTML = "Feature Statuses";
}
function updateLoadtime(loadTime){
	var table = document.querySelector("#scanresults table");
	// Adjust the caption.
	table.querySelector("caption").innerHTML = "Feature Statuses";
	if(loadTime){
		table.querySelector("caption").innerHTML += "<div class=\"loadtimeCaption\">Load-time: "+loadTime+" ms</div>";
	}
}
function getQueryStringAsObj(){
	var str = window.location.search ;
	var obj = {} ;
	var part ;
	var i ;

	// Work with the string if there was one.
	if(str != ""){
		// Take off the "?".
		str = str.slice(1);

		// Split on "&".
		str = str.split("&");

		// Go through all the key=value and split them on "=".
		for(i=0; i<str.length; i+=1){
			// Split on "=".
			part = str[i].split("=");

			// Add this to the return object.
			obj[ part[0] ] = part[1];
		}
	}

	// Finally, return the object.
	return obj;
}
function actOnQueryString(qstring){
	if     (qstring.usePhp=="true")    { featureDetection.config.usePhp=true; }
	else if(qstring.usePhp=="false")   { featureDetection.config.usePhp=false; }
	else                               { featureDetection.config.usePhp=false; }

	if     (qstring.useAsync=="true")  { featureDetection.config.useAsync=true; }
	else if(qstring.useAsync=="false") { featureDetection.config.useAsync=false; }
	else                               { featureDetection.config.useAsync=true; }

}
function addLinksToHomepage(){
	var baseUrl = window.location.href.split("?")[0] ;
	var destdiv = document.getElementById("links");

	var optionActive1 = (featureDetection.config.usePhp!=true && featureDetection.config.useAsync==true) ? true : false ;
	var optionActive2 = (featureDetection.config.usePhp!=true && featureDetection.config.useAsync!=true) ? true : false ;
	var optionActive3 = (featureDetection.config.usePhp==true && featureDetection.config.useAsync==true) ? true : false ;

	var newHTML = "";
	newHTML += "<table>";
	newHTML += "<tr> <td> CONFIG:              </td> <td> &nbsp; </td></tr>";
	newHTML += "<tr class=\""+(optionActive1 ? "active" : "")+"\"> <td> &nbsp;&nbsp;<a href=\""+(baseUrl+'?usePhp=false&useAsync=true' )+"\">Option #1: usePHP:false, useAsync:true</a>  </td> <td> JavaScript only: each feature is a separate (async) AJAX call. (<span class=\"bold underline\">Default</span>) </td></tr>";
	newHTML += "<tr class=\""+(optionActive2 ? "active" : "")+"\"> <td> &nbsp;&nbsp;<a href=\""+(baseUrl+'?usePhp=false&useAsync=false')+"\">Option #2: usePHP:false, useAsync:false</a> </td> <td> JavaScript only: each feature is a separate (sync) AJAX call.            </td></tr>";
	newHTML += "<tr class=\""+(optionActive3 ? "active" : "")+"\"> <td> &nbsp;&nbsp;<a href=\""+(baseUrl+'?usePhp=true&useAsync=true'  )+"\">Option #3: usePHP:true , useAsync:true</a>  </td> <td> Requires PHP: All required features are returned in one download.        </td></tr>";
	newHTML += "<tr> <td> &nbsp;                 </td> <td> &nbsp; </td></tr>";
	newHTML += "<tr> <td> &nbsp;                 </td> <td> &nbsp; </td></tr>";
	newHTML += "<tr> <td> SETTINGS:              </td> <td> &nbsp; </td></tr>";
	newHTML += "<tr> <td> &nbsp;&nbsp;usePhp   : </td> <td> "+(featureDetection.config.usePhp     ? 'true' : 'false')+" </td></tr>";
	newHTML += "<tr> <td> &nbsp;&nbsp;useAsync : </td> <td> "+featureDetection.config.useAsync                       +" </td></tr>";
	newHTML += "</table>";
	destdiv.innerHTML = newHTML;
}

window.onload = function(){
	window.onload = null;
	console.log("********************************");
	console.log("*** -- Feature Loader v1c -- ***");
	console.log("********************************");

	// Feature Loader config:
	featureDetection.config.usePhp         = false;
	featureDetection.config.useAsync       = true;
	featureDetection.config.includeText    = true; // Using false makes the database download smaller.
	featureDetection.config.includeWebsite = true; // Using false makes the database download smaller.

	// Load these libraries also:
	featureDetection.config.userReqs = [
		// "JSZip"    ,
		// "FileSaver",
		// "sha512"   ,
		// "chartsJs" ,
		// "momentJs"
	];

	actOnQueryString ( getQueryStringAsObj() );

	addLinksToHomepage();

	var startTS=performance.now().toFixed(1);
	var endTS;

	drawResultsTable();
	var intervalId=setInterval(function(){
		if( Object.keys( featureDetection.reqs ).length ){
			// console.log(featureDetection.reqs);
			// drawResultsTable( (performance.now()-startTS).toFixed(1) );
			updateLoadtime((performance.now()-startTS).toFixed(2));
		}
	},125);

	// Feature detect/replace.
	featureDetection.funcs.init(
		function(res){
			var endTS=performance.now().toFixed(1);
			clearInterval(intervalId);

			// Ready to continue with the rest of the application setup!
			drawResultsTable() ;
			updateLoadtime(res.duration);
		}
	);

};


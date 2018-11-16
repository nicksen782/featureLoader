/* global featureDetection */
function drawResultsTable(){
	var table = document.querySelector("#scanresults table");
	for (var i = (table.rows.length) - 1; i > 0; i--) { table.deleteRow(i); }

	var keys = Object.keys(featureDetection.reqs);

	for(var i=0; i<keys.length; i++){
		var hadNatively = featureDetection.reqs [ keys[i] ].hadNatively ;
		var have        = featureDetection.reqs [ keys[i] ].have        ;
		var req        = featureDetection.reqs [ keys[i] ].req        ;

		if(hadNatively==null){ hadNatively="";}
		else if(hadNatively==true ){ hadNatively="YES";}
		else if(hadNatively==false){ hadNatively="";}

		if(have==null      ){ have="";}
		else if(have==true ){ have="YES";}
		else if(have==false){ have="";}

		if(req==null      ){ req="";}
		else if(req==true ){ req="YES";}
		else if(req==false){ req="";}


		// !=null
		// !=null

		var row = table.insertRow(table.rows.length);
		var th1 = document.createElement('th');
		th1.style['text-align']='left';
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		var td6 = document.createElement('td');

		th1.innerHTML = "<a href='"+featureDetection.reqs [ keys[i] ].url+"' target='_blank'>"+keys[i]+"</a>";
		td1.innerHTML = "<a href='"+featureDetection.reqs [ keys[i] ].website+"' target='_blank'>LINK</a>";
		td2.innerHTML = featureDetection.reqs [ keys[i] ].type ;
		td3.innerHTML = req;
		td4.innerHTML = hadNatively ;
		td5.innerHTML = have        ;
		td6.innerHTML = featureDetection.reqs [ keys[i] ].text ;

		row.appendChild(th1);
		row.appendChild(td1);
		row.appendChild(td2);
		row.appendChild(td3);
		row.appendChild(td4);
		row.appendChild(td5);
		row.appendChild(td6);

	}
}

window.onload = function(){
	window.onload = null;
	console.log("********************************");
	console.log("*** -- Feature Loader v1b -- ***");
	console.log("********************************");

	drawResultsTable() ;

	// If necessary, make sure any required libraries/polyfills are downloaded.
	featureDetection.initial_windowOnload(
		function(){
			// Do the rest of the application setup here.
			console.log("FEATURE DETECTION: FINISHED");
			console.log("******************************************\n");

			// READY TO CONTINUE!
			drawResultsTable() ;

/*
*/


		}
	);

};

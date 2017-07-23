var mapdata;

var defaultPos = {lat: 48.75618876280552, lng: 44.5246696472168};
var navWidth="200px";

var battlefront = []; //
var cityMarkers = []; // Regular Markers

var sovietMarkers = []; // Cluster Marker
var wehrmachtMarkers = []; // Cluster Marker

// 0 = Name , 1 = description, 2 = lat, 3 = lng
var cityData = [
    [
	"Mamayev Kurgan",
	"A strategic hill that overlooks the city, both sides lost entire divisions (down to the last man) in its defense or capture. The sheer carnage that raged on the once steep slopes  Mamayev Kurgan had reduced its overall height by several feet. Nothing would grow on the hill until spring of 1944.",
	48.742295,
	44.537050
    ],
    [
	"Grain Elevator",
	"One of the few standing buildings in the city, its size and bright green exterior dominated the landscape of southern Stalingrad. Amazingly, the Soviets overlooked this building and was captured by the Wehrmacht on Sept 15th. Despite the Wehrmacht's artillery and stuka dive bombers scoring direct hits, the grain elevator remained intact. On Sept 16th, 1942 12 tanks from 4th Panzer and grenadiers 94th Infantry Division mounted a direct assault against the green giant.",
	48.687818,
	44.483573
    ],
    [
	"Spartanovka",
	"The Wehrmacht's encirclement was complete with the capture of this northern village.",
	48.8183777,
	44.6062698
    ]
]

var infoHtml = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="description" content="Portfolio">',
    '<meta name="keywords" content="HTML,CSS,XML,JavaScript">',
    '<meta name="author" content="Jon Lee">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<link href="http://fonts.googleapis.com/css?family=Lato:100,300" rel=""stylesheet"" type=""text/css"">',
    '<link rel="stylesheet" href="css/bootstrap.min.css">',
    '<link rel="stylesheet" href="css/style.css">',
    '<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">',
    '<style>',
    '.info-window {',
    'padding: 0;',
    'margin: 0;',
    'height: 100%;',
    '}',
    '.info-window h1 {',
    'font-size: 18px;',
    'margin-top: 0px;',
    'margin-bottom: 0px;',
    'color: slategrey;',
    '}',
    '.info-window b {',
    'font-family: "Special Elite", cursive;',
    'color: #7b0000;',
    '}',
    '.info-window article {',
    'font-size: 14px:',
    'text-align: left:',
    'color: #053573;',
    'font-family: "Special Elite", cursive;',
    '}',
    '</style>',
    '</head>',
    '<body>',
    '<div class="info-window">',
    '<h1 id="info-header">',
    '<b>',
    'title',
    '</b>',
    '</h1>',
    '<article>',
    'article',
    '</article>',
    '</div>',
    '</body>',
    '</html>'
]

// Access google maps api, initialize var mapdata
function initMap() {

    mapdata = new google.maps.Map(document.getElementById('map'), {
	center: defaultPos,
	zoom: 11,
	mapTypeId: 'satellite'
    });

    // On start initialize city markers
    setCityMarkers();

    // populate yor box/field with lat, lng
    getclickPos();
}

// pass json
function setCityMarkers() {

    for (var currIndex = 0; currIndex < cityData.length; currIndex++) {
	console.log(currIndex);
	
	var strTitle = cityData[currIndex][0];	
	var infowindow = new google.maps.InfoWindow({
	    maxWidth: 250
	});
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(cityData[currIndex][2], cityData[currIndex][3]),
	    map: mapdata,
	    title : strTitle
	});
	
	cityMarkers.push(marker);
	google.maps.event.addListener(marker, 'click', (function(marker, currIndex) {
	    return function() {
		var htmlStr = setInfo(currIndex);
		infowindow.setContent(htmlStr);
		infowindow.open(map, marker);
	    }
	})(marker, currIndex));
    }
    //console.log(cityJson); // this will show the info it in firebug console
}

function setInfo(currIndex) {
    var markerHtml = [];
    var strHtml = "";

    // Apparently copy by reference is default when cloning arrays in javascript.
    for (var i = 0; i < infoHtml.length; i++){
	markerHtml[i] = infoHtml[i];
    }
    
    for (var i = 0; i < markerHtml.length; i++){
	if (markerHtml[i] == 'title'){
	    markerHtml[i] = cityData[currIndex][0];
	}
	else if (markerHtml[i] == 'article'){
	    markerHtml[i] = cityData[currIndex][1];
	}
	console.log(markerHtml[i]);
	strHtml = strHtml + markerHtml[i];
    }
    return strHtml;
}

function openNav() {
    if(document.getElementById("mySidenav").style.width == navWidth){
	closeNav();
    }
    else{
	document.getElementById("mySidenav").style.width = navWidth;
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

function getclickPos() {
    google.maps.event.addListener(mapdata, 'click', function(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	mapdata.setCenter(new google.maps.LatLng(lat, lng));
	console.log(mapdata.getZoom());
	console.log(lat + " " + lng);  // in event.latLng  you have the coordinates of click
    });
}

window.onclick = function(event) {
    if(	!event.target.matches(".button") &&
	!event.target.matches(".sidenav") &&
	!event.target.matches("p") &&
	!event.target.matches(".toggle-button-sidenav") &&
	!event.target.matches(".nav-button") &&
	document.getElementById("mySidenav").style.width === navWidth) {

	closeNav();
    }
    $('#mySidenav').on('click', 'a', function() {
	console.log($(this).index());
    });
}

window.onload = function(){

}

// var template = {
//     {"name": "",
//      "description": "",
//      "lat": ,
//      "lng":
//     }
// }


// This is how not to do load html. Reason being, you're reading from a local file.
// function infoWin () {
//     var htmlArray = require("htmlArray");
//     var htmlText = htmlArray.readFileSync("../infowindow.html").toString('utf-8');
//     var htmlStr = htmlText.split("\n");
//     console.llog(htmlStr);
// }

// function readTextFile(file)
// {
//     var allText;
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 allText = rawFile.responseText;
//             }
//         }
//     }
//     rawFile.send(null);
//     return allText;
// }

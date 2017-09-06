var mapdata, cityOverlay;
var navWidth = "200px";

var defaultPos = {
    lat: 48.75686777983242,
    lng: 44.52157974243164
};

// Map mapMarkers to click on.
var mapMarkers = {
    city: [],
    soviet: [],
    wehrmacht: []
};

var mapWindows = {
    city: [],
    soviet: [],
    wehrmacht: []
}

var clickCount = 1;

ko.bindingHandlers.clickOutside = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

	var fn = ko.utils.unwrapObservable(valueAccessor());

	$('html').on('click', function(e) {
	    if (!($.contains(element, e.target) || element === e.target) &&
		!($.contains(e.target, "closeButton"))) {
		fn();
	    }
	});
    }
}

var viewModel = function() {

    this.onoff = ["rgb(129,129,129)", "rgb(255,255,255)"];
    this.currMap = ko.observable("Volgagrad");
    this.setNameColor = ko.observable("rgb(9, 31, 53)");
    this.toggleSearch = ko.observable(0);
    
    this.markerType = ko.observableArray([
	{ name: 'Search...',   active: ko.observable(0), type: 'search'},
	{ name: 'City',        active: ko.observable(1), type: 'city'},
	{ name: 'Red Army',    active: ko.observable(0), type: 'soviet'},
	{ name: 'Wehrmacht',   active: ko.observable(0), type: 'wehrmacht'},
	{ name: 'About',       active: ko.observable(0), type: 'about'},
	{ name: 'Toggle Menu', active: ko.observable(0), type: 'toggle'}
    ]);

    this.toggleMap = function(index, data) {
	
	var currCity = data.target.innerHTML;

	if(currCity == "Stalingrad"){
	    data.target.innerHTML = "Volgagrad";
	    this.setNameColor("rgb(9, 31, 53)");
	}
	else{
	    data.target.innerHTML = "Stalingrad";
	    this.setNameColor("rgb(127, 0, 0)");
	}
    };

    // outside click detection
    this.clickOutside = function(data) {

	// checking aboutButton
	var aboutIndex = this.markerType().length - 2;
	var aboutStatus = this.markerType()[aboutIndex].active();

	// close about status on outside click, if toggled on and you click outside, close it
	if (aboutStatus == 1) {
	    this.markerType()[aboutIndex].active(0);
	}
	aboutButton(data);

	// checking sideNav
	var toggleIndex = this.markerType().length - 1;
	var toggleStatus = this.markerType()[toggleIndex].active();

	var curroffsetWidth = document.getElementById("mySidenav").offsetWidth;
	var currWidth = document.getElementById("mySidenav").style.width;

	// NOTE : This is weird, knockoutJS can't detect the navBar being 200px wide?!?!?'

	// if user clicked toggleButton and clicks outside, do nothing, else close sideNav
	if (toggleStatus == 0 && curroffsetWidth != 0){
	    document.getElementById("mySidenav").style.width = 0;
	}
    };

    this.openNav = function(){	
	document.getElementById("mySidenav").style.width = navWidth;
    }
    this.closeNav = function(){
	document.getElementById("mySidenav").style.width = 0;
    }

    // X button sidenav click show/hide navigation bar
    this.toggleNav = function() {
	var navDom = document.getElementById("mySidenav");
	var currWidth = navDom.style.width;

	if(currWidth == navWidth){
	    this.closeNav();
	}
	else{
	    this.openNav();
	}
    };

    // Because active is observable you can modify it with knockoutJS.
    // Show/hide map marker layer on button click.    
    this.navbtnToggle = function(index, data){

	// current clicked button
	var type = data['type'];

	// toggle current status
	data.active(1-data.active());

	if (type == 'search'){
	    var a = this.toggleSearch;
	    this.toggleSearch(1 - a);
	    console.log("search clicked");
	}
	else{
	    // check if marker or aboutButton
	    $.getScript("js/overlays.js", function(event){
		aboutButton(data, event);
		toggleGroup(type, data);      // toggle marker layer overlays.js	    
	    });
	}
    };

    // Not sure how to subscribe the event changes in mapEvents[] with eventDetect[]
    var eventDetect = [];
    
    this.eventDetect = ko.observableArray(eventDetect);
    this.displayMessage = ko.observable(0);    

    // toggle button for google map events
    this.toggleMonitor = function(data) {
	var a = this.displayMessage();
	this.displayMessage(1 - a );
    };
};

function initMap(){

    // waits until DOM is fully loaded before executing google maps


    // definitely a better way of doing this....
    $.getScript("js/snazzy-info-window.min.js", function(){

	var clickCount = 1;
	
	mapdata = new google.maps.Map(document.getElementById('map'), {
	    // use snazzy-maps mapStyle 
	    styles: mapStyle,	
	    center: defaultPos,
	    zoom: 12,
	    gestureHandling: 'gestures',
	    disableDefaultUI: true
	});
	
	google.maps.event.addDomListener(window, 'load');

	// setup overlay
	var cityOverlay = new google.maps.OverlayView();

	var imgbounds = new google.maps.LatLngBounds(
	    new google.maps.LatLng(49.005447494058096, 44.894256591796875),
	    new google.maps.LatLng(48.53843177405044, 44.33807373046875)
	);
	
	cityOverlay = new google.maps.GroundOverlay('http://i.imgur.com/pyjuLfd.jpg', imgbounds);
	cityOverlay.setMap(mapdata);

	var cityInfo = infoData['city'];
	var sovietInfo = infoData['soviet'];
	var wehrmachtInfo = infoData['wehrmacht'];

	// set mapMarkers
	$.getScript("js/overlays.js", function() {
	    setMarkers('city', cityInfo, mapdata);
	    setMarkers('soviet', sovietInfo, mapdata);
	    setMarkers('wehrmacht', wehrmachtInfo, mapdata);
	});

    });

    ko.applyBindings(new viewModel());
}

function mapError(){
    alert("Google Maps is offline");
}

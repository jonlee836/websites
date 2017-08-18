var mapdata, cityOverlay;

var togglebtn = false;
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

ko.bindingHandlers.clickOutside = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

	var fn = ko.utils.unwrapObservable(valueAccessor());

	$('html').on('click', function(e) {
	    if (!($.contains(element, e.target) || element === e.target) &&
		!($.contains(e.target, "closeButton"))) {
		fn();
	    }
	});
    },
}

var viewModel = function() {
    
    this.onoff = ['rgb(129,129,129)', 'rgb(255,255,255)'];

    this.currMap = ko.observable("Stalingrad");

    this.mapType = ko.observableArray([
	'Stalingrad',
	'Volgagrad'
    ]);
    
    this.markerType = ko.observableArray([
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
	}
	else{
	    data.target.innerHTML = "Stalingrad";
	}
    };

    this.openNav = function(){	
	document.getElementById("mySidenav").style.width = navWidth;
    }
    this.closeNav = function(){
	document.getElementById("mySidenav").style.width = 0;
    }

    // outside click detection
    this.clickOutside = function(data) {

	var toggleIndex = this.markerType().length - 1;
	var toggleStatus = this.markerType()[toggleIndex].active();

	var curroffsetWidth = document.getElementById("mySidenav").offsetWidth;
	var currWidth = document.getElementById("mySidenav").style.width;

	// This is the weirdest shit, it can't detect the navBar being 200px wide?!?!?'
	if (toggleStatus == 0 && curroffsetWidth != 0){
	    document.getElementById("mySidenav").style.width = 0;
	}
    };

    // X button sidenav click show/hide navigation bar
    this.toggleNav = function() {
	var navDom = document.getElementById("mySidenav");
	var currWidth = navDom.style.width;

	if(currWidth == navWidth){
	    navDom.style.width = 0;
	}
	else{
	    navDom.style.width = navWidth;
	}
    };

    // Because active is observable you can modify it with knockoutJS
    // show/hide map marker layer
    this.navbtnToggle = function(index, data){
	var type = data['type'];

	toggleGroup(type);            // toggle marker layer
	data.active(1-data.active()); // toggle button highglight
    };

};

// waits until DOM is fully loaded before executing
$(function() {
    
    mapdata = new google.maps.Map(document.getElementById('map'), {
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

    // create DOM element inside google maps
    // set buttons for WW2 map and present day satellite map
    var ctrlDiv = document.createElement('div');
    ctrlDiv.index = 1;
    ctrlDiv.style['padding-top'] = '1px';
    $.getScript("js/mapButtons.js", function() {
    	OverlayCtrl(ctrlDiv, mapdata);
    });
    mapdata.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(ctrlDiv);

    // need region detection to determine whether or not to load it in english or russian
    // local variables makes code more readable vs accessing global variables
    // or.... you could just access everything global by key

    // Does JS not care about an incorrect number of arguments being passed into a function??!?!?
    var cityInfo = infoData['city'];
    var sovietInfo = infoData['soviet'];
    var wehrmachtInfo = infoData['wehrmacht'];

    // set mapMarkers
    $.getScript("js/overlays.js", function() {
	setMarkers('city', cityInfo, mapdata);
	setMarkers('soviet', sovietInfo, mapdata);
	setMarkers('wehrmacht', wehrmachtInfo, mapdata);
    });

    // get lat, lng
    getclickPos();

    ko.applyBindings(new viewModel());
});

// recenter map to clicked location
function getclickPos() {
    google.maps.event.addListener(mapdata, 'click', function(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	console.log(lat, lng);
	//	mapdata.panTo(new google.maps.LatLng(lat, lng));
	//	mapdata.setCenter(new google.maps.LatLng(lat, lng));
    });
}

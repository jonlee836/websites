var mapdata, cityOverlay;
var navWidth = "200px";

var defaultPos = {
    lat: 48.75686777983242,
    lng: 44.52157974243164
};

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

    // inside scope of viewModel, regular this is the scope of binding in HTML
    var self = this;

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

    var siteNames = [];

    this.onoff = ["rgb(129,129,129)", "rgb(255,255,255)"];
    this.currMap = ko.observable("Volgagrad");
    this.setNameColor = ko.observable("rgb(9, 31, 53)");
    this.toggleSearch = ko.observable(0);
    this.searchOption = ko.observable("");
    
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
	
	$.getScript("js/overlays.js", function(event){
	    aboutButton(data);	    
	});

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
	    searchButton(data, event);
	}
	else{
	    // check if marker or aboutButton
	    $.getScript("js/overlays.js", function(event){
		aboutButton(data, event);
		toggleGroup(type, data, mapWindows, mapMarkers);      // toggle marker layer overlays.js	    
	    });
	}
    };

    this.initMap = function(){
	// waits until DOM is fully loaded before executing google maps
	// definitely a better way of doing this....
	$.getScript("js/snazzy-info-window.min.js", function(){

	    mapdata = new google.maps.Map(document.getElementById('map'), {
		// use snazzy-maps mapStyle 
		styles: mapStyle,	
		center: defaultPos,
		zoom: 12,
		gestureHandling: 'gestures',
		disableDefaultUI: true
	    });
	    
	    google.maps.event.addDomListener(window, 'load');

	    var cityInfo = infoData['city'];
	    var sovietInfo = infoData['soviet'];
	    var wehrmachtInfo = infoData['wehrmacht'];

	    // set mapMarkers and collect monument titles from each type
	    $.getScript("js/overlays.js", function() {
		setMarkers('city', cityInfo, mapdata, mapWindows, mapMarkers, siteNames);
		setMarkers('soviet', sovietInfo, mapdata, mapWindows, mapMarkers, siteNames);
		setMarkers('wehrmacht', wehrmachtInfo, mapdata, mapWindows, mapMarkers, siteNames);
	    });
	});
    }

    this.initMap();
    
    this.filterToggle = ko.observable(0);

    // toggle button for google map events
    this.filterClick = function(data) {
	var a = this.filterToggle();
	this.filterToggle(1 - a );
    };

    this.goToMarker = function(index, data){

	jQuery.each(mapMarkers, function(i, obj){
	    for (var currIndex = 0; currIndex < obj.length; currIndex++){

		var tmpMark = obj[currIndex];

		if (tmpMark.title == index.location){
		    console.log(tmpMark);
		    if (!tmpMark.getVisible()){
			obj[currIndex].setVisible(true);
		    }
		    google.maps.event.trigger(tmpMark, 'click');
		   		    
		}
	    }
	});
    }
    
    this.locationFilter = ko.computed(function(index, data){

	var res = [];
	var currSearch = this.searchOption();

	for (var i = 0; i < siteNames.length; i++){
	    
	    var tempObj = new Object(siteNames[i]);
	    var currStr = tempObj.location;
	    
	    if (currStr.toLowerCase().includes(currSearch.toLowerCase())){
		res.push(tempObj);
	    }
	}
	return res;
    }, this);
    
};

function searchButton(data, event){
    console.log(data,event);
}

function mapError(){
    alert("Google Maps is offline");
}

function runApp(){
    ko.applyBindings(new viewModel());
}

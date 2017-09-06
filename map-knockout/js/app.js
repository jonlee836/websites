var map, infowindow, bounds;

class ViewModel {
    constructor() {
	
    } //.constructor
}; //.ViewModel class


/**
 * Success callback for Map API request
 */

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
	styles: mapStyle,
	zoom: 15,
	center: {lat: -37.813795, lng: 144.964069},
	streetViewControl: false
    });
};

/**
 * Error callback for GMap API request
 */

function mapError(){
    alert("error");
    // Error handling
};

var vm = new ViewModel();
ko.applyBindings(vm);

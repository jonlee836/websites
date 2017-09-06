// This project uses the autocomplete feature of the Google Places API.
// It allows the user to find all museums in a given place, within a given
// country. It then displays markers for all the museums returned,
// with on-click details for each museum.

var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'us' };
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var viewModel = {
    wikiArray: ko.observableArray(), //this array holds data from ajax request from wiki api
    wikiError: ko.observable(""),
    wikiHeader: ko.observable(false),
    buttonWiki: ko.observable(false),
    infoWindowcontent: ko.observable(false), //this block holds info about museums when window opens on a click
    infoPlaces: ko.observableArray(), //this array holds all museums in a given location
    name: ko.observable(), //name of the museum
    phone: ko.observable(), //phone number of the museum
    adress: ko.observable(), //address of the museum
    website: ko.observable(), //website of the museum
    icon: ko.observable(), //icon for the museum
    mobileShow: ko.observable(false),
    mobileMusShow: ko.observable(false),
    mobblock: ko.observable(false),
    museumResults: ko.observableArray(), //holds array of museum results
    

    // just using sorting function to sort array of wiki articles
    sortItems: function() {
        this.wikiArray.sort(function(left, right) {
            return left.article == right.article ?0: (left.aricle < right.articel ? -1:1);
        });
    },

    mobileToggleList: function() {
        if(viewModel.mobileShow() === false) {
            viewModel.mobileShow(true);
        } else {
            viewModel.mobileShow(false);
        }
    },
    mobileToggleMusList: function() {
        if(viewModel.mobileMusShow() === false) {
            viewModel.mobileMusShow(true);
        } else {
            viewModel.mobileMusShow(false);
        }
    },
     // When a museum on the list is clicked, go to corresponding marker and open its info window; on mobile and tablets.
    goToMarker: function(clickedMus) {
        var clickedMusName = clickedMus.name;
        for(var key in viewModel.museumResults()) {
            if(clickedMusName === viewModel.museumResults()[key].name) {
            map.panTo(viewModel.museumResults()[key].position);
            map.setZoom(14);
            map.panBy(0, -150);
            //infoWindow.setContent(viewModel.museumResults()[key].content);
            //infoWindow.open(map, viewModel.museumResults()[key].marker);
            viewModel.mobileMusShow(false);
            google.maps.event.trigger(viewModel.museumResults()[key].marker, 'click', showInfoWindow);
            }
        
        }
    }
};

//Error handling if Google Maps fails to load
var mapRequestTimeout = setTimeout(function() {
    $('#map-canvas').html('We had trouble loading Google Maps. Please refresh your browser and try again.');
}, 8000);


var countries = {
  'au': {
    center: new google.maps.LatLng(-25.3, 133.8),
    zoom: 4
  },
  'br': {
    center: new google.maps.LatLng(-14.2, -51.9),
    zoom: 3
  },
  'ca': {
    center: new google.maps.LatLng(62, -110.0),
    zoom: 3
  },
  'fr': {
    center: new google.maps.LatLng(46.2, 2.2),
    zoom: 5
  },
  'de': {
    center: new google.maps.LatLng(51.2, 10.4),
    zoom: 5
  },
  'mx': {
    center: new google.maps.LatLng(23.6, -102.5),
    zoom: 4
  },
  'nz': {
    center: new google.maps.LatLng(-40.9, 174.9),
    zoom: 5
  },
  'it': {
    center: new google.maps.LatLng(41.9, 12.6),
    zoom: 5
  },
  'za': {
    center: new google.maps.LatLng(-30.6, 22.9),
    zoom: 5
  },
  'es': {
    center: new google.maps.LatLng(40.5, -3.7),
    zoom: 5
  },
  'pt': {
    center: new google.maps.LatLng(39.4, -8.2),
    zoom: 6
  },
  'us': {
    center: new google.maps.LatLng(37.1, -95.7),
    zoom: 3
  },
  'uk': {
    center: new google.maps.LatLng(54.8, -4.6),
    zoom: 5
  }
};

//Initialize google map on load

function initialize() {
    var myOptions = {
        zoom: countries['us'].zoom,
        center: countries['us'].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    clearTimeout(mapRequestTimeout);

    // Responsive map by resizing window 
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });

  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });
    places = new google.maps.places.PlacesService(map);

    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

  // Add a DOM event listener to react when the user selects a country.
    google.maps.event.addDomListener(document.getElementById('country'), 'change',
        setAutocompleteCountry);


    ko.applyBindings(viewModel);
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
    search();

    
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
        return;
    }

    var cityname = place.address_components[0].long_name;
    viewModel.wikiHeader(true);
    viewModel.mobblock(true);
    
    viewModel.wikiArray.removeAll();
    viewModel.museumResults.removeAll();
    viewModel.wikiError("");

    // Wikipedia code ajax request

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityname + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function() {
        viewModel.wikiError("failed to get Wikipedia resources");
    },8000);
    
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function( response) {
            var articleList = response[1];
            articleList.forEach(function(articleStr) {
                var url = 'http://wikipedia.org/wiki/' + articleStr;
                viewModel.wikiArray.push({url: url, article: articleStr});
            });

            clearTimeout(wikiRequestTimeout);
        }
    });
}

// Search for museums in the selected city, within the viewport of the map.
function search() {
    var search = {
        bounds: map.getBounds(),
        types: ['museum']
    };

    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

        // Create a marker for each museum found, and
        // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                });
                //create a content for the infowindow for mobile and tablets
                var contentString = '<div id="infowindow">' +
                '<h3>' + results[i].name + '</h3>' +
                '<p>' + results[i].vicinity; + '</p></div>';

                viewModel.museumResults.push({
                    name: results[i].name,
                    markerPic: markers[i].icon,
                    position: markers[i].position,
                    marker: markers[i],
                    content: contentString
                }); //Add the name of museumm to mob results list


                // If the user clicks a museum marker, show the details of that museum
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);

                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);                
                
            }
        }
    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
    viewModel.museumResults([]);
}

// [START region_setcountry]
// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
    if (country == 'all') {
        autocomplete.setComponentRestrictions([]);
        map.setCenter(new google.maps.LatLng(15, 0));
        map.setZoom(2);
    } else {
        autocomplete.setComponentRestrictions({ 'country': country });
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
    clearMarkers();
}
// [END region_setcountry]

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);  
    };
}

function addResult(result, i) {
    
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
    var markerIcon = MARKER_PATH + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 == 0 ? 'rgba(31,81,22,0.8)' : 'rgba(114,93,6,0.8)');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
    };
  

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}


function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for a museum. Show the information in an info window,
// anchored on the marker for the museum that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
    function(place, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.panBy(0, -150);
        buildIWContent(place);
        
        viewModel.infoWindowcontent(true);
        viewModel.infoPlaces.push(place);
    });
}

// Load the place information used by the info window.
function buildIWContent(data) {
    viewModel.name(data.name);
    viewModel.phone('Phone: ' + data.formatted_phone_number);
    if(data.formatted_phone_number == null) {
        viewModel.phone("");
    }

    viewModel.adress('Address: ' + data.vicinity);

    viewModel.website('Website: ' + data.website);
    if(data.website == null) {
        viewModel.website("");
    }

    viewModel.icon(data.icon);
}


// 0 = Name , 1 = description, 2 = lat, 3 = lng

// this unique map style was created with https://snazzymaps.com/editor
var mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#001aff"
            },
            {
                "saturation": "100"
            },
            {
                "weight": "5.21"
            },
            {
                "invert_lightness": true
            },
            {
                "gamma": "1.98"
            },
            {
                "lightness": "16"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": "100"
            },
            {
                "gamma": "2.68"
            },
            {
                "color": "#0b4375"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "20"
            },
            {
                "hue": "#0300ff"
            },
            {
                "gamma": "1.88"
            },
            {
                "weight": "0.67"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": "-18"
            },
            {
                "gamma": "0.71"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "gamma": "0.00"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#091f35"
            },
            {
                "visibility": "on"
            }
        ]
    }
]


var getHTML = {
    
    init:function () {

	var res = "";
	
	$.ajax({
	    url: "js/infowindow.html",
	    type: 'get',
	    dataType: 'html',
	    async: true,
	    
	    success: function(data) {

		var result = data;
		var strArray = result.split('\n');
		var strRes = sanitizeHtml(strArray);

		getHTML = strRes;
	    }
	});
    }
};

// remove things that look like spaces
function sanitizeHtml (strArray){

    var fixedArray = [];
    for (var i = 0; i < strArray.length; i++){

	var newStr = "";
	var currStr = strArray[i];

	// skip empty strings
	if (typeof currStr !== 'undefined'){
	    var copyStart = false;
	    for (var k = 0; k < strArray[i].length; k++){

		// Doesn't equal a space, a non-breaking space, or a horizontal-tab'
		if (currStr.charCodeAt(k) !=  09 &&
		    currStr.charCodeAt(k) !=  32 &&
		    currStr.charCodeAt(k) != 160) {
		    copyStart = true;
		}
		if (copyStart == true) {
		    var endIndex = strArray[i].length;
		    newStr = currStr.substr(k, endIndex);
		    break;
		}
	    }
	    if (copyStart == true) {
		fixedArray.push(newStr);
	    }
	}
    }    
    return fixedArray;
}

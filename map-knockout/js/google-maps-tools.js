// get click position info

var TILE_SIZE = 256;

function getClickInfo() {

    var infoArray = [];
    google.maps.event.addListener(mapdata, 'click', function(event) {

	var lat = event.latLng.lat();
	var lng = event.latLng.lng();

	var zoom = mapdata.getZoom();
	var scale = 1 << zoom;

        var worldCoordinate = latlng2pixelxy(lat, lng);

        var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));

        var tileCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale / TILE_SIZE),
            Math.floor(worldCoordinate.y * scale / TILE_SIZE));

	console.log("scale", scale);
	console.log("zoom", zoom);
	console.log("lat/lng", lat, lng);
	console.log("pixelCoordinate", pixelCoordinate);
	console.log("tileCoordinate", tileCoordinate);
	
	// mapdata.panTo(new google.maps.LatLng(lat, lng));
    });
}

function latlng2pixelxy (lat,lng){
    var siny = Math.sin(lat * Math.PI / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.

    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + lng / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

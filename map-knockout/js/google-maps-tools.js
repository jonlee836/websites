// // get click position info
var TILE_SIZE = 256;
var mapEvents = [
    { event: 'bounds_changed', active: 0 },
    { event: 'center_changed', active: 0 },
    { event: 'click', active: 0 },
    { event: 'dblclick', active: 0 },
    { event: 'drag', active: 0 },
    { event: 'dragend', active: 0 },
    { event: 'dragstart', active: 0 },
    { event: 'heading_changed', active: 0 },
    { event: 'idle', active: 0 },
    { event: 'maptypeid_changed', active: 0 },
    { event: 'mousedown', active: 0 },
    { event: 'mouseout', active: 0 },
    { event: 'mouseover', active: 0 },
    { event: 'mousemove', active: 0 },
    { event: 'mouseup', active: 0 },
    { event: 'projection_changed', active: 0 },
    { event: 'removefeature', active: 0 },
    { event: 'removeproperty', active: 0 },
    { event: 'resize', active: 0 },
    { event: 'rightclick', active: 0 },
    { event: 'setgeometry', active: 0 },
    { event: 'setproperty', active: 0 },
    { event: 'tilesloaded', active: 0 },
    { event: 'tilt_changed', active: 0 },
    { event: 'zoom_changed', active: 0 }
];

function getInfo(mapdata){
    mapEvents.forEach(function(obj) {
	
	google.maps.event.addListener(mapdata, obj.event, function(event){

	    obj.active = 1 - obj.active;
	    console.log(obj.event);
//	    print_eventInfo();

	    var eventCheck = setTimeout(function(){

		if (obj.active == 1){
		    obj.active = 0;
		}
	    }, 200);

	});

    });
}

function print_eventInfo(){
    mapEvents.forEach(function(obj){
	console.log(obj.event, obj.active);
    });
}

function getInfo_OnMouse(mapdata){

    // google.maps.event.addListener(mapdata, 'mousemove', function(event){
    // 	getCoordinates(event);
    // });
    
    google.maps.event.addListener(mapdata, 'click', function(event){
	getCoordinates(event);

    });

}

function getCoordinates(event) {

    var x = window.innerWidth;
    var y = window.innerHeight;

    console.log(event);
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var zoom = mapdata.getZoom();
    var scale = 1 << zoom;

    var worldCoordinate = latlng2xy(lat, lng);

    var pixelCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale),
        Math.floor(worldCoordinate.y * scale));

    var tileCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale / TILE_SIZE),
        Math.floor(worldCoordinate.y * scale / TILE_SIZE));

    var boundPoints = getBounds(mapdata);

    console.clear();
    
    console.log(x, " X ", y);
    console.log("scale", scale);
    console.log("zoom", zoom);
    
    console.log("default center", getDefaultCenterPoint());
    console.log("lat/lng", lat, lng);
    console.log("pixelCoordinate", pixelCoordinate.x, pixelCoordinate.y);
    console.log("tileCoordinate", tileCoordinate.x, tileCoordinate.y);

    var ne = boundPoints[0].getNorthEast();
    var sw = boundPoints[1].getSouthWest();
    
    console.log("North East", ne.lat(), ne.lng());
    console.log("South West", sw.lat(), sw.lng());
    
    //console.log("bounds Yc = North East", mapdata.getBounds().b);
    //console.log("bounds bd = South West", mapdata.getBounds().f);
}

function getDrag(event){
    
}

// google.maps.event.addListener(mapdata, 'mousemove', function(event){
// 	getMouseMove(event);
// });

//    console.log("Idle");
//    console.log("bounds", mapdata.getBounds());

function getBounds(mapdata){

    console.log(mapdata);
    
    var ne = mapdata.getBounds();
    var sw = mapdata.getBounds();

    var bounds = [ne, sw];
    
    return bounds;
}

function getDefaultCenterPoint(){
    return defaultPos;
}

// Remove you have to actually move the mouse
function getCurrCenterPoint(mapdata){

    var lat = mapdata.getCenter().lat();
    var lng = mapdata.getCenter().lat();

    return {lat, lng};
}

function latlng2xy (lat,lng){
    var siny = Math.sin(lat * Math.PI / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.

    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + lng / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

function draggableRect(mapdata){
    
}

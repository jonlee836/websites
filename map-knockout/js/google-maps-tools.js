// get click position info
var TILE_SIZE = 256;
var mapEvents = [
    { event: 'bounds_changed', active: 0, prev: 0 },
    { event: 'center_changed', active: 0, prev: 0 },
    { event: 'click', active: 0, prev: 0 },
    { event: 'dblclick', active: 0, prev: 0 },
    { event: 'drag', active: 0, prev: 0 },
    { event: 'dragend', active: 0, prev: 0 },
    { event: 'dragstart', active: 0, prev: 0 },
    { event: 'heading_changed', active: 0, prev: 0 },
    { event: 'idle', active: 0, prev: 0 },
    { event: 'maptypeid_changed', active: 0, prev: 0 },
    { event: 'mouseout', active: 0, prev: 0 },
    { event: 'mouseover', active: 0, prev: 0 },
    { event: 'mousemove', active: 0, prev: 0 },
    { event: 'projection_changed', active: 0, prev: 0 },
    { event: 'resize', active: 0, prev: 0 },
    { event: 'rightclick', active: 0, prev: 0 },
    { event: 'tilesloaded', active: 0, prev: 0 },
    { event: 'tilt_changed', active: 0, prev: 0 },
    { event: 'zoom_changed', active: 0, prev: 0 }
];

function getInfo(mapdata){
    mapEvents.forEach(function(obj) {
	google.maps.event.addListener(mapdata, obj.event, function(event){
	    obj.active = 1 - obj.active;
	    console.log(obj.event, obj.active, obj.prev);
	});
    });
}

function getMouseMove(event) {

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

    console.log("Yc", boundPoints[0]);
    console.log("bd", boundPoints[1]);
    //console.log("bounds Yc = North East", mapdata.getBounds().b);
    //console.log("bounds bd = South West", mapdata.getBounds().f);

    
    console.log("event", event);
}

function getDrag(event){
    
}

// google.maps.event.addListener(mapdata, 'mousemove', function(event){
// 	getMouseMove(event);
// });

//    console.log("Idle");
//    console.log("bounds", mapdata.getBounds());

function getBounds(mapdata){
    var ne = mapdata.getBounds().b;
    var sw = mapdata.getBounds().f;
    
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

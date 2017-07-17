var navWidth="200px";
var navOnOff=false;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 48.6809657, lng: 44.512527},
	zoom: 10,
	mapTypeId: 'satellite'
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = navWidth;
}


function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

window.onclick = function(event) {     
    if(	!event.target.matches(".button") &&
	!event.target.matches(".sidenav") &&
	!event.target.matches("a") &&
	!event.target.matches(".toggle-button-sidenav") &&
	document.getElementById("mySidenav").style.width == navWidth){
	
	closeNav();
    }
}

window.onload = function(){
    alert
}
    // if (!event.target.matches(".sidenav") && document.getElementById("mySidenav").style.width == navWidth){
    // 	alert("clicked outside")
    // }

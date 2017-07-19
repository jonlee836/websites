var navWidth="200px";
var menuOff = true;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 48.6809657, lng: 44.512527},
	zoom: 10,
	mapTypeId: 'satellite'
    });
}

function openNav() {
    if(document.getElementById("mySidenav").style.width == navWidth){
	closeNav();
    }
    else{
	document.getElementById("mySidenav").style.width = navWidth;
    }
}


function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    menuOff = true;
    
}

window.onclick = function(event) {
    if(	!event.target.matches(".button") &&
	!event.target.matches(".sidenav") &&
	!event.target.matches("p") &&
	!event.target.matches(".toggle-button-sidenav") &&
	!event.target.matches(".nav-button") &&
	document.getElementById("mySidenav").style.width == navWidth) {
		
	closeNav();
    }
    $('#mySidenav').on('click', 'a', function() {
	console.log($(this).index());
    });

}

window.onload = function(){

}
    // if (!event.target.matches(".sidenav") && document.getElementById("mySidenav").style.width == navWidth){
    // 	alert("clicked outside")
    // }

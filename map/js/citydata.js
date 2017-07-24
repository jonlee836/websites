// 0 = Name , 1 = description, 2 = lat, 3 = lng
var data = [
    [
	"Mamayev Kurgan",
	"A strategic hill that splits the city into northern and southern halves. The sheer carnage that raged on the once steep slopes of Mamayev Kurgan had reduced its overall height by several feet. Nothing would grow on the hill until spring of 1944.",
	48.742295,
	44.537050
    ],
    [
	"Grain Elevator",
	"One of the tallest and last standing buildings left in the city. 2 days of sustained fire from tanks, stukas, and artillery did little to the grain elevator. On Sept 16th, 1942 12 tanks from 4th Panzer and grenadiers from 94th Infantry Division mounted a direct assault against the green giant.",
	48.687818,
	44.483573
    ],
    [
	"Spartanovka",
	"The Wehrmacht's encirclement of Stalingrad was complete with the capture of this northern village.",
	48.8183777,
	44.6062698
    ]
]

// read local html file and return it as a string
jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function(data) {
                result = data;
            }
        });

	var strArray = result.split('\n');
	var strRes = sanitizeHtml(strArray);

	return strRes;
    }
});

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

//$(function(e){
//    $("#windowData").load("js/infowindow.html");
//});

//var htmltest = $("#windowData *").contents;
//alert(htmltest.toString());

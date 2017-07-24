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
	"One of the tallest and last standing buildings left in the city. It would continue to remain standing despite direct hits from Wehrmacht tanks, stukas, and even artillery. On Sept 16th, 1942 12 tanks from 4th Panzer and grenadiers from 94th Infantry Division mounted a direct assault against the green giant.",
	48.687818,
	44.483573
    ],
    [
	"Spartanovka",
	"The Wehrmacht's encirclement was complete with the capture of this northern village.",
	48.8183777,
	44.6062698
    ]
]

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


	console.log(result);
	var strArray = result.split('\n');
	var strRes = sanitizeHtml(strArray);

	console.log("strRes " + strRes);

	return strRes;
    }
});

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
		if (currStr.charAt(k) != ' ' &&
		    currStr.charCodeAt(k) != 160 &&
		    currStr.charCodeAt(k) != 09) {
		    copyStart = true;
		}
		if (copyStart == true) {

		    var endIndex = strArray[i].length;
		    newStr = currStr.substr(k, endIndex);
		    console.log(newStr + " " + i  + " currIndex " + k + " endIndex " + currStr.length);
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

var badhtmldata = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="description" content="Portfolio">',
    '<meta name="keywords" content="HTML,CSS,XML,JavaScript">',
    '<meta name="author" content="Jon Lee">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<link href="http://fonts.googleapis.com/css?family=Lato:100,300" rel=""stylesheet"" type=""text/css"">',
    '<link rel="stylesheet" href="css/bootstrap.min.css">',
    '<link rel="stylesheet" href="css/style.css">',
    '<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">',
    '<style>',
    '.info-window {',
    'padding: 0;',
    'margin: 0;',
    'height: 100%;',
    '}',
    '.info-window h1 {',
    'font-size: 18px;',
    'margin-top: 0px;',
    'margin-bottom: 0px;',
    'color: slategrey;',
    '}',
    '.info-window b {',
    'font-family: "Special Elite", cursive;',
    'color: #7b0000;',
    '}',
    '.info-window article {',
    'font-size: 14px:',
    'text-align: left:',
    'color: #053573;',
    'font-family: "Special Elite", cursive;',
    '}',
    '</style>',
    '</head>',
    '<body>',
    '<div class="info-window">',
    '<h1 id="info-header">',
    '<b>',
    'title',
    '</b>',
    '</h1>',
    '<article>',
    'article',
    '</article>',
    '</div>',
    '</body>',
    '</html>'
]


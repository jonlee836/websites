// 0 = Name , 1 = description, 2 = lat, 3 = lng

// this unique map style was created with https://snazzymaps.com/editor

var getHTML = {

	init: function() {

		$.ajax({
			url: "js/infowindow/infowindow.html",
			type: 'get',
			dataType: 'html',
			async: true,

			success: function(data) {

				var result = data;
				var strArray = result.split('\n');
				var strRes = sanitizeHtml(strArray);

				getHTML = strRes;
			},
			error: function (textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
				getHTML = "";
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
				if (copyStart === true) {
					var endIndex = strArray[i].length;
					newStr = currStr.substr(k, endIndex);
					break;
				}
			}
			if (copyStart === true) {
				fixedArray.push(newStr);
			}
		}
	}
	return fixedArray;
}

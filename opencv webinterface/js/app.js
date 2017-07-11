var app = angular.module("app", [
    "ngRoute",
    "MakeGray",
    "Canny",
    "ui.bootstrap"
]);

//http://stackoverflow.com/questions/18571001/file-upload-using-angularjs
//https://docs.angularjs.org/api/ng/service/$http

app.factory('API', function ($http){
    
    return{
	uploadImage: function (formData){
	    return $http.post('/php/upload.php', formData, {
		transformRequest: angular.identity,
		headers: {'Content-Type': undefined}
	    });
	}
    }    
});

app.config(["$routeProvider", function($routeProvider){  // This attaches the controller with the corresponding html that the user selects
    $routeProvider.
	when("../opencv/MakeGray/MakeGray.html",{
	    controller: "MakeGray"
	}).
	when("../opencv/Canny/Canny.html",{
	    controller: "Canny"
	});
    
}]);

app.controller('MainController',['$scope', '$http', 'API', function($scope, $http, API){
    $scope.imageUrl = "";

    $scope.template = "";
    $scope.templates =[
	
	{name: 'select an option...'},
	{name: 'MakeGray', url:'../opencv/MakeGray/MakeGray.html', controller: "MakeGray"},
	{name: 'Canny', url:'../opencv/Canny/Canny.html', controller: "Canny"},
	
    ];    
    
    $scope.template = $scope.templates[0];  
    
    // DISPLAY PROCESSED

    // UPLOAD IMAEGS : if upload button is pushed image is shown to user and image is uploaded to server for use
    $scope.UploadFile = function() 
    {
	var form_img    = document.getElementById('form_img').files[0];  // name of image	
	var form_filter = document.getElementById('form_filter').value;

	if (form_img.size < 20000000) //2mb
	{ 
	    if (
		form_img.type === "image/jpeg" ||      // Add image or video types as needed
		form_img.type === "image/jpg"  ||
		    form_img.type === "image/png"  ||
		    form_img.type === "image/bmp"  )
	    {

		var ReadImage   = new FileReader();
		ReadImage.onloadend = function(Image)
		{
		    
		    var img      = Image.target.result;   // convert image from user to base64
		    var imgsize  = Image.total;	    	   
		    var imgname  = Math.random() + "_" + form_img.name; // create unique id

		    var filter   = form_filter;
		    var formData = new FormData();
		    
		    $("#img1").prop("src", img);  // Display image

		    formData.append("img", img);
		    formData.append("imgsize", imgsize);
		    formData.append("imgname", imgname);
		    formData.append("filter", filter);
		    
		    API.uploadImage(formData)
			.success(function (imgUrl)
				 {
				     $scope.imageUrl = imgname;
				 })
			.error (function (error){});
		    
		}
		ReadImage.readAsDataURL(form_img);
	    }
	    else {alert("FILE IS NOT AN IMAGE");}
	}
	else {alert("IMAGE IS TOO LARGE");}
    }
    
}]);

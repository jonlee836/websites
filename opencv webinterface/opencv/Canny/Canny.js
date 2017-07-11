var Canny = angular.module("Canny", ["ui.bootstrap"]);

Canny.controller("Canny", ["$scope", "$http", function($scope, $http){

    $scope.Canny_Button = function(){
	if ($scope.imageUrl){

	    var Canny_FormData = new FormData();	  	   

	    Canny_FormData.append("FileName", $scope.imageUrl);
	    Canny_FormData.append("Thresh", $scope.selectedRange);

	    $http({
		method : "POST",
		url    : "../opencv/Canny/Canny.php",
		data   : Canny_FormData,
		transformRequest : angular.identity,
		headers: {"Content-Type" : undefined}
	    }).success(function(data){
		$scope.data = data;
		$("#img2").prop("src", data);
	    })	    
	}
	else {
	    alert("Please upload an image");
	}
    }   
}]);

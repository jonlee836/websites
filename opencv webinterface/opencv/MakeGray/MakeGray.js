var MakeGray = angular.module("MakeGray", ["ui.bootstrap"]);

MakeGray.controller("MakeGray",["$scope", "$http", function($scope, $http ){
    
    $scope.MakeGray_Button = function(){
	if ($scope.imageUrl) {

	    var MakeGray_Form = new FormData();
	    MakeGray_Form.append("FileName", $scope.imageUrl);

	    $http({
		method : "POST",
		url    : "../opencv/MakeGray/MakeGray.php",
		data   : MakeGray_Form,
		transformRequest: angular.identity,
		headers: {'Content-Type': undefined}
	    }).success(function(data){
		$scope.data = data;
		$("#img2").prop("src", data);
	    })
	}
	else{
	    alert("Please upload an image");
	}
    }
}]);

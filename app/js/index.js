var myAngular= angular.module("myAngular",["ngRoute"]);

myAngular.controller("myControl", function($scope){});

myAngular.config(function($routeProvider) {
$routeProvider
	.when("/", { templateUrl: "./home.html" })
	.when("/movies", { templateUrl: "./movies/movies.html", contoller: "myControl" })
	.when("/series", { templateUrl: "./series/series.html", contoller: "myControl" }).otherwise({ redirectTo:"./home.hmtl"});
});

myAngular.directive("movies", function() {
return {
    controller: function($scope,$http, $filter) {
		$scope.isLoading = true;
		$http
          .get(
            "../json/sample.json"
          )
          .then(function(response) {
			$scope.isLoading = false;
			$scope.movies = response.data.entries.filter( item => item.programType === "movie" && item.releaseYear >= 2010);
			
			$scope.movies = $filter('orderBy')($scope.movies, 'title').slice(0, 21).map(
				data => {
					return {images:Object.values(data.images), title: data.title};
				}
			)
          	}, function(response){
				$scope.statusError="Oops, something went wrong..."
		})
	}}});

myAngular.directive("series", function() {
return {
    controller: function($scope,$http, $filter) {
		$scope.isLoading = true;
		$http
          .get(
            "../json/sample.json"
          )
          .then(function(response) {
			$scope.isLoading = false;
			$scope.series = response.data.entries.filter( item => item.programType === "series" && item.releaseYear >= 2010);
			
			$scope.series = $filter('orderBy')($scope.series, 'title').slice(0, 21).map(
				data => {
					return {images:Object.values(data.images), title: data.title};
				}
			)
          }, function(response){
			$scope.statusError="Oops, something went wrong..."
		})
	}}});


$('#wrapper').on('click', '.button', function(e) {
	e.preventDefault();
	console.log('clicked');
});

var myapp = angular.module("myapp", ["firebase"]);

function WeatherController($scope, angularFire) {
	$scope.hoods = [{
		value: 'The Richmond',
		id: 'the-richmond'
	}, {
		value: 'The Presidio',
		id: 'the-presidio'
	}, {
		value: 'North Beach',
		id: 'north-beach'
	}, {
		value: 'Golden Gate Park',
		id: 'ggp'
	}, {
		value: 'NOPA',
		id: 'nopa'
	}, {
		value: 'Tenderloin',
		id: 'tenderloin'
	}, {
		value: 'The Sunset',
		id: 'the-sunset'
	}, {
		value: 'The Haight',
		id: 'the-haight'
	}, {
		value: 'SOMA',
		id: 'soma'
	}, {
		value: 'The Mission',
		id: 'the-mission'
	}, {
		value: 'Financial District',
		id: 'fidi'
	}, {
		value: 'Nob Hill',
		id: 'nob-hill',
	}, {
		value: 'Russian Hill',
		id: 'russian-hill'
	}, {
		value: 'Chinatown',
		id: 'chiatown'
	}, {
		value: 'The Marina',
		id: 'marina'
	}, {
		value: 'Hayes Valley',
		id: 'hayes-valley'
	}];

	$scope.init = function(neighborhood) {

		$scope.neighborhood = neighborhood;

		var ref = new Firebase("https://angular-experiment.firebaseio.com/" + neighborhood);
		$scope.sunny = 0;
		$scope.foggy = 0;
		$scope.weather = "sunny";
		angularFire(ref.child("sunny"), $scope, "sunny");
		angularFire(ref.child("foggy"), $scope, "foggy");

		$scope.$watch("sunny", updateWeather);
		$scope.$watch("foggy", updateWeather);

		function updateWeather() {

			if ($scope.sunny >= $scope.foggy) {
				$scope.weather = "sunny";
			} else {
				$scope.weather = "foggy";
			}
		}
	};
}
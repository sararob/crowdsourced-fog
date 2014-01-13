var myapp = angular.module("myapp", ["firebase"]);

function WeatherController($scope, $firebase) {
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
		id: 'chinatown'
	}, {
		value: 'The Marina',
		id: 'marina'
	}, {
		value: 'Hayes Valley',
		id: 'hayes-valley'
	}];
}

function NeighborhoodController($scope, $firebase, Firebase) {
   $scope.init = function(neighborhood) {
      // bind Firebase data to scope variable 'data'
      var FBURL = "https://angular-experiment.firebaseio.com/";
      $scope.data = $firebase(new Firebase(FBURL + neighborhood));

      // monitor data for updates and check weather setting
      $scope.data.$on('loaded', checkWeather);
      $scope.data.$on('change', checkWeather);

		$scope.updateCount = function(forecast) {
			//Increment counter in Firebase using a transaction
         var forecastRef = new Firebase(FBURL + neighborhood);
			forecastRef.transaction(function(current_val) {
            // initialize the data if this neighborhood hasn't been saved before
            if( !current_val ) { current_val = {sunny: 0, foggy: 0, forecast: 0}; }

            current_val.forecast++;
            current_val[forecast]++;
            return current_val;
			});
      };
   };

	//Check values to display sun or fog image
   function checkWeather() {
      if ($scope.data.sunny >= $scope.data.foggy) {
			$scope.weather = "sunny";
		} else {
			$scope.weather = "foggy";
		}
	}
}
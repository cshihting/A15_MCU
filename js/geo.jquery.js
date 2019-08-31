(function ( $ ) {
	$.fn.GeoLocation = function( options ) {
		var settings = $.extend({
			home: { latitude: 53.339381, longitude: -6.260533 },
		}, options );
		
		var home = new google.maps.LatLng(settings.home.latitude, settings.home.longitude);
			 
		return this.each(function() {	
			var element = $(this);
			element.text('Attempting to find your location');
			
			function displayCurrentPosition(data) {
				element.html('<div class="map-canvas"></div>');
				
				var current = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
				
				var options = {
					center: current,
					mapTypeId: google.maps.MapTypeId.HYBRID,
					zoom: 10,
				};
				
				var map = new google.maps.Map(element[0], options);
					
				var directions = {
					origin: current,
					destination: home,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				};
				
				display = new google.maps.DirectionsRenderer({ map: map });
				
				service = new google.maps.DirectionsService();
				service.route(directions, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						display.setDirections(response);
					}
					else
						alert ('failed to get directions');
				});
			}
			
			function onError(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						element.text('Access to location API denied by user');
						break;
					case error.POSITION_UNAVAILABLE:
						element.text('Unable to determine location');
						break;
					case error.TIMEOUT:
						element.text('Unable to determine location, the request timed out');
						break;
					case error.UNKNOWN_ERROR:
						element.text('An unknown error occurred!');
						break;
				}
			}
			
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(displayCurrentPosition, onError);
			} else {
				element.text('Geolocation is not supported by this browser, please upgrade to a more recent version');
			}
		});
 
	};
 
}( jQuery ));
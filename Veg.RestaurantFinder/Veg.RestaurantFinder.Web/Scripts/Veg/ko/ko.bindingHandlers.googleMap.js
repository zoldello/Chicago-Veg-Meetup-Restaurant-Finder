; (function (ko, google, navigator, toastr, _) {
    'use strict';

    ko.bindingHandlers.googleMap = {
        // Creates the map and marks the user's location on it
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var drawMap = function (latLng, markerName, bindingContext) {
                var mapOptions = {
                    zoom: 15,
                    center: latLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                //    noGeolocationSupported = function () {
                //        var markerNameNoGeolocation = 'Chicago',
                //            latLng;

                //        this.toastr.warn('Automatic location detection', 'Automatic location detection is not supported by this browser. Manually add location');

                //        this.bindingContext.$root.userLocation.latitude = '41.45654';
                //        this.bindingContext.$root.userLocation.longitude = '-87.655555'; // some location in Chicago
                //        this.latLng = new google.maps.LatLng(bindingContext.$root.userLocation.latitude, bindingContext.$root.userLocation.longitude);

                //        drawMap(latLng, markerNameNoGeolocation, bindingContext);
                //    };

                bindingContext.$root.restaurantMap = new google.maps.Map(element, mapOptions); //  this is preserved

                var infowindow = new google.maps.InfoWindow({
                    map: bindingContext.$root.restaurantMap,
                    position: latLng,
                    content: 'You are here'
                });

                bindingContext.$root.userLocation.marker = new google.maps.Marker({ // also preserved
                    position: latLng,
                    map: bindingContext.$root.restaurantMap,
                    title: markerName
                });
            };

            // note, drawMap is called in a callback when there is geolocation
            if (!navigator.geolocation) {
                
                var markerNameNoGeolocation = 'Chicago',
                    latLng;

                toastr.warn('Automatic location detection', 'Automatic location detection is not supported by this browser. Manually add location');

                bindingContext.$root.locationAutoDetectable(false);
                bindingContext.$root.userLocation.latitude = '41.45654';
                bindingContext.$root.userLocation.longitude = '-87.655555'; // some location in Chicago
                latLng = new google.maps.LatLng(bindingContext.$root.userLocation.latitude, bindingContext.$root.userLocation.longitude);

                drawMap(latLng, markerNameNoGeolocation, bindingContext);
                
               // _.bind(noGeolocationSupported, { bindingContext: bindingContext, drawMap: drawMap, toastr: toastr });

            } else {
                navigator.geolocation.getCurrentPosition(
                    _.bind(function (position) { // user allowed access to location
                        var markerNameWithGeolocation = "Your present location",
                        latitudeLongitude = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // user's current location

                        bindingContext.$root.locationAutoDetectable(true);
                        bindingContext.$root.userLocation.latitude = position.coords.latitude;
                        bindingContext.$root.userLocation.longitude = position.coords.longitude;

                        toastr.info('Your browser supports auto detected. No need to add your address');

                        this.drawMap(latitudeLongitude, markerNameWithGeolocation, this.bindingContext); // this (function context) is set by _.bind. 
                    }, { drawMap: drawMap, bindingContext: bindingContext }),
                    _.bind(function () { // user disallowed access to location. Bummer!
                       // TODO: Clean this up. This has code duplication, made to get around call back hell for prototype. Final product should not have this
                            var markerNameNoGeolocation = 'Chicago',
                                latLng;

                            bindingContext.$root.locationAutoDetectable(false);
                            this.toastr.error('Automatic location detection', 'Permssion to use Automatic location detecti was denied. Manually add location');

                            this.bindingContext.$root.userLocation.latitude = '41.45654';
                            this.bindingContext.$root.userLocation.longitude = '-87.655555'; // some location in Chicago
                            latLng = new google.maps.LatLng(bindingContext.$root.userLocation.latitude, bindingContext.$root.userLocation.longitude);

                            drawMap(latLng, markerNameNoGeolocation, bindingContext);
                        
            }, { bindingContext: bindingContext, drawMap: drawMap, toastr: toastr }));
            }
        },

        // Marks restaurants
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor()),
                direction = ko.unwrap(allBindings()).updateDirection,
                latLng = null,
                marker = null;

            if (!value) {
                return;
            }

            latLng = new google.maps.LatLng(value.latitude, value.longitude);
            marker = bindingContext.$root.currentSelectedRestaurant.marker;

            if (marker !== null) {
                //    marker.setMap(null); // delete old marker
            }

            // create new marker
            bindingContext.$root.currentSelectedRestaurant.marker = new google.maps.Marker({
                position: latLng,
                map: bindingContext.$root.restaurantMap,
                title: value.Name
            });

            direction(true);
        }
    };
})(window.ko, window.google, window.navigator, window.toastr, window._);
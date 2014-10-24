; (function (ko, $, restaurantFinderViewModel, restaurantFinderDataAccess) {
    'use strict';

    $(function () {
        var success = function (data) {
            restaurantFinderViewModel.restaurants(data);
            ko.applyBindings(restaurantFinderViewModel);
        };
        
        restaurantFinderDataAccess.get(null, success, null, null);
    });
})(window.ko, window.jQuery, window.veg.restaurantFinderViewModel, window.veg.restaurantFinderDataAccess);
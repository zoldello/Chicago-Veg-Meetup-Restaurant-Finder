; (function (ko, $) {
    'use strict';

    ko.bindingHandlers.selectRestaurant = {
        init: function (element, valueAccessor, allBindings, vm, bindingContext) {
            var i = 0,
                value = ko.unwrap(valueAccessor()),
                data = bindingContext.$data;
            
            $(element).on('change', { value: value, data: data }, function (e) {
                var t = 0;
                e.data.value(data);
            })
        },
        update: function (element) {
            var i = 0;
           // $('.v-restuarantPicker').find('input[type="checkbox"]').attr('checked', false);
            //$(element).attr('checked', true);

        }
    };
})(window.ko, window.jQuery);
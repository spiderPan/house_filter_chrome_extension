jQuery(function($) {
    console.log('gogogo');
    var region = {
        'N5Y': 'West Huron Heights / Carling',
        'N5Z': 'Glen Cairn',
        'N6L': 'East Tempo',
        'N5W': 'SW Argyle / Hamilton Road',
        'N5X': 'Fanshawe / Stoneybrook / Stoney Creek / Uplands / East Masonville',
        'N6H': 'Central Hyde Park / Oakridge',
        'N6J': 'Southcrest / East Westmount / West Highland',
        'N6M': 'Jackson / Old Victoria / Bradley / North Highbury',
        'N6N': 'South Highbury / Glanworth / East Brockley / SE Westminster',
        'N6P': 'Talbot / Lambeth / West Tempo / South Sharon Creek',
        'N5V': 'YXU / North and East Argyle / East Huron Heights',
        'N6C': 'East Highland / North White Oaks / North Westminster',
        'N6E': 'South White Oaks / Central Westminster / East Longwoods / West Brockley',
        'N6G': 'Sunningdale / West Masonville / Medway / NE Hyde Park / East Fox Hollow',
        'N6K': 'Riverbend / Woodhull / North Sharon Creek / Byron / West Westmount',
        'N6B': 'Central',
        'N6A': 'UWO'
    };

    $('.address-compressed').each(function() {
        var _this = $(this),
            addressText = _this.text(),
            locationId = _this.parent()
        cachedAddresses = GetLocalStorage(),
            parameters = {
                address: addressText,
                key: "AIzaSyAB3oK4CG__cS7vrZrYo5PsmK3njoTI26g"
            },
            url = 'https://maps.googleapis.com/maps/api/geocode/json';

        if (!cachedAddresses.hasOwnProperty(addressText)) {
            $.get(
                url,
                parameters,
                function(data) {
                    if (!data.hasOwnProperty('results')) {
                        return;
                    }
                    var address = data.results[0].address_components,
                        postal = address[address.length - 1].long_name,
                        newAddress = {}

                    for (var post in region) {
                        if (postal.indexOf(post) > -1) {
                            newAddress[addressText] = region[post];
                            $.extend(cachedAddresses, newAddress);
                            localStorage.setItem('address-info', JSON.stringify(cachedAddresses));
                            _this.append('<h2>' + region[post] + '</h2>');
                            return;
                        }
                    }
                }
            );
        } else {
            _this.append('<h2>' + cachedAddresses[addressText] + '</h2>');
        }
    });


    function GetLocalStorage() {
        var cachedInfo = localStorage.getItem('address-info');

        if (cachedInfo) {
            return JSON.parse(cachedInfo);
        } else {
            localStorage.setItem('address-info', {});
            return {};
        }
    }
});

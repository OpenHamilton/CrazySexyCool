var MAPBOXID = 'mattgrande.k9op8lfc'

var getWaterfalls = function( map ) {

    var markers = L.markerClusterGroup();

    $.get('waterfalls.geojson', function( response ) {
        var waterfalls = JSON.parse( response );
        _.map( waterfalls.features, function( waterfall ) {
            var coordinates = waterfall.geometry.coordinates[0];
            var marker = L.marker( [ coordinates[1], coordinates[0] ], { title: waterfall.properties.NAME });

            marker.bindPopup( getPopupData( waterfall.properties ) );
            markers.addLayer( marker );
        });

        map.addLayer( markers );
    });
};

var getPopupData = function( waterfall ) {
    // var html = $('#waterfall-template').html();
    if ( waterfall.ALT_NAME !== 'no data' ) {
        waterfall.NAME = waterfall.NAME + ' / ' + waterfall.ALT_NAME;
    }
    return _.template( _waterfallTemplate, waterfall );
};

$(document).ready(function() {
    var map = L.map('map').setView([43.2518089, -79.9134231], 11);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/' + MAPBOXID + '/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16})
        .on('locationfound', function( position ) {
                // console.log('routing...');
                // L.Routing.control({
                //     waypoints: [
                //         L.latLng(43.2578823,-79.9386173),
                //         L.latLng(43.236368032381549, -80.012444945763875)
                //     ]
                // }).addTo(map);
                // console.log('routed');
        });

    getWaterfalls( map );

});

/** TEMPLATES START **/


var _waterfallTemplate = '<strong>Name:</strong> <%- NAME %><br/>' +
'<strong>Type:</strong> <%- TYPE %><br/>' +
'<strong>Ranking:</strong> <%- RANKING %><br/>' +
'<strong>Height:</strong> <%- HGHT_IN_M %>m<br/>' +
'<strong>Width:</strong> <%- WIDTH_IN_M %>m<br/>' +
'<strong>Access Point:</strong> <%- ACCESS_PNT %><br/>';

/** TEMPLATES END **/

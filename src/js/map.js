function initMap() {
    var coordinates = {lat: 48.467970, lng: 135.066785},
        popupContent = '<div class="map_onhover">' +
                       '<div class="logo">Веб-студия, создание сайтов</div>' +
                       '<div class="geo">Хабаровск, Калинина 21, офис 612</div>' +
                       '<div class="flex">' +
                       '<div class="phone">8 (4212) 555-333</div>' +
                       '<div class="mail"><a href="mailto:mail@mail.ru">mail@itha.ru</a></div>' +
                       '</div>' +
                       '</div>',
        image = 'images/marker.png',
        zoom = 14,


        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: zoom,
            disableDefaultUI: true,
            scrollwheel: false
        });

        infowindow = new google.maps.InfoWindow({
            content: popupContent
        });

        marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: image
        });

        marker.addListener('click', function () {
            marker.setAnimation(null);
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        infowindow.open(map, marker);
}

$(document).ready(function() {
    initMap();
});
window.Map = {
  setup: function () {
    console.log("load map");
    L.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.2/images';

    LMap = L.map('map', {
      center: [55.69355674255854, 12.57462302180043],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(LMap);
  },
  addMarker: function (lat, lng) {
    L.marker(lat, lng);
  },
  addMarkers: function (eats, removeMarkers) {
    //if (removeMarkers) this.removeMarkers();

    var markers = [];
    var latlngs = [];

    eats.forEach(function(venue) {
      // markers.push({

      var lat = venue.location.lat;
      var lng = venue.location.lng;


      var latlng = L.latLng(lat, lng);
      //
      // if (lat && lng) {
      //   console.log(lat, lng);
      //   L.marker([lat, lng]).addTo(map);
      // }

      latlngs.push(latlng);
      markers.push(L.marker(latlng));


    });

    if (window.currentLayerGroup) {
      this.removeMarkers();
    }

    window.currentLayerGroup = L.layerGroup(markers);
    window.currentLayerGroup.addTo(LMap);

    //bounds = L.latLngBounds(latlng);
    LMap.fitBounds(latlngs);

    console.log(eats);

    // map.fitBounds(map.getBounds());
    // map.addMarkers(markers);
    // map.setZoom(12);



  },
  removeMarkers: function () {
    window.currentLayerGroup.clearLayers();
  }
};

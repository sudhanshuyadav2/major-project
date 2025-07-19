
	mapboxgl.accessToken = maptoken;
    
    const map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/streets-v9',
        style: 'mapbox://styles/mapbox/streets-v11',


        projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
        zoom: 1,
        center:(listing.geometry.coordinates) ///starting position [lang,lat]
    });


map.on('load', () => {
  // Optional effects
  map.setFog({});
  map.rotateTo(90, { duration: 30000 });

  // Create popup
  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h4>${listing.location}</h4><p>Welcome to this listing!</p>`
  );

  // Create marker
  new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates) // [lng, lat]
    .setPopup(popup)
    .addTo(map);
});


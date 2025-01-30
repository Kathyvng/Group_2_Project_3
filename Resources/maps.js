/*maplibre  website use for this with some modification is https://maplibre.org/maplibre-gl-js/docs/examples/hover-styles/  */

const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [-128.486052, 50.830348],
    zoom: 2.5
    });

    let hoveredStateId = null;
     
           // Add a layer showing the places.
    let popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
        });


    map.on('load', () => {
        map.addSource('states', {
            'type': 'geojson',
            'data':
                'https://maplibre.org/maplibre-gl-js/docs/assets/us_states.geojson'
        });

        // The feature-state dependent fill-opacity expression will render the hover effect
        // when a feature's hover state is set to true.
    map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
            
        'layout': {},
        'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': [
                    'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }});
       

        map.addLayer({
            'id': 'state-borders',
            'type': 'line',
            'source': 'states',
            'layout': {},
            'paint': {
                'line-color': '#627BC1',
                'line-width': 2
            }
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'state-fills', (e) => {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState(
                        {source: 'states', id: hoveredStateId},
                        {hover: false}
                    );
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                    {source: 'states', id: hoveredStateId},
                    {hover: true}
                );
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'state-fills', () => {
            if (hoveredStateId) {
                map.setFeatureState(
                    {source: 'states', id: hoveredStateId},
                    {hover: false}
                );
            }
            hoveredStateId = null;
        });

        map.on('mousemove', 'state-fills', (e) => {

            new maplibregl.Popup()

            .setLlngLat(e.setLlngLat)
            .setHTML('<H3>'+"hello"+ '</H3>') 
            .addTo(map)});
        
    ////////////////////////////////////////////////////////////
    



    ////////////////////////
    
    let popup1 = new maplibregl.Popup({offset: 50}).setText(
        'Wisconsin, USA:36% of the population engage in some type of exercise. 34% of the population is classified as overweight. '
        +"Daniel's data");

    let popup2 = new maplibregl.Popup({offset: 50}).setText(
        "West Virginia, USA: 30% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup3 = new maplibregl.Popup({offset: 50}).setText(
        "Vermont, USA:39% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup4 = new maplibregl.Popup({offset: 50}).setText(
        "Texas,USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup5 = new maplibregl.Popup({offset: 50}).setText(
        "South Dakota, USA:33% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup6 = new maplibregl.Popup({offset: 50}).setText(
        "Rhode Island,USA:33% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup7 = new maplibregl.Popup({offset: 50}).setText(
        "Oregon, USA: 39% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup8 = new maplibregl.Popup({offset: 50}).setText(
        "New York, USA: 34% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup9 = new maplibregl.Popup({offset: 50}).setText(
        "New Hampshire, USA: 38% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup10 = new maplibregl.Popup({offset: 50}).setText(
        "Nebraska, USA:33% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup11 = new maplibregl.Popup({offset: 50}).setText(
        "Kansas,USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup12 = new maplibregl.Popup({offset: 50}).setText(
        "Mississippi, USA: 28% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup13 = new maplibregl.Popup({offset: 50}).setText(
        "Illinois, USA:35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");

    
    let popup14 = new maplibregl.Popup({offset: 50}).setText(
        "Delaware, USA:34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup15 = new maplibregl.Popup({offset: 50}).setText(
        "Connecticut,USA:35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup16 = new maplibregl.Popup({offset: 50}).setText(
        "Arkansas, USA:31% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup17 = new maplibregl.Popup({offset: 50}).setText(
        "Indiana, USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup18 = new maplibregl.Popup({offset: 50}).setText(
        "Missouri, USA: 31% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup19 = new maplibregl.Popup({offset: 50}).setText(
        "Florida, USA:36% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup20 = new maplibregl.Popup({offset: 50}).setText(
        "Nevada, USA: 35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup21 = new maplibregl.Popup({offset: 50}).setText(
        "Maine, USA:36% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup22 = new maplibregl.Popup({offset: 50}).setText(
        "Michigan, USA: 35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup23 = new maplibregl.Popup({offset: 50}).setText(
        "Georgia, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup24 = new maplibregl.Popup({offset: 50}).setText(
        "Hawaii, USA: 40% of the population engage in some type of exercise. 30% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup25 = new maplibregl.Popup({offset: 50}).setText(
        "Alaska, USA: 39% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup26 = new maplibregl.Popup({offset: 50}).setText(
        "Tennessee, USA: 30% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup27 = new maplibregl.Popup({offset: 50}).setText(
        "Virginia, USA: 35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup28 = new maplibregl.Popup({offset: 50}).setText(
        "New Jersey, USA:35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup29 = new maplibregl.Popup({offset: 50}).setText(
        "Kentucky, USA: 30% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup30 = new maplibregl.Popup({offset: 50}).setText(
        "North Dakota, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup31 = new maplibregl.Popup({offset: 50}).setText(
        "Minnesota, USA: 36% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup32 = new maplibregl.Popup({offset: 50}).setText(
        "Oklahoma,USA:29% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup33 = new maplibregl.Popup({offset: 50}).setText(
        "Montana, USA:40% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup34 = new maplibregl.Popup({offset: 50}).setText(
        "Washington, USA:38% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup35 = new maplibregl.Popup({offset: 50}).setText(
        "Utah, USA: 37% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup36 = new maplibregl.Popup({offset: 50}).setText(
        "Colorado, USA: 41% of the population engage in some type of exercise. 29% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup37 = new maplibregl.Popup({offset: 50}).setText(
        "Ohio, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup38 = new maplibregl.Popup({offset: 50}).setText(
        "Alabama, USA: 30% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup39 = new maplibregl.Popup({offset: 50}).setText(
        "Iowa, USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight.  "
        +"Daniel's data");
    
    let popup40 = new maplibregl.Popup({offset: 50}).setText(
        "New Mexico, USA: 38% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup41 = new maplibregl.Popup({offset: 50}).setText(
        "South Carolina, USA:34% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup42 = new maplibregl.Popup({offset: 50}).setText(
        "Pennsylvania, USA: 32% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup43 = new maplibregl.Popup({offset: 50}).setText(
        "Arizona, USA: 37% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup44 = new maplibregl.Popup({offset: 50}).setText(
        "Maryland, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup45 = new maplibregl.Popup({offset: 50}).setText(
        "Massachusetts, USA: 35% of the population engage in some type of exercise. 30% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup46 = new maplibregl.Popup({offset: 50}).setText(
        "California, USA: 39% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup47 = new maplibregl.Popup({offset: 50}).setText(
        "Idaho, USA: 37% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup48 = new maplibregl.Popup({offset: 50}).setText(
        "Wyoming, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup49 = new maplibregl.Popup({offset: 50}).setText(
        "North Carolina, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Daniel's data");
    
    let popup50 = new maplibregl.Popup({offset: 50}).setText(
        "Louisiana, USA: 31% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Daniel's data");
    
    
    
       
    
     // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker';

    const marker = new maplibregl.Marker()
        .setLngLat([-89.500000, 44.500000])
        .setPopup(popup1)
        
        .addTo(map);
    const marker2 = new maplibregl.Marker()
        .setLngLat([-80.500000, 39.000000])
        .setPopup(popup2)
        .addTo(map);
    const marker3 = new maplibregl.Marker()
        .setLngLat([-72.699997, 44.000000])
        .setPopup(popup3)
        .addTo(map);
   
    const marker4 = new maplibregl.Marker()
        .setLngLat([-100.000000,31.000000])
        .setPopup(popup4)
        .addTo(map);
    const marker5 = new maplibregl.Marker()
        .setLngLat([-71.742332,41.742325 ])
        .setPopup(popup6)
        .addTo(map);
    
        const marker6 = new maplibregl.Marker()
        .setLngLat([-120.500000,44.000000])
        .setPopup(popup7)
        .addTo(map);
    const marker7 = new maplibregl.Marker()
        .setLngLat([-75.000000,43.000000])
        .setPopup(popup8)
        .addTo(map);
    const marker8 = new maplibregl.Marker()
        .setLngLat([-71.500000,44.000000 ])
        .setPopup(popup9)
        .addTo(map);
   
    const marker9 = new maplibregl.Marker()
        .setLngLat([-100.000000,41.500000 ])
        .setPopup(popup5)
        .addTo(map);
    
     const marker10 = new maplibregl.Marker()
        .setLngLat([-100.000000,44.500000 ])
        .setPopup(popup10)
        .addTo(map);
     const marker11 = new maplibregl.Marker()
        .setLngLat([-98.000000,38.500000 ])
        .setPopup(popup11)
        .addTo(map);

     const marker12 = new maplibregl.Marker()
        .setLngLat([-90.000000,33.000000 ])
        .setPopup(popup12)
        .addTo(map);

     const marker13 = new maplibregl.Marker()
        .setLngLat([-89.000000,40.000000 ])
        .setPopup(popup13)
        .addTo(map);

     const marker14 = new maplibregl.Marker()
        .setLngLat([-75.500000,39.000000 ])
        .setPopup(popup14)
        .addTo(map);

     const marker15 = new maplibregl.Marker()
        .setLngLat([-72.699997,41.599998 ])
        .setPopup(popup15)
        .addTo(map);
    
     const marker16 = new maplibregl.Marker()
        .setLngLat([-92.199997,34.799999 ])
        .setPopup(popup16)
        .addTo(map);
    
    const marker17 = new maplibregl.Marker()
        .setLngLat([-86.126976,40.273502 ])
        .setPopup(popup17)
        .addTo(map);
     
    const marker18 = new maplibregl.Marker()
        .setLngLat([-92.603760,38.573936 ])
        .setPopup(popup18)
        .addTo(map);
    const marker19 = new maplibregl.Marker()
        .setLngLat([-81.760254,27.994402 ])
        .setPopup(popup19)
        .addTo(map);
    
    const marker20 = new maplibregl.Marker()
        .setLngLat([-117.224121,39.876019 ])
        .setPopup(popup20)
        .addTo(map);
    
    const marker21 = new maplibregl.Marker()
        .setLngLat([-68.972168,45.367584 ])
        .setPopup(popup21)
        .addTo(map);
    const marker22 = new maplibregl.Marker()
        .setLngLat([-84.506836,44.182205 ])
        .setPopup(popup22)
        .addTo(map);
    
    const marker23 = new maplibregl.Marker()
        .setLngLat([-83.441162,33.247875 ])
        .setPopup(popup23)
        .addTo(map);
    const marker24 = new maplibregl.Marker()
        .setLngLat([-155.844437,19.741755 ])
        .setPopup(popup24)
        .addTo(map);
    const marker25 = new maplibregl.Marker()
        .setLngLat([-153.369141,66.160507 ])
        .setPopup(popup25)
        .addTo(map);
    const marker26 = new maplibregl.Marker()
        .setLngLat([-86.660156 , 35.860119])
        .setPopup(popup26)
        .addTo(map);
    
    const marker27 = new maplibregl.Marker()
        .setLngLat([ -78.024902,37.926868 ])
        .setPopup(popup27)
        .addTo(map);
    const marker28 = new maplibregl.Marker()
        .setLngLat([-74.871826 ,39.833851 ])
        .setPopup(popup28)
        .addTo(map);
    
    const marker29 = new maplibregl.Marker()
        .setLngLat([-84.270020 , 37.839333])
        .setPopup(popup29)
        .addTo(map);
    
    const marker30 = new maplibregl.Marker()
        .setLngLat([-100.437012 ,47.650589 ])
        .setPopup(popup30)
        .addTo(map);
    
    const marker31 = new maplibregl.Marker()
        .setLngLat([-94.636230 ,46.392410 ])
        .setPopup(popup31)
        .addTo(map);
    
    const marker32 = new maplibregl.Marker()
        .setLngLat([-96.921387 ,36.084621 ])
        .setPopup(popup32)
        .addTo(map);
    
    const marker33 = new maplibregl.Marker()
        .setLngLat([-109.533691 , 46.965260])
        .setPopup(popup33)
        .addTo(map);
    
    const marker34 = new maplibregl.Marker()
        .setLngLat([-120.740135 , 47.751076])
        .setPopup(popup34)
        .addTo(map);
    
    const marker35 = new maplibregl.Marker()
        .setLngLat([-111.950684 , 39.419220])
        .setPopup(popup35)
        .addTo(map);
    
    const marker36 = new maplibregl.Marker()
        .setLngLat([-105.358887 ,39.113014 ])
        .setPopup(popup36)
        .addTo(map);
    
    const marker37 = new maplibregl.Marker()
        .setLngLat([-82.996216 , 40.367474])
        .setPopup(popup37)
        .addTo(map);
    
    const marker38 = new maplibregl.Marker()
        .setLngLat([-86.902298 , 32.318230])
        .setPopup(popup38)
        .addTo(map);
    
    const marker39 = new maplibregl.Marker()
        .setLngLat([-93.581543 , 42.032974])
        .setPopup(popup39)
        .addTo(map);
    
    const marker40 = new maplibregl.Marker()
        .setLngLat([ -106.018066,34.307144 ])
        .setPopup(popup40)
        .addTo(map);
    
    const marker41 = new maplibregl.Marker()
        .setLngLat([ -81.163727,33.836082 ])
        .setPopup(popup41)
        .addTo(map);
    
    const marker42 = new maplibregl.Marker()
        .setLngLat([ -77.194527, 41.203323])
        .setPopup(popup42)
        .addTo(map);
    
    const marker43 = new maplibregl.Marker()
        .setLngLat([-111.093735 ,34.048927 ])
        .setPopup(popup43)
        .addTo(map);
    
    const marker44 = new maplibregl.Marker()
        .setLngLat([ -76.641273, 39.045753])
        .setPopup(popup44)
        .addTo(map);
    
    const marker45 = new maplibregl.Marker()
        .setLngLat([ -71.382439, 42.407211])
        .setPopup(popup45)
        .addTo(map);
    
    const marker46 = new maplibregl.Marker()
        .setLngLat([-119.417931 , 36.778259])
        .setPopup(popup46)
        .addTo(map);
    
    const marker47 = new maplibregl.Marker()
        .setLngLat([ -114.742043,44.068203 ])
        .setPopup(popup47)
        .addTo(map);
    
    const marker48 = new maplibregl.Marker()
        .setLngLat([-107.290283 ,43.075970 ])
        .setPopup(popup48)
        .addTo(map);
    
    const marker49 = new maplibregl.Marker()
        .setLngLat([-80.793457 ,35.782169 ])
        .setPopup(popup49)
        .addTo(map);
    
    const marker50 = new maplibregl.Marker()
        .setLngLat([ -92.329102,30.391830 ])
        .setPopup(popup50)
        .addTo(map);
        
    });
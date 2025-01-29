/*maplibre  website use for this with some modification is https://maplibre.org/maplibre-gl-js/docs/examples/hover-styles/  */

const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [-128.486052, 50.830348],
    zoom: 2.5
    });
    let hoveredStateId = null;

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
            }
        });

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
    });
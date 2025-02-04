





/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    
                                    /*AHN__HEALH_STATS_PAGE JAVASCRIPT BELOW */

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener("DOMContentLoaded", function () {
    const stateSelect = document.getElementById("state-select");
    const questionSelect = document.getElementById("question-select");

    let jsonData = [];

    // Load JSON data using Fetch API
    function loadJsonData() {
        fetch('nutrition_obesity_cleaned.json')  // Ensure the file path is correct
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                populateDropdowns();
            })
            .catch(error => {
                console.error("Error loading JSON data:", error);
                alert("Failed to load data. Check console for errors.");
            });
    }

    // Populate dropdowns with unique states and questions
    function populateDropdowns() {
        const uniqueStates = [...new Set(jsonData.map(entry => entry.State))].sort();
        const uniqueQuestions = [...new Set(jsonData.map(entry => entry.Question))].sort();

        // Populate State dropdown
        stateSelect.innerHTML = uniqueStates.map(state => `<option value="${state}">${state}</option>`).join("");
        
        // Populate Question dropdown
        questionSelect.innerHTML = uniqueQuestions.map(question => `<option value="${question}">${question}</option>`).join("");

        // Set default selections (National and Obesity Percentage)
        const defaultState = "National";
        const defaultQuestion = "Percent of adults aged 18 years and older who have obesity";

        // Check if the default values exist in the available options
        if (uniqueStates.includes(defaultState)) {
            stateSelect.value = defaultState;
        }

        if (uniqueQuestions.includes(defaultQuestion)) {
            questionSelect.value = defaultQuestion;
        }

        // Load initial chart
        updateCharts();
    }

    // Function to update both charts based on selected state and question
    function updateCharts() {
        const selectedState = stateSelect.value;
        const selectedQuestion = questionSelect.value;

        // Filter the data based on selected state and question
        const filteredData = jsonData.filter(entry => entry.State === selectedState && entry.Question === selectedQuestion);

        if (filteredData.length === 0) {
            alert("No data available for this selection.");
            return;
        }

        // Prepare data for both charts
        const years = filteredData.map(entry => entry.Year);
        const weightedData = filteredData.map(entry => entry.Weighted_Data_Value);
        const totalSample = filteredData.map(entry => entry.Total_Sample_Size);
        const highConfidence = filteredData.map(entry => entry.Weighted_High_Confidence_Limit);
        const lowConfidence = filteredData.map(entry => entry.Weighted_Low_Confidence_Limit);

        // Bubble Chart - Years vs Total Sample Size with bubble size as Weighted Data Value
        const bubbleChartData = [{
            x: years,
            y: totalSample,
            mode: 'markers',
            marker: {
                size: weightedData,  // Bubble size based on Weighted Data Value
                color: weightedData,
            },
            text: years.map((year, index) => `Year: ${year}<br>Total Sample Size: ${totalSample[index]}<br>Average Data Value: ${weightedData[index]}`),
            type: 'scatter'
        }];

        const bubbleChartLayout = {
            title: `${selectedQuestion}<br>Total Sample Size vs Year`,
            xaxis: { title: 'Year' },
            yaxis: { title: 'Total Sample Size' },
            showlegend: false
        };

        // Bar Chart - Multiple bars for Weighted Data Value, High Confidence, Low Confidence
        const barChartData = [
            {
                x: years,
                y: weightedData,
                type: 'bar',
                name: 'Average Data Value',
                marker: { color: '#73b2ff' }
            },
            {
                x: years,
                y: highConfidence,
                type: 'bar',
                name: 'Average High Confidence Limit',
                marker: { color: '#fea3b8' }
            },
            {
                x: years,
                y: lowConfidence,
                type: 'bar',
                name: 'Average Low Confidence Limit',
                marker: { color: '#98d9da' }
            }
        ];

        const barChartLayout = {
            title: `${selectedQuestion}<br>Data Value and Confidence Levels vs Year`,
            barmode: 'group',
            xaxis: { title: 'Year' },
            yaxis: { title: 'Value' },
            showlegend: true
        };

        // Plot the bubble chart
        Plotly.newPlot('bubble-chart', bubbleChartData, bubbleChartLayout);

        // Plot the bar chart
        Plotly.newPlot('bar-chart', barChartData, barChartLayout);
    }

    // Event listeners for dropdown changes
    stateSelect.addEventListener('change', updateCharts);
    questionSelect.addEventListener('change', updateCharts);

    // Load JSON data on page load
    loadJsonData();
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    
                                    /*KATHEY_STATE_AND_TOPIC_PAGE JAVASCRIPT BELOW */

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("lineChart").getContext("2d");
    let lineChart; // Store chart instance
    let jsonData = []; // Store loaded JSON data

    const stateSelect = document.getElementById("state-select");
    const topicSelect = document.getElementById("topic-select");

    // Function to load JSON data using Fetch API
    function loadJsonData() {
        fetch("/final_Static_Deliverables/Chronic_Disease_Indicators_Avg.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    console.error("No data found in JSON.");
                    alert("No data found. Please check the JSON file.");
                    return;
                }

                console.log("JSON Data Loaded:", data); // Debugging

                jsonData = data;
                populateDropdowns(); // Populate dropdowns with unique values
            })
            .catch(error => {
                console.error("Error loading JSON data:", error);
                alert("Failed to load data. Check console for errors.");
            });
    }

    // Function to populate dropdowns with unique values
    function populateDropdowns() {
        const uniqueStates = [...new Set(jsonData.map(entry => entry.LocationDesc))].sort();
        const uniqueTopics = [...new Set(jsonData.map(entry => entry.CDI_Topic))].sort();

        if (uniqueStates.length === 0 || uniqueTopics.length === 0) {
            console.error("No unique states or topics found.");
            alert("Data missing for states or topics.");
            return;
        }

        console.log("States Loaded:", uniqueStates); // Debugging
        console.log("Topics Loaded:", uniqueTopics); // Debugging

        // Populate State dropdown
        stateSelect.innerHTML = uniqueStates.map(state => `<option value="${state}">${state}</option>`).join("");

        // Populate Topic dropdown
        topicSelect.innerHTML = uniqueTopics.map(topic => `<option value="${topic}">${topic}</option>`).join("");

        // Set default selections and update chart
        stateSelect.value = uniqueStates[0];
        topicSelect.value = uniqueTopics[0];

        updateChart();
    }

    // Function to update the chart based on selected state & topic
    function updateChart() {
        const selectedState = stateSelect.value;
        const selectedTopic = topicSelect.value;

        console.log("Selected State:", selectedState); // Debugging
        console.log("Selected Topic:", selectedTopic); // Debugging

        // Filter data based on selected state and topic
        let filteredData = jsonData.filter(entry => entry.LocationDesc === selectedState && entry.CDI_Topic === selectedTopic);

        if (filteredData.length === 0) {
            console.warn("No data available for the selected State and Topic.");
            alert("No data available for this selection.");
            return;
        }

        // Ensure data is sorted chronologically (2011-2021)
        filteredData.sort((a, b) => a.YearEnd - b.YearEnd);

        // Extract YearEnd (X-axis) and avg_CDI_DataValue (Y-axis)
        const YearEnd = filteredData.map(entry => entry.YearEnd);
        const avg_CDI_DataValue = filteredData.map(entry => entry.avg_CDI_DataValue);

        console.log("Filtered & Sorted Data:", filteredData); // Debugging
        console.log("YearEnd (Chronological):", YearEnd); // Debugging
        console.log("Avg CDI Value:", avg_CDI_DataValue); // Debugging

        if (lineChart) {
            // Update existing chart with new data
            lineChart.data.labels = YearEnd;
            lineChart.data.datasets[0].data = avg_CDI_DataValue;
            lineChart.data.datasets[0].label = `${selectedTopic} in ${selectedState}`;
            lineChart.update();
        } else {
            // Create a new chart if it doesn't exist
            lineChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: YearEnd,
                    datasets: [{
                        label: `${selectedTopic} in ${selectedState}`,
                        data: avg_CDI_DataValue,
                        borderColor: "#007bff",
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Year"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Avg CDI Data Value"
                            }
                        }
                    }
                }
            });
        }
    }

    // Event listeners for dropdown changes
    stateSelect.addEventListener("change", updateChart);
    topicSelect.addEventListener("change", updateChart);

    // Load JSON data on page load
    loadJsonData();
});









/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    
                                    /*MAP_HOMEPAGE JAVASCRIPT BELOW */

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1200, Chronic Obstructive Pulmonary Disease: 480");

    let popup2 = new maplibregl.Popup({offset: 50}).setText(
        "West Virginia, USA: 30% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1185, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup3 = new maplibregl.Popup({offset: 50}).setText(
        "Vermont, USA:39% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1176, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup4 = new maplibregl.Popup({offset: 50}).setText(
        "Texas,USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1200, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup5 = new maplibregl.Popup({offset: 50}).setText(
        "South Dakota, USA:33% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1197, Arthritis: 583");
    
    let popup6 = new maplibregl.Popup({offset: 50}).setText(
        "Rhode Island,USA:33% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1287, Arthritis: 704");
    
    let popup7 = new maplibregl.Popup({offset: 50}).setText(
        "Oregon, USA: 39% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup8 = new maplibregl.Popup({offset: 50}).setText(
        "New York, USA: 34% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup9 = new maplibregl.Popup({offset: 50}).setText(
        "New Hampshire, USA: 38% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1272, Arthritis: 704");
    
    let popup10 = new maplibregl.Popup({offset: 50}).setText(
        "Nebraska, USA:33% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1293, Arthritis: 704");
    
    let popup11 = new maplibregl.Popup({offset: 50}).setText(
        "Kansas,USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup12 = new maplibregl.Popup({offset: 50}).setText(
        "Mississippi, USA: 28% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup13 = new maplibregl.Popup({offset: 50}).setText(
        "Illinois, USA:35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");

    
    let popup14 = new maplibregl.Popup({offset: 50}).setText(
        "Delaware, USA:34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1284, Arthritis: 704");
    
    let popup15 = new maplibregl.Popup({offset: 50}).setText(
        "Connecticut,USA:35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup16 = new maplibregl.Popup({offset: 50}).setText(
        "Arkansas, USA:31% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Chronic Disease Data: 3072, Cardiovascular Disease: 1293, Arthritis: 704");
    
    let popup17 = new maplibregl.Popup({offset: 50}).setText(
        "Indiana, USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup18 = new maplibregl.Popup({offset: 50}).setText(
        "Missouri, USA: 31% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup19 = new maplibregl.Popup({offset: 50}).setText(
        "Florida, USA:36% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup20 = new maplibregl.Popup({offset: 50}).setText(
        "Nevada, USA: 35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup21 = new maplibregl.Popup({offset: 50}).setText(
        "Maine, USA:36% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1275, Arthritis: 704");
    
    let popup22 = new maplibregl.Popup({offset: 50}).setText(
        "Michigan, USA: 35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup23 = new maplibregl.Popup({offset: 50}).setText(
        "Georgia, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup24 = new maplibregl.Popup({offset: 50}).setText(
        "Hawaii, USA: 40% of the population engage in some type of exercise. 30% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1287, Arthritis: 704");
    
    let popup25 = new maplibregl.Popup({offset: 50}).setText(
        "Alaska, USA: 39% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1293, Arthritis: 704");
    
    let popup26 = new maplibregl.Popup({offset: 50}).setText(
        "Tennessee, USA: 30% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1194, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup27 = new maplibregl.Popup({offset: 50}).setText(
        "Virginia, USA: 35% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1200, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup28 = new maplibregl.Popup({offset: 50}).setText(
        "New Jersey, USA:35% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup29 = new maplibregl.Popup({offset: 50}).setText(
        "Kentucky, USA: 30% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup30 = new maplibregl.Popup({offset: 50}).setText(
        "North Dakota, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1278, Arthritis: 70");
    
    let popup31 = new maplibregl.Popup({offset: 50}).setText(
        "Minnesota, USA: 36% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup32 = new maplibregl.Popup({offset: 50}).setText(
        "Oklahoma,USA:29% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup33 = new maplibregl.Popup({offset: 50}).setText(
        "Montana, USA:40% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1281, Arthritis: 704");
    
    let popup34 = new maplibregl.Popup({offset: 50}).setText(
        "Washington, USA:38% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1200, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup35 = new maplibregl.Popup({offset: 50}).setText(
        "Utah, USA: 37% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1200, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup36 = new maplibregl.Popup({offset: 50}).setText(
        "Colorado, USA: 41% of the population engage in some type of exercise. 29% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup37 = new maplibregl.Popup({offset: 50}).setText(
        "Ohio, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup38 = new maplibregl.Popup({offset: 50}).setText(
        "Alabama, USA: 30% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup39 = new maplibregl.Popup({offset: 50}).setText(
        "Iowa, USA: 32% of the population engage in some type of exercise. 34% of the population is classified as overweight.  "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup40 = new maplibregl.Popup({offset: 50}).setText(
        "New Mexico, USA: 38% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup41 = new maplibregl.Popup({offset: 50}).setText(
        "South Carolina, USA:34% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1280, Arthritis: 639");
    
    let popup42 = new maplibregl.Popup({offset: 50}).setText(
        "Pennsylvania, USA: 32% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup43 = new maplibregl.Popup({offset: 50}).setText(
        "Arizona, USA: 37% of the population engage in some type of exercise. 32% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup44 = new maplibregl.Popup({offset: 50}).setText(
        "Maryland, USA: 34% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup45 = new maplibregl.Popup({offset: 50}).setText(
        "Massachusetts, USA: 35% of the population engage in some type of exercise. 30% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1293, Arthritis: 704");
    
    let popup46 = new maplibregl.Popup({offset: 50}).setText(
        "California, USA: 39% of the population engage in some type of exercise. 31% of the population is classified as overweight. "
        +"Chronic Disease Data: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup47 = new maplibregl.Popup({offset: 50}).setText(
        "Idaho, USA: 37% of the population engage in some type of exercise. 33% of the population is classified as overweight. "
        +"Chronic Disease Data: 3072, Cardiovascular Disease: 1290, Arthritis: 704");
    
    let popup48 = new maplibregl.Popup({offset: 50}).setText(
        "Wyoming, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1185, Chronic Obstructive Pulmonary Disease: 480");
    
    let popup49 = new maplibregl.Popup({offset: 50}).setText(
        "North Carolina, USA:32% of the population engage in some type of exercise. 34% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    let popup50 = new maplibregl.Popup({offset: 50}).setText(
        "Louisiana, USA: 31% of the population engage in some type of exercise. 35% of the population is classified as overweight. "
        +"Chronic Disease Data: Cancer: 3072, Cardiovascular Disease: 1296, Arthritis: 704");
    
    
    
       
    
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
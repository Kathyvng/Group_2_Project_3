d3.json("disease_counts.json").then(data => {
    const excludedLocations = ["Guam", "District of Columbia", "Virgin Islands", "United States", "Puerto Rico"];
    const stateDiseaseCounts = {};

    data.forEach(({ LocationDesc: state, CDI_Topic: disease, Count: count }) => {
        if (!excludedLocations.includes(state)) {
            stateDiseaseCounts[state] = stateDiseaseCounts[state] || [];
            stateDiseaseCounts[state].push({ topic: disease, count });
        }
    });

    const stateSelect = d3.select("#state-select");
    Object.keys(stateDiseaseCounts).forEach(state => {
        stateSelect.append("option").text(state).attr("value", state);
    });

    function updateChart(selectedState) {
        const diseases = stateDiseaseCounts[selectedState]
            .sort((a, b) => b.count - a.count)
            .slice(0, 7); 

        const totalCount = diseases.reduce((sum, d) => sum + d.count, 0);
        const pieChartData = diseases.map(d => ({
            topic: d.topic,
            count: d.count,
            percentage: ((d.count / totalCount) * 100).toFixed(2)
        }));

        Plotly.newPlot("charts-container", [{
            labels: pieChartData.map(d => d.topic),
            values: pieChartData.map(d => d.count),
            type: 'pie',
            textinfo: 'label+percent',
            hoverinfo: 'label+percent'
        }], { title: `Disease Distribution in ${selectedState}`, height: 800, width: 800 });
    }

    const initialState = Object.keys(stateDiseaseCounts)[0];
    updateChart(initialState);

    stateSelect.on("change", function() {
        updateChart(this.value);
    });

}).catch(error => console.error('Error loading JSON:', error));
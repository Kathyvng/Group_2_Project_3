document.addEventListener("DOMContentLoaded", function () {
    // ---------------- First Chart (State and Topic) - Line Chart ----------------
    const ctx = document.getElementById("lineChart")?.getContext("2d");
    let lineChart; // Instance for the first chart (line chart)
    const stateSelect = document.getElementById("state-select");
    const topicSelect = document.getElementById("topic-select");

    // ---------------- Second Chart (State and Question) - Line Chart ----------------
    const ctx2 = document.getElementById("lineChart2")?.getContext("2d");
    let lineChart2; // Instance for the second chart (line chart)
    const stateSelect2 = document.getElementById("state-select2");
    const questionSelect = document.getElementById("question-select");

    let jsonData = []; // To store loaded JSON data

    // Function to load JSON data using the Fetch API
    function loadJsonData() {
        fetch("/final_Static_Deliverables/Data/CDI_Avg_Topic_Questions.json")
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
                console.log("JSON Data Loaded:", data);
                jsonData = data;
                populateDropdowns();   // Populate dropdowns for the first chart
                populateDropdowns2();  // Populate dropdowns for the second chart
            })
            .catch(error => {
                console.error("Error loading JSON data:", error);
                alert("Failed to load data. Check console for errors.");
            });
    }

    // ---------------- Dropdowns and Update for the First Chart (Line Chart) ----------------
    function populateDropdowns() {
        const uniqueStates = [...new Set(jsonData.map(entry => entry.LocationDesc))].sort();
        const uniqueTopics = [...new Set(jsonData.map(entry => entry.CDI_Topic))].sort();

        if (uniqueStates.length === 0 || uniqueTopics.length === 0) {
            console.error("No unique states or topics found.");
            alert("Data missing for states or topics.");
            return;
        }

        stateSelect.innerHTML = uniqueStates
            .map(state => `<option value="${state}">${state}</option>`)
            .join("");
        topicSelect.innerHTML = uniqueTopics
            .map(topic => `<option value="${topic}">${topic}</option>`)
            .join("");

        // Set default selections and update the chart
        stateSelect.value = uniqueStates[0];
        topicSelect.value = uniqueTopics[0];
        updateChart();
    }

    // Update first chart: Create a line chart by grouping data by YearEnd and averaging avg_CDI_DataValue.
    function updateChart() {
        const selectedState = stateSelect.value;
        const selectedTopic = topicSelect.value;

        // Filter data based on selected state and topic
        let filteredData = jsonData.filter(entry =>
            entry.LocationDesc === selectedState && entry.CDI_Topic === selectedTopic
        );

        if (filteredData.length === 0) {
            alert("No data available for this selection in the first chart.");
            return;
        }

        // Group the filtered data by YearEnd and compute the average avg_CDI_DataValue for each year.
        const aggregatedData = {};
        filteredData.forEach(entry => {
            let year = entry.YearEnd;
            if (!aggregatedData[year]) {
                aggregatedData[year] = { sum: 0, count: 0 };
            }
            aggregatedData[year].sum += entry.avg_CDI_DataValue;
            aggregatedData[year].count += 1;
        });

        // Create sorted arrays for the x-axis (unique years) and the averaged values.
        const YearEndUnique = Object.keys(aggregatedData).sort((a, b) => a - b);
        const avgValues = YearEndUnique.map(year => aggregatedData[year].sum / aggregatedData[year].count);

        if (lineChart) {
            // Update existing line chart with new data
            lineChart.data.labels = YearEndUnique;
            lineChart.data.datasets[0].data = avgValues;
            lineChart.data.datasets[0].label = `${selectedTopic} in ${selectedState}`;
            lineChart.update();
        } else {
            // Create a new line chart if it doesn't exist
            lineChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: YearEndUnique,
                    datasets: [{
                        label: `${selectedTopic} in ${selectedState}`,
                        data: avgValues,
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
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // ---------------- Dropdowns and Update for the Second Chart (Line Chart) ----------------
    function populateDropdowns2() {
        const uniqueStates = [...new Set(jsonData.map(entry => entry.LocationDesc))].sort();
        const uniqueQuestions = [...new Set(jsonData.map(entry => entry.CDI_Question))].sort();

        if (uniqueStates.length === 0 || uniqueQuestions.length === 0) {
            console.error("No unique states or questions found.");
            alert("Data missing for states or questions.");
            return;
        }

        stateSelect2.innerHTML = uniqueStates
            .map(state => `<option value="${state}">${state}</option>`)
            .join("");
        questionSelect.innerHTML = uniqueQuestions
            .map(question => `<option value="${question}">${question}</option>`)
            .join("");

        // Set default selections and update the second chart
        stateSelect2.value = uniqueStates[0];
        questionSelect.value = uniqueQuestions[0];
        updateChart2();
    }

    // Update second chart based on the selected state and question.
    function updateChart2() {
        const selectedState = stateSelect2.value;
        const selectedQuestion = questionSelect.value;

        let filteredData = jsonData.filter(entry =>
            entry.LocationDesc === selectedState && entry.CDI_Question === selectedQuestion
        );

        if (filteredData.length === 0) {
            alert("No data available for this selection in the second chart.");
            return;
        }

        // Sort data by YearEnd in chronological order
        filteredData.sort((a, b) => a.YearEnd - b.YearEnd);

        // Extract the arrays for the x-axis (YearEnd) and y-axis (avg_CDI_DataValue)
        const YearEnd = filteredData.map(entry => entry.YearEnd);
        const avg_CDI_DataValue = filteredData.map(entry => entry.avg_CDI_DataValue);

        if (lineChart2) {
            // Update existing line chart with new data
            lineChart2.data.labels = YearEnd;
            lineChart2.data.datasets[0].data = avg_CDI_DataValue;
            lineChart2.data.datasets[0].label = `${selectedQuestion} in ${selectedState}`;
            lineChart2.update();
        } else {
            // Create a new line chart if it doesn't exist
            lineChart2 = new Chart(ctx2, {
                type: "line",
                data: {
                    labels: YearEnd,
                    datasets: [{
                        label: `${selectedQuestion} in ${selectedState}`,
                        data: avg_CDI_DataValue,
                        borderColor: "#28a745", // Different color for distinction
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

    // ---------------- Event Listeners ----------------
    // For the first chart (State and Topic - Line Chart)
    stateSelect.addEventListener("change", updateChart);
    topicSelect.addEventListener("change", updateChart);

    // For the second chart (State and Question - Line Chart)
    stateSelect2.addEventListener("change", updateChart2);
    questionSelect.addEventListener("change", updateChart2);

    // Load the JSON data on page load
    loadJsonData();
});

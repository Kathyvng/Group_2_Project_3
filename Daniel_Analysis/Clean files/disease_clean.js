d3.json("disease_counts.json").then(data => {
  const stateDiseaseCounts = {};
  
  // Define locations to exclude
  const excludedLocations = [
      "Guam",
      "District of Columbia",
      "Virgin Islands",
      "United States",
      "Puerto Rico"
  ];

  // Group data by state, excluding certain locations
  for (const entry of data) {
      const state = entry.LocationDesc;

      // Check if the state is in the excluded locations
      if (excludedLocations.includes(state)) {
          continue; // Skip this entry if it's in the excluded list
      }

      const disease = entry.CDI_Topic;
      const count = entry.Count;

      if (!stateDiseaseCounts[state]) {
          stateDiseaseCounts[state] = [];
      }
      stateDiseaseCounts[state].push({ topic: disease, count: count });
  }

  // Find top 3 diseases per state
  const topDiseasesPerState = {};

  for (const state in stateDiseaseCounts) {
      // Sort diseases by count in descending order
      const sortedDiseases = stateDiseaseCounts[state].sort((a, b) => b.count - a.count);
      // Take the top 3
      topDiseasesPerState[state] = sortedDiseases.slice(0, 3);
  }

  console.log(topDiseasesPerState);
}).catch(error => {
  console.error('Error loading the JSON data:', error);
});



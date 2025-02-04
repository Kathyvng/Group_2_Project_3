# Group_2_Project_3
---
---
# Health and Chronic Disease Visualization Dashboard

## Project Overview
This project explores trends and disparities in physical activity, obesity, and chronic diseases across U.S. states, aiming to provide a data-driven dashboard for informed public health decisions. The dashboard uses interactive maps and charts to visualize health statistics, chronic disease indicators, and other key health metrics for each state in the U.S. The ultimate goal is to empower users to understand regional health trends and make better decisions to improve public health.

## Features and How to Use

/ (root directory)
  └── index.html          # Main HTML file
  └── final_Static_Deliverables/
        └── css/
            └── global_style.css
        └── js/
            └── global_script.js


### Homepage (Map Overview)
The homepage displays an interactive map of the U.S. where users can hover over and click on state markers to see basic health statistics, including:
- Obesity percentage
- Percentage of people who participate in physical exercise
- Top Chronic Disease Indicators for each state  
[Link to HTML page: map_Homepage.html](./map_Homepage.html)

### Health Statistics Page
The second page provides detailed health statistics in a bar chart format. It allows users to explore specific health indicators, such as physical activity, obesity, and nutrition. The survey covers important health indicators with sample sizes ranging from 7,000 to 2.8 million, ensuring the data is representative of the broader population.  
[Link to HTML page: ahn_Health Stats_page.html](./ahn_Health%20Stats_page.html)

### Chronic Disease Indicators Page
The third page focuses on chronic disease indicators, showcasing trends in diseases such as arthritis, cancer, diabetes, etc. Users can select a state and topic to explore a 10-year trendline for that condition. The second chart offers further insights into specific survey questions related to each chronic disease.  
[Link to HTML page: kathy_State_and Topic_page.html](./kathy_State%20and%20Topic_page.html)

## Ethical Considerations
Throughout the development of this project, we ensured that ethical considerations were at the forefront. The data was sourced from reputable government datasets (CDC and U.S. Department of Health and Human Services) and was anonymized to protect individual privacy. We aimed to present health information in an accurate, clear, and transparent manner, ensuring that users can make informed decisions based on reliable data. We also took care to avoid misrepresenting or oversimplifying complex health issues, especially in relation to chronic diseases that may affect vulnerable populations.

## Data Sources: (Raw data from Data.gov was released before recent changes in the U.S. Administration, ensuring access to the information prior to any modifications.)
- **CDC – Nutrition, Physical Activity, and Obesity Dataset**: `nutrition_obesity_cleaned.json` and `miguel_mongodb_panda_percentage_data_collection.ipynb`
- **U.S. Dept of Health and Human Services – U.S. Chronic Disease Indicators Dataset**: `CDI_Avg_Topic_Questions.json`

Data for this project is stored in MongoDB and was cleaned through querying and removing unnecessary fields before being converted into two separate JSON files for use in the dashboard. Additionally, Python-powered Jupyter Notebooks were utilized to refine and extract data more effectively for the map.

## Technology Stack
- **Languages**: Jupyter Notebook (Python for data cleaning), JavaScript, HTML, CSS
- **Libraries**: Maplibre (for map visualizations), Chart.js (for interactive charts)

## Deliverables
- 3 HTML pages: `map_Homepage.html`, `ahn_Health Stats_page.html`, `kathy_State_and Topic_page.html`
- `final_Static_Deliverables` folder containing the Data folder, `global_script.js`, and `group2_project3_final_ppt.pdf`

## Group Members
- Kathy Nguyen
- Anh Pham
- Miguel Soriano
- Daniel Cabrera

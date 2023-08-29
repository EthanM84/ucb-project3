
**UCB Data Analysis Bootcamp**
# PROJECT 3

---------------
#### Purpose:
Investigate the potential future impact of computer automation on jobs across the U.S. using data obtained from two sources:
- US Bureau of Labor Statictics
- "The Future of Employment: How Susceptible are Jobs to Computerization?"; Carl Benedikt Frey and Michael A. Osborne; September 17, 2013

The former provides current information pertaining to the number of people employed in distinct categorical occupations within every U.S. state.  The latter assigns a probability ratings for each occupation using a complex algorithm pertaining to the likelihood of obsolescence due to computer automation. By merging these two datasets we can get a better idea of which occupations may be lost to technology and how many jobs might be impacted/lost in each state.

Analysis requires database management, data cleansing, data scraping and multiple data visualizations.  Each of these components exist separately within this resository.  There are plans to consolidate in a timely manner. (Coming soon!)

With regard to the associated dynamic map with rich text on click, data was limited to those occupations which scored a probability of 80% or higher. The number associated with each state in the tooltip of the map is equivalent to the sum of all jobs per state within the filtered dataset.  A click event function was added to make additional information accessible for each state.  By clicking on the name, a bar chart is displayed in a popup.  This bar chart constitues the 10 occupations with the highest likelihood of being lost to automation within the next couple of decades along with the number of people currently employed with a matching job title.  Note:  Most of these have a probability rating of 98-99%.  

P.S. Must use CORS unblocking when running the html file!!

---------------
#### Allocation of Responsibilities:
While this is considered a group project, the workload was compartmentalized and allocated to the [4] members of the group who were able to actively participate in the project.
- One person was responsible for data scraping,
- Another was responsible for data extraction and transformation for upload into a shared database,
- The third was assigned to generating data visualizations associated with top states impacted,
- And the final member was assigned to generate an interactive map using a novel JavaScript library.

We experienced setbacks in obtaining and formatting the datasets which required alternative strategies at every step.  I can only speak to the challenges associated with the development of the map itself, which was one of the biggest projects I have ever undertaken.  I am pleased with the final product despite the difficulties faced during development. - rjh

--------------
#### Contents of Repository:  
- 1 x README file
- 2 x .pdf files
  - 1 x Occupation Trends by State.pdf  (slideshow presentation for Project 3)
  - 1 x The_Future_of_Employment.pdf  (academic paper which served as source data for analysis)

SEE FOLDER LABELED "DataScraping"
- Code Script
  - 2 x Python files (app.py, scraper.py)

SEE FOLDER LABELED "NEW_data_files"
- Code Script
  - 1 x JavaScript file (Job_Loss_from_Automation_map_FINAL.js)
- Data Files  
  - Note: These data files were only provided to support data analysis and visualization efforts in parallel with database creation and data cleansing. They will ultimately be rendered obsolete once the datasets have been duplicated in the associated database.
  - 3 x .csv files (Automation_Probability_Data_2.csv, automation_data_by_state_2.csv, occupation_salary_2.csv)
  - 1 x .xlsx file (occupation_salary_2.xlsx)
- NOTES  
  - Please disregard.  These are instructional notes intended for members of Group 5.
- "Project 3 pie chart" Folder
  - 2 x .js files (Pie chart-1.js, bar chart data.js)
- "bar chart 1 python" Folder
  - 1 x .ipynb file (bar_chart_solution.ipynb)

SEE FOLDER LABELED "RONDA_WIP"
- Code Script
  - 1 x JavaScript file (Job_Loss_from_Automation_map_FINAL.js)
- Supporting Scripts
  - 1 x .css file (style.css)
  - 1 x html file (index.html)
- Resources Folder
  - 2 x .csv files (automation_data_by_state_2.csv, occupation_salary_2.csv)

-------------------
#### Contributions:  
Thank you to Chris Barr and Michał who both contributed to my plea for support on Stackoverflow.
[StackOverflow URL](https://stackoverflow.com/questions/76909891/difficulty-rendering-rich-information-on-click-map-using-jquery)


------------------
#### License:
[MIT](https://choosealicense.com/licenses/mit/)

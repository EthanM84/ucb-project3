
**UCB Data Analysis Bootcamp**
# PROJECT 3

---------------
#### Purpose:
Generate a dynamic map using data merged from two sources:
- US Bureau of Labor Statictics
- "The Future of Employment: How Susceptible are Jobs to Computerization?"; Carl Benedikt Frey and Michael A. Osborne; September 17, 2013

The former provides current information pertaining to the number of people employed in distinct categorical occupations within every U.S. state.  The latter assigns a probability ratings for each occupation using a complex algorithm pertaining to the likelihood of obsolescence due to computer automation. By merging these two datasets we can get a better idea of which occupations may be lost to technology and how many jobs might be impacted/lost in each state.

For inclusion in the associated map, data was limited to those occupations which scored a probability of 80% or higher. The number associated with each state in the tooltip of the map is equivalent to the sum of all jobs per state within the filtered dataset.  A click event function was added to make additional information accessible for each state.  By clicking on the name, a bar chart is displayed in a popup.  This bar chart constitues the 10 occupations with the highest likelihood of being lost to automation within the next couple of decades along with the number of people currently employed with a matching job title.  Note:  Most of these have a probability rating of 98-99%.  

P.S. Must use CORS unblocking when running the html file!!

---------------
#### Allocation of Responsibilities:
While this is considered a group project, the workload was compartmentalized and allocated to the four individuals assigned to Group 5.
- One person was responsible for data scraping,
- Another was responsible for data extraction and transformation for upload into a shared database,
- The third was assigned to generating data visualizations associated with top states impacted,
- And the final member was assigned to generate an interactive map using a novel JavaScript library.

We experienced setbacks in obtaining and formatting the datasets which required alternative strategies at every step.  I can only speak to the challenges associated with the development of the map itself, which was one of the biggest projects I have ever undertaken.  I am pleased with the final product despite the difficulties faced during development.

--------------
#### Contents of Repository:  
SEE FOLDER LABELED "RONDA_WIP"
- Code Script
  - 1 x JavaScript file (Job_Loss_from_Automation_map_FINAL.js)
- Supporting Scripts
  - 1 x .css file (style.css)
  - 1 x html file (index.html)
- Resources Folder
  - 2 x .csv files (automation_data_by_state_2.csv, occupation_salary_2.csv)
- 1 x README file

Note:  I created the two .csv files to allow for the initiation of data analysis. Ultimately, these files became the sole data source for the project.

-------------------
#### Contributions:  
Thank you to Chris Barr and Michał who both contributed to my plea for support on Stackoverflow.
https://stackoverflow.com/questions/76909891/difficulty-rendering-rich-information-on-click-map-using-jquery

They provided a light in my darkest hour.  Plus, now I know how to post on StackOverflow!

------------------
#### License:
[MIT](https://choosealicense.com/licenses/mit/)

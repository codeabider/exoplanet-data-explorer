Noodle.AI – UI Engineering Screen

Thank you for your interest in Noodle.ai’s UI Engineering team. The following is an exercise
which we use to gauge your UI engineering experience and coding style. You have 48 hours to
complete it, but we encourage you to not spend more than three or four hours on it.
You will be evaluated on the following criteria:
 Functionality: Can it do what the spec requires.
 Reproducibility: Can another developer easily reproduce the build.
 Readability: Is it easy to follow the logic of how the code works
 Usability: Is the UI styled in such a way that maximizes readability, ease of navigation,
and visual neatness.

The task is as follows.

Attached is a CSV file from the Planetary Habitability Laboratory, listing most confirmed
Exoplanet known to science. Build a UI that allows a reader to see the distribution of values in
this dataset using data visualizations using d3.js plus whatever UI library or framework you are
familiar with.

Functionality Requirements
 High Level User Experience
A reader should be able to select any two of the numeric features in the CSV and see a
scatterplot of the values, where each point of the scatterplot represents one planet, and
each axis shows one of the selected features.
 User Flow
On load, the UI should load with two features pre-selected, and a scatterplot populated.
The user can switch the features being compared by changing the values in a dropdown.
The user should also be able to see the distribution of the selected value for each axis.
See attached image for a suggested wireframe. Feel free to deviate from the design.

Functionality Prioritization
If the functionalities cannot all be completed, prioritize the following
1. Data Loading
2. Dropdowns for selecting numeric features
3. Points plotted in the scatterplot
4. Scales for the scatterplot
5. Titles, margins, and other general styling
6. Binned histograms for selected features
If you are unfamiliar with data visualization, here are some methods from D3.js that will be
useful for completing this task.
 Data loading
o d3-queue, for loading the CSV
o d3-dsv for parsing the CSV
 Event Coordination
o d3-dispatch for coordinating interactions
 General Intro to D3: http://alignedleft.com/tutorials/d3
Reproducibility Requirements

Please submit your work as a zip file. Another developer with the latest version of NPM set up
on their computer should be able to unzip the file into a directory, then build and view the UI
by running:
 npm install
 npm run start
…and visiting URL for a localhost server. If your preferred framework uses a different set of CLI
tools, please provide a build process of similar level of simplicity.
If you are unfamiliar with NPM’s package management system, you can use the attached
package.json file as a starting point. To use it, put it in an empty directory then run `npm install`
and `npm run start`.
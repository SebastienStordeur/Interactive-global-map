# Interactive Global Map

## Overview

This project provides an interactive global map that visualizes various data sets related to human geography. The map includes three layers that can each display a different set of data:

- **Global Population**: This layer displays the total population for each country.

- **Population Density**: This layer represents the number of people living per square kilometer in each country.

- **Temperature**: This layer represents the average yearly temperature of each country.

All layers can be customized in terms of color and can be toggled on or off.

## Functionality

The map interface is interactive, allowing users to zoom in and out and to select countries to view more detailed data.

## Technologies Used

The project is implemented with React and TypeScript and makes use of the D3.js library for data visualization and the Leaflet library for the map interface.

## Data Sources

The data visualized in the map is sourced from various global databases. For details, see the specific data files under the `data` directory.

## Customizing the Map

The colors used for the different layers can be customized by adjusting the relevant color scales in the D3.js code. Additionally, you can select which layers to display using the layer selection interface.

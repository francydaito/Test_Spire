
// controller.js handles the application's logic, 
// serving as an intermediary between view.js and model.js

import dataModel from './model.js';
import Map from './view.js';

// the map is initialized. view.js will display it on the page.
const map = new Map();

// handleSearch() function sends a request for filtered data to model.js 
// after that, it sends this data to view.js for visualization
function handleSearch(mmsi_id , imo_id , name_id) {
  const filteredData = dataModel.filterData(mmsi_id , imo_id , name_id);

  for (let index = 0; index < filteredData.length; index++) {
    map.mapAppend(filteredData[index]);
  }

  
}

// handleSearch() function is then exported so that main.js can import it
export { handleSearch };






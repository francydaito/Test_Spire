
// model.js manages the data logic and storage
// it loads and filters data


// for this demo, only the CSV file named Spire_000 is used
// of course, the demo only works on a local server
const csvFileUrl = 'data/Spire_000.csv';

const max_lat = 21.34;
const min_lat = -89.38;
const max_lon = 10.45;
const min_lon = -59.62;

class DataModel {
  constructor() {
    this.data = [];   // the loaded data will be stored in 'this.data'
    this.marker = []; // this.marker contains all the generated markers
    this.loadData();  // all the data is loaded upon opening the page
  }

  loadData() {
    // uses fetch to retrieve the content of the CSV file
    fetch(csvFileUrl)
      .then(response => response.text())
      .then(csvData => {
        // uses Papa.parse to parse the CSV data
        Papa.parse(csvData, {
          complete: (results) => {
            // the CSV data is available in results.data
            // and stored in this.data through handleCSVData() 
            this.handleCSVData(results.data);
          },
          header: true,
        });
      })
      .catch(error => console.error('Errore durante il recupero del file CSV:', error));
    }

  handleCSVData(csvData) {
    this.data = csvData;
    console.log("Data has been loaded");
    // after data is loaded, the loading icon is removed
    document.getElementById('map').classList.remove('loading');
    // and the search filter is displayed
    document.getElementById('filter').style.display = 'inline';
  }

  // only data related to a specific area is searched
  checkCoordinates(lat , lon) {
    if ((lat > min_lat && lat < max_lat) && (lon > min_lon && lon < max_lon)){
      return true ;
    } else {
      return false ;
    }
  }

  // the search can be done by mmsi
  filterMmsi(index , mmsi, marker_index) {
    if (this.data[index].mmsi == mmsi){
      if( this.checkCoordinates(this.data[index].latitude , this.data[index].longitude)){
        this.setMarker(marker_index , this.markerMaker(index)) ;
        return true ;
      }
    } else {
      return false ;
    }
  }

  // the search can be done by imo
  filterImo(index , imo, marker_index) {
    if (this.data[index].imo == imo){
      if( this.checkCoordinates(this.data[index].latitude , this.data[index].longitude)){
        this.setMarker(marker_index , this.markerMaker(index)) ;
        return true ;
      }
    } else {
      return false ;
    }
  }
    
  // the search can be done by name or part of it
    filterName(index , name , marker_index) {

      if (this.data[index].name.includes(name)){
        if( this.checkCoordinates(this.data[index].latitude , this.data[index].longitude)){
          this.setMarker(marker_index , this.markerMaker(index)) ;
          return true ;
        }
      }  else {
        return false ;
      }
    }

  // if the search is successful, a marker is generated
  markerMaker(index){
    const el = document.createElement('div');
    el.className = 'boatIcon';
    const marker = new mapboxgl.Marker(el)
    .setLngLat([this.data[index].latitude , this.data[index].longitude])
    .setRotation(this.data[index].heading);
    return marker ;
  }

  setMarker(index , marker){
    this.marker[index] = marker ;
  }

  filter(keyword , type) {
    // a while loop takes care of systematic searching
    var i = 0;
    var counter = 0;
    while (this.data[i].mmsi != null) {
      switch (type) {
        case 'mmsi':
          if(this.filterMmsi(i ,keyword , counter)){
          counter++;
          }
          break;
        case 'imo':
          if(this.filterImo(i ,keyword , counter)){
            counter++;
          }
          break;  
        case 'name': 
          if(this.filterName(i ,keyword , counter)){
            counter++;
          }
          break; 
      }
      i++
      // if the search is negative, an alert() informs the user
      if (counter == 0){
        alert( 'The vessel '+ keyword + ' is not found in the designed area');
      }
    }
  }

  filterData(mmsi_id , imo_id , name_id) {
    if (document.getElementById(mmsi_id).value){
      console.log("search done by mmsi") ;
      this.filter(document.getElementById(mmsi_id).value.toUpperCase() , 'mmsi' );
      return this.marker ;
    } else if (document.getElementById(imo_id).value) {
        console.log("search done by imo") ;
        this.filter(document.getElementById(imo_id).value.toUpperCase() , 'imo' );
        return this.marker ;
      } else if (document.getElementById(name_id).value){      
          console.log("search done by name") ;
          this.filter(document.getElementById(name_id).value.toUpperCase() , 'name' );
          return this.marker ;
        } else {
            console.log("negative search") ;
          }
  } 
}

// an instance of DataModel is exported
// the instance will be loaded by controller.js
const dataModel = new DataModel();
export default dataModel;
  
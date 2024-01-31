
// view.js handles the display of the map on the screen
// the map is the main graphical representation

class Map {

    constructor() {
        this.map ;
        this.mapInit();
    }

    mapInit() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style:{
                'version': 8,
                'sources': {
                'raster-tiles':
                    {
                    'type': 'raster',
                    'tiles': [
                    'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    ],
                    'tileSize': 256
                    }
                },
                'layers': [
                    {
                    'id': 'simple-tiles',
                    'type': 'raster',
                    'source': 'raster-tiles',
                    'minzoom': 0,
                    'maxzoom': 20
                    }
                ]
            },
                center: [-20,-30],
                zoom: 3,
                scrollZoom: true
        });   
        this.map.addControl(new mapboxgl.NavigationControl());

        console.log("map has been displayed") ;
    }

    // mapAppend() places the markers on the map
    mapAppend( m ) { 
        const marker = m;
        marker.addTo(this.map);   
    }
}

// the class Map is then exported so that controller.js can import it
export default Map ;









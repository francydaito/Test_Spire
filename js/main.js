
// main.js manages user interaction 
// and coordinates actions among different components of the system

import { handleSearch } from './controller.js';

function showFiltered() {
    handleSearch(  'mmsi_text' , 'imo_text' , 'name_text'  ) ;
    document.getElementById('filter').style.display = 'none';
}

function cancelFilter() {

    document.getElementById('mmsi_text').value = '';
    document.getElementById('imo_text').value = '';
    document.getElementById('name_text').value = '';

}

document.getElementById('b_filter').addEventListener('click', showFiltered);

document.getElementById('b_cancel').addEventListener('click', cancelFilter);


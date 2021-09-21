import newApiService from '../services/apiSevise';
import newPrepareData from '../services/prepareData';
import Pagination from 'tui-pagination';
import {outputRefs} from '../const/refs';
import itemMediaTpl from '../../templates/item-media.hbs';

const paginationContainer = document.getElementById('tui-pagination-container');

function pagination(totalResults) {
  if (!totalResults || totalResults < 20) {
    paginationContainer.innerHTML = '';
    return;
  }
  const paginationOptions = {
    itemsPerPage: 20,
    visiblePages: 5,
    // totalItems: totalResults > 10000 ? 10000 : totalResults,
    totalItems: totalResults,
  };
  const pagination = new Pagination(paginationContainer, paginationOptions);

  pagination.movePageTo(1);

  pagination.on('afterMove', fechNextPage);
}

async function fechNextPage(event) {
  let apiData = null;
  if (!newApiService.query) {
    apiData = await newApiService.fetchGetMediaTrending(event.page);
  } else {
    apiData = await newApiService.searchMovie(event.page);
  }
  const newData = newPrepareData.prepareData(apiData);
  appendMediaMarkup(newData);
}

function appendMediaMarkup({results}) {
  outputRefs.innerHTML = itemMediaTpl(results);
}

export default pagination;

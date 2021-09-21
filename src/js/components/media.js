// import Pagination from 'tui-pagination';
import { outputRefs } from '../const/refs';
import newApiService from '../services/apiSevise';
// import newDataModification from './dataModification';
import newPrepareData from '../services/prepareData';
import itemMediaTpl from '../../templates/item-media.hbs';
import initPagination from '../components/tui-pagination';

const onLoadPage = async () => {
  await newApiService.fetchGetGenres();

  const data = await newApiService.fetchGetMediaTrending(1);
  // console.log('data', data);
  initPagination(data.total_results);

  const newData = newPrepareData.prepareData(data);
  appendMediaMarkup(newData);
};
onLoadPage();

export function appendMediaMarkup({ results }) {
  return outputRefs.innerHTML = itemMediaTpl(results);
}

export default onLoadPage;
// export default {appendMediaMarkup};

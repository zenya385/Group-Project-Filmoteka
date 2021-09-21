import modalTemplateTpl from '../../templates/modal.hbs';
import newApiService from '../services/apiSevise';

import {watchedSave, queueSave, changeButtonWatched, changeButtonQueue} from './queue';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import localStorageFn from './localStorage';


const refs = {
  openList: document.querySelector('.media-container'),
  closeModal: document.querySelector('[data-action="close-modal"]'),
  backDrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal-wrapper'),
};

async function onPictureClick(evt) {
  evt.preventDefault();

  const target = evt.target;
  const data = await newApiService.fetchOpenModal(target.dataset.id);

  console.log(target.dataset.id)

  // const arr = data.genres.map(item => item.name)
  // arr.splice(3)
  // console.log(arr)

  // if (!evt.target.classList.contains('film-card')) {
  //   return;
  // }

  window.addEventListener('keydown', onEscKeyPress);
  appendModalMarkup(data);
  refs.backDrop.classList.add('is-open');

  document.body.style.overflow = 'hidden';
  document.body.classList.add('no-scroll');

  const watchedBtnRefs = document.querySelector('.js-watched');
  const queueBtnRefs = document.querySelector('.js-queue');

  watchedBtnRefs.addEventListener('click', watchedSave);
  queueBtnRefs.addEventListener('click', queueSave);

  const localWatched = localStorageFn.load('dataWatched');
  const isFindWatched = localWatched.some(item => item.id === +target.dataset.id);
  changeButtonWatched(isFindWatched, watchedBtnRefs);

  const localQueue = localStorageFn.load('dataQueue');
  const isFindQueue = localQueue.some(item => item.id === +target.dataset.id);
  changeButtonQueue(isFindQueue, queueBtnRefs);
}

function appendModalMarkup(data) {
  refs.modal.innerHTML = modalTemplateTpl(data);


  // ТРЕЙЛЕРЫ ЛОГИКА
  const trailerBtn = document.querySelector('.trailer');
  const videos = data.videos.results || [];
  const youtubeVideo = videos.find(video => video.site === 'YouTube');

  if (youtubeVideo) {
    trailerBtn.classList.remove('is-hidden');
    trailerBtn.addEventListener('click', () => onShowTrailer(youtubeVideo));
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backDrop.classList.remove('is-open');

  document.body.style.overflow = 'auto';
  document.body.classList.remove('no-scroll');
}

function onbackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

refs.openList.addEventListener('click', onPictureClick);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backDrop.addEventListener('click', onbackDropClick);


async function onShowTrailer(youtubeVideo) {
  const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${youtubeVideo.key}?autoplay=1&origin" width="560" height="315" frameborder="0"></iframe>
  `);

  instance.show();
}


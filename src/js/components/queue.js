import newApiService from "../services/apiSevise";
import {outputRefs, watchedBtn, queueBtn} from "../const/refs";
import localStorageFn from "./localStorage";
import watchedQueueTpl from "../../templates/item-media.hbs";
import newData from "../services/prepareData";

const themeText = {
  enabledWatched: 'Add to Watched',
  disabledWatched: 'Remove from watched',
  enableQueue: 'Add to queue',
  disableQueue: 'Remove to queue',
};

export const changeButtonWatched = (isFind, targetBtn) => {
  targetBtn.textContent = isFind ? themeText.disabledWatched : themeText.enabledWatched;
  if (isFind) {
    targetBtn.classList.add('modal__btn-active');
  } else {
    targetBtn.classList.remove('modal__btn-active');
  }
}

export const changeButtonQueue = (isFind, targetBtn) => {
  targetBtn.textContent = isFind ? themeText.disableQueue : themeText.enableQueue;
  if (isFind) {
    targetBtn.classList.add('modal__btn-active');
  } else {
    targetBtn.classList.remove('modal__btn-active');
  }
}

export const watchedSave = (e) => {
  const film = newApiService.openedFilm;

  const localWatched = localStorageFn.load('dataWatched');
  const target = e.target;

  if (!localWatched.length) {
    const arrayWatched = [film];
    localStorageFn.save('dataWatched', arrayWatched);
    changeButtonWatched(true, target);
    return;
  }

  const isFind = localWatched.some(item => item.id === film.id);
  changeButtonWatched(!isFind, target);

  if (isFind) {
    const newLocalWatched = localWatched.filter(item => item.id !== film.id);
    localStorageFn.save('dataWatched', newLocalWatched);
  } else {
    localWatched.push(film);
    localStorageFn.save('dataWatched', localWatched);
  }
}

export function appendWatchedMarkup() {
  const localWatched = localStorageFn.load('dataWatched');
  watchedBtn.classList.add('accent-color');
  queueBtn.classList.remove('accent-color');
  if (localWatched.length === 0) {
    // outputRefs.innerHTML = `<h1 class="add-film">Oops ... there's nothing here</h1>`;
    outputRefs.innerHTML = `<h1 class="add-film">Oops ... there's nothing here</h1>`
    return;
  }
  const newLocalWatched = newData.prepareDataWQ(localWatched);
  return outputRefs.innerHTML = watchedQueueTpl(newLocalWatched);
}

export const queueSave = (e) => {
  const film = newApiService.openedFilm;
  const localQueue = localStorageFn.load('dataQueue');
  const target = e.target;

  if (!localQueue.length) {
    const arrayQueue = [film];
    localStorageFn.save('dataQueue', arrayQueue);
    changeButtonQueue(true, target);
    return;
  }

  const isFind = localQueue.some(item => item.id === film.id);
  changeButtonQueue(!isFind, target);

  if (isFind) {
    const newLocalQueue = localQueue.filter(item => item.id !== film.id);
    localStorageFn.save('dataQueue', newLocalQueue);
  } else {
    localQueue.push(film);
    localStorageFn.save('dataQueue', localQueue);
  }
}

export function appendQueueMarkup() {
  const localQueue = localStorageFn.load('dataQueue');
  if (localQueue.length === 0) {
    outputRefs.innerHTML = `<h1 class="add-film">Oops ... there's nothing here</h1>`
    return;
  }
  const newLocalQueue = newData.prepareDataWQ(localQueue);
  return outputRefs.innerHTML = watchedQueueTpl(newLocalQueue);
}












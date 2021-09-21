import { spinner } from '../const/refs';

function showSpinner() {
  refs.spinner.classList.remove('spinner-is-hidden');
}

function hideSpinner() {
  refs.spinner.classList.add('spinner-is-hidden');
}

export { showSpinner, hideSpinner };
window.addEventListener('load', () => {
  setTimeout(() => {
    spinner.remove();
  }, 400);
});

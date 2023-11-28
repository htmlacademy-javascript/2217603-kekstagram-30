import { renderGallery } from './render-gallery.js';
import { getPhoto } from './api.js';
import { showDataError } from './util.js';
import { onFormSubmit, hideEditingForm } from './form-img-upload.js';
import { initFilters } from './filters.js';

getPhoto()
  .then((photos) => {
    renderGallery(photos);
    initFilters(photos);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

onFormSubmit(hideEditingForm);



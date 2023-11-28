import { renderGallery } from './render-gallery.js';
import { getPhoto } from './api.js';
import { showDataError } from './util.js';
import { onFormSubmit, hideEditingForm } from './form-img-upload.js';

getPhoto()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

onFormSubmit(hideEditingForm);



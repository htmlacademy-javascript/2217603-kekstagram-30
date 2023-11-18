import { getPhotos } from './get-photos.js';
import { renderPhotos } from './render-photos.js';

const photos = getPhotos();
renderPhotos(photos);

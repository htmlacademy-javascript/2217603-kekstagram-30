import { getPhotos, PHOTO_OBJECT_COUNT } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const pictures = getPhotos(PHOTO_OBJECT_COUNT);
renderThumbnails(pictures);

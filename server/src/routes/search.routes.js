import { Router } from 'express';
import { searchCategory, searchProduct } from '../controllers/search.controllers.js';

const routes = Router();

routes.route('/p/:item').get(searchProduct);
routes.route('/c/:item').get(searchCategory);

export default routes;

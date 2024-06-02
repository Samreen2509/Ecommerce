import { Router } from 'express';
import { searchProduct } from '../controllers/search.controllers.js';

const routes = Router();

routes.route('/p/:item').get(searchProduct);

export default routes;

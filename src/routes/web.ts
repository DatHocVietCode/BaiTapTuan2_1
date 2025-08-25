import express from 'express';
import * as homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app: express.Application) => {
  router.get('/', homeController.getHomePage);
  router.get('/get-crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  
  app.use('/', router);
};

export default initWebRoutes;
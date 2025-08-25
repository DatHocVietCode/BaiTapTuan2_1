import express from 'express';
import * as homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app: express.Application) => {
  router.get('/', homeController.getHomePage);
  router.get('/get-crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/crud', homeController.getCRUDOperations);
  
  app.use('/', router);
};

export default initWebRoutes;
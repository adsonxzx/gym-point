// Controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

import auth from './app/middlewares/auth';

const express = require('express');

const routes = new express.Router();

/**
 * Public Routes
 */

// Sessions
routes.post('/sessions', SessionController.store);

/**
 * Private Routes
 */

routes.use(auth);

// Studants
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Plans
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Registration
routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:plan_id', RegistrationController.update);
routes.delete('/registrations/:plan_id', RegistrationController.delete);

export default routes;

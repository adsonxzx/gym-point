// Controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

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

module.exports = routes;
